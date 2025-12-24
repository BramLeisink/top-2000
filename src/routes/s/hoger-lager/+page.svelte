<script lang="ts">
  import { fade, fly, slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { cubicOut, expoOut } from "svelte/easing";
  import { Tween } from "svelte/motion";

  import {
    ArrowDown,
    ArrowUp,
    Check,
    Info,
    Maximize,
    Minimize,
    RefreshCw,
    Volume2,
    VolumeX,
    X,
  } from "@lucide/svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index";

  import { getRandomSongs } from "$lib/remote/songs.remote";
  import { onDestroy } from "svelte";
  import Metadata from "$lib/components/metadata.svelte";

  const YEAR = "2025";

  let muted = $state(false);
  let isFullscreen = $state(false);
  let showInstructions = $state(false);

  let score = $state(0);
  let gameState: "active" | "game-over" = $state("active");
  let revealingAnswer = $state(false);
  let revealResult = $state<"correct" | "incorrect" | null>(null);

  let highScore = $state(0);
  let isNewHighScore = $state(false);
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("highScore_hogerLager");
    if (saved) highScore = parseInt(saved);
    else showInstructions = true;
  }

  let songs = $state(
    await getRandomSongs({ n: 10, years: [YEAR], requireAudio: true })
  );
  let visibleSongs = $derived(songs.slice(score, score + 4));
  let currentSong = $derived(visibleSongs[2][1]);
  let comparisonSong = $derived(visibleSongs[1][1]);
  let currentAudioIndex: number | null = $derived(2 + score);

  $effect(() => {
    if (score + 4 >= songs.length) {
      (async () => {
        const newSongs = await getRandomSongs({
          n: 10,
          years: [YEAR],
          exclude: songs.map(([first]) => first),
          requireAudio: true,
        });
        songs.push.apply(songs, newSongs);
      })();
    }
  });

  let tweenNumber = new Tween(0, {
    duration: 2000,
    easing: cubicOut,
  });

  function checkAnswer(answer: "higher" | "lower") {
    const isCorrect =
      answer ===
      (currentSong.positions[YEAR] < comparisonSong.positions[YEAR]
        ? "higher"
        : "lower");

    revealingAnswer = true;
    tweenNumber.target = currentSong.positions[YEAR];

    setTimeout(() => {
      revealResult = isCorrect ? "correct" : "incorrect";

      setTimeout(async () => {
        if (isCorrect) {
          score++;
          revealingAnswer = false;
        } else {
          gameOver();
          revealingAnswer = false;
        }

        revealResult = null;
        tweenNumber.set(0, { duration: 0 });
      }, 1500);
    }, 1500);
  }

  function gameOver() {
    if (score > highScore) {
      highScore = score;
      isNewHighScore = true;
      localStorage.setItem("highScore_hogerLager", highScore.toString());
    }

    gameState = "game-over";
  }

  async function restartGame() {
    const newSongs = await getRandomSongs({ n: 10, years: [YEAR] });

    audioElements.forEach((audio) => {
      audio.pause();
      audio.src = "";
    });
    audioElements.clear();
    currentAudioIndex = null;

    score = 0;
    isNewHighScore = false;
    gameState = "active";
    revealingAnswer = false;
    revealResult = null;
    tweenNumber.set(0, { duration: 0 });

    songs = newSongs;
  }

  let audioElements = $state<Map<number, HTMLAudioElement>>(new Map());

  function getAudio(index: number, url: string): HTMLAudioElement {
    const audio = new Audio(url);
    audio.loop = false;
    audioElements.set(index, audio);

    return audioElements.get(index)!;
  }

  $effect(() => {
    audioElements.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });

    if (!muted && currentAudioIndex !== null) {
      const song = songs[currentAudioIndex][1];
      if (song?.previewUrl) {
        const audio = getAudio(currentAudioIndex, song.previewUrl);
        audio.play().catch(() => {});
      }
    }
  });

  function toggleFullscreen() {
    if (!isFullscreen) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
    isFullscreen = !isFullscreen;
  }

  function toggleMute() {
    muted = !muted;
  }

  onDestroy(() => {
    audioElements.forEach((audio) => {
      audio.pause();
      audio.src = "";
    });
    audioElements.clear();

    currentAudioIndex = null;
  });
</script>

<Metadata title="Hoger Lager" />

<div class="fixed right-4 top-4 z-10 hidden flex-row gap-2 lg:flex">
  <Button
    variant="ghost"
    class="bg-background/70 backdrop-blur-sm"
    size="icon"
    onclick={() => {
      showInstructions = !showInstructions;
    }}
  >
    <Info class="h-4 w-4" />
  </Button>
  <Button
    variant="ghost"
    class="bg-background/70 backdrop-blur-sm"
    size="icon"
    onclick={toggleMute}
  >
    {#if muted}
      <VolumeX class="h-4 w-4" />
    {:else}
      <Volume2 class="h-4 w-4" />
    {/if}
  </Button>

  <Button
    variant="ghost"
    class="bg-background/70 backdrop-blur-sm"
    size="icon"
    onclick={toggleFullscreen}
  >
    {#if isFullscreen}
      <Minimize class="h-4 w-4" />
    {:else}
      <Maximize class="h-4 w-4" />
    {/if}
  </Button>
</div>

<Dialog.Root bind:open={showInstructions}>
  <Dialog.Content class="sm:max-w-md">
    <Dialog.Header>
      <Dialog.Title class="font-header font-bold"
        >Welkom bij Hoger Lager!</Dialog.Title
      >
      <Dialog.Description
        >Kun jij raden welk nummer er hoger in de Top2000 staat?</Dialog.Description
      >
    </Dialog.Header>
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <Badge
          variant="secondary"
          class="flex h-8 w-8 items-center justify-center font-header">1</Badge
        >
        <span>Bekijk de positie van het eerste nummer</span>
      </div>
      <div class="flex items-center gap-2">
        <Badge
          variant="secondary"
          class="flex h-8 w-8 items-center justify-center font-header">2</Badge
        >
        <span>Raad of het volgende nummer hoger of lager staat</span>
      </div>
      <div class="flex items-center gap-2">
        <Badge
          variant="secondary"
          class="flex h-8 w-8 items-center justify-center font-header">3</Badge
        >
        <span>Bouw je reeks op en versla je hoogste score!</span>
      </div>
    </div>
    <Dialog.Footer class="flex-row justify-end gap-2">
      <Button class="flex-1" onclick={() => (showInstructions = false)}
        >Begin!</Button
      >

      <Button variant="ghost" size="icon" onclick={toggleMute}>
        {#if muted}
          <VolumeX class="h-4 w-4" />
        {:else}
          <Volume2 class="h-4 w-4" />
        {/if}
      </Button>

      <Button variant="ghost" size="icon" onclick={toggleFullscreen}>
        {#if isFullscreen}
          <Minimize class="h-4 w-4" />
        {:else}
          <Maximize class="h-4 w-4" />
        {/if}
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<button
  class="fixed left-1/2 top-4 z-10 -translate-x-1/2 transform"
  onclick={() => (showInstructions = !showInstructions)}
>
  <div
    class="flex rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm md:rounded-lg md:p-4"
  >
    <div class="flex w-14 flex-col items-center md:w-40">
      <span class="hidden text-sm font-semibold text-muted-foreground md:block"
        >Huidige score</span
      >
      <div
        id="score-value"
        class="text-center text-2xl font-bold text-primary md:text-4xl font-header"
      >
        {score}
      </div>
    </div>
    <div class="h-8 w-px bg-border md:h-12"></div>
    <div class="flex w-14 flex-col items-center md:w-40">
      <span class="hidden text-sm font-semibold text-muted-foreground md:block"
        >Hoogste score</span
      >
      <div class="flex items-center gap-1">
        <span class="text-2xl font-bold md:text-4xl font-header"
          >{highScore}</span
        >
      </div>
    </div>
  </div>
</button>

<div
  class="fixed left-[50vw] top-[50vh] z-50 flex h-20 w-20 md:h-24 md:w-24 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center text-2xl md:text-3xl font-bold text-white transition duration-500"
  style="border-radius: {revealResult ? '0%' : '50%'};"
  class:bg-primary={!revealResult}
  class:bg-green-500={revealResult === "correct"}
  class:bg-red-500={revealResult === "incorrect"}
  class:scale-125={revealResult !== null}
>
  {#if revealResult === "correct"}
    <div class="" in:fade>
      <Check class="size-10 md:size-12" />
    </div>
  {:else if revealResult === "incorrect"}
    <div class="" in:fade>
      <X class="size-10 md:size-12" />
    </div>
  {:else}
    <span in:fade>VS</span>
  {/if}
</div>

<div
  class="relative block h-screen w-screen overflow-hidden bg-lineair-to-b from-primary/40 to-primary/20 text-white"
>
  <div
    class="absolute grid h-[200vh] w-screen -translate-y-1/4 transform grid-cols-1 grid-rows-4 lg:h-screen lg:w-[200vw] lg:-translate-x-1/4 lg:translate-y-0 lg:grid-cols-4 lg:grid-rows-1"
  >
    {#each visibleSongs as [key, song], index (key)}
      <div
        class={[
          "w-full h-full relative transition-all",
          index === 0 && "grayscale",
        ]}
        animate:flip={{ duration: 600, easing: expoOut }}
      >
        <div class="absolute inset-0 h-full -z-10 w-full bg-black"></div>
        <img
          src={song.coverUrl}
          alt={song.title}
          class={[
            "absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-300",
            gameState === "active" ? "opacity-40" : "opacity-20",
          ]}
          in:fade
        />

        <div
          class="relative flex h-full w-full flex-col items-center justify-center gap-1 md:gap-2 p-3 md:p-4 text-center"
        >
          <div class="h-auto max-w-full px-2">
            <p class="text-lg md:text-2xl font-bold leading-tight mb-1">
              {song.artist}
            </p>
            <p class="text-base md:text-xl mb-1 md:mb-2 leading-tight">
              {song.title}
            </p>

            <p class="text-center text-sm md:text-lg">
              {#if index >= 2 && gameState === "active"}
                Dit nummer staat
              {:else}
                Dit nummer staat op plek
              {/if}
            </p>
            <div class="my-2 flex flex-col items-center">
              {#if index >= 2 && gameState === "active"}
                {#if revealingAnswer}
                  <h2
                    class="font-display text-5xl md:text-8xl font-bold font-header"
                  >
                    {Math.round(tweenNumber.current)}
                  </h2>
                {:else}
                  <div class="flex gap-2 md:gap-4">
                    <Button
                      variant="secondary"
                      onclick={() => checkAnswer("higher")}
                      class="transform p-4 md:p-6 text-center font-display text-lg md:text-2xl xl:text-4xl font-bold transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white xl:p-8 bg-white text-black font-header"
                    >
                      <ArrowUp
                        class="mr-1 md:mr-2 size-5 md:size-6 xl:size-8"
                      />
                      <span>Hoger</span>
                    </Button>
                    <Button
                      variant="secondary"
                      onclick={() => checkAnswer("lower")}
                      class="transform p-4 md:p-6 text-center font-display text-lg md:text-2xl xl:text-4xl font-bold transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white xl:p-8 bg-white text-black font-header"
                    >
                      <ArrowDown
                        class="mr-1 md:mr-2 size-5 md:size-6 xl:size-8"
                      /> Lager
                    </Button>
                  </div>
                {/if}
              {:else}
                <h2
                  class="font-display text-5xl md:text-8xl font-bold font-header"
                >
                  {song.positions[YEAR]}
                </h2>
              {/if}
            </div>
            {#if index >= 2 && gameState === "active" && !revealingAnswer}
              <p class="text-center text-sm md:text-lg text-white/90">
                dan <span class="italic">{comparisonSong.title}</span>
              </p>
            {/if}
            {#if gameState === "game-over" && index >= 2}
              {#if isNewHighScore}
                <div class="">
                  <Badge variant="default" class="p-2 text-xs md:text-sm">
                    Nieuwe hoogste score!
                  </Badge>
                </div>
              {/if}
              <div
                class="flex gap-2 flex-row mt-2 md:mt-4 text-sm md:text-base w-fit mx-auto"
              >
                <Button onclick={restartGame}>
                  <RefreshCw /> Speel Opnieuw
                </Button>
                {#if song.external?.spotify?.id}
                  <Button
                    target="_blank"
                    href="https://open.spotify.com/track/{song.external.spotify
                      .id}"
                    size="icon"
                    class="bg-[#1DB954] hover:bg-[#1DB954]/90 fill-primary-foreground"
                    ><svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      ><title>Spotify</title><path
                        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
                      /></svg
                    >
                  </Button>
                {/if}
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
