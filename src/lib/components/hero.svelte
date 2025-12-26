<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Button from "./ui/button/button.svelte";
  import { cn } from "$lib/utils";
  import { getRandomSongs } from "$lib/remote/songs.remote";
  import type { Song } from "$lib/types/song";

  interface GridSquare {
    id: number;
    songId: string;
    currentImage: string;
    nextImage: string | null;
    isTransitioning: boolean;
    isLoaded: boolean;
  }

  let gridSquares = $state<GridSquare[]>([]);
  let squareSize = $state(150);
  let cols = $state(0);
  let rows = $state(0);
  let containerW = $state(0);
  let containerH = $state(0);
  let gridWidth = $state(0);
  let gridHeight = $state(0);
  let offsetX = $state(0);
  let offsetY = $state(0);

  let isInitialLoadComplete = $state(false);
  let isComponentMounted = true;
  let transitionInterval: number | null = null;

  const imageCache = new Set<string>();
  let songPool = $state<[string, Song][]>([]); // Buffer for future transitions
  let isFetching = false;

  let { class: className }: { class?: string } = $props();

  function getActiveIds(): string[] {
    const ids = gridSquares.map((s) => s.songId);
    const poolIds = songPool.map(([id]) => id);
    return [...new Set([...ids, ...poolIds])];
  }

  async function preloadImage(url: string): Promise<void> {
    if (!url || imageCache.has(url)) return Promise.resolve();
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        imageCache.add(url);
        resolve();
      };
      img.onerror = () => resolve();
      img.src = url;
    });
  }

  async function replenishPool(count = 20) {
    if (isFetching || !isComponentMounted) return;
    isFetching = true;
    try {
      const newSongs = await getRandomSongs({
        n: count,
        years: ["2025"],
        exclude: getActiveIds(),
      });
      newSongs.forEach(([_, song]) => {
        if (song.coverUrl) preloadImage(song.coverUrl);
      });
      songPool = [...songPool, ...newSongs];
    } catch (e) {
      console.error("Failed to fetch more songs", e);
    } finally {
      isFetching = false;
    }
  }

  async function initializeGrid() {
    const totalNeeded = cols * rows;
    if (totalNeeded === 0) return;

    isInitialLoadComplete = false;

    try {
      const initialSongs = await getRandomSongs({ n: totalNeeded });

      gridSquares = initialSongs.map(([id, song], i) => ({
        id: i,
        songId: id,
        currentImage: song.coverUrl || "",
        nextImage: null,
        isTransitioning: false,
        isLoaded: false,
      }));

      loadImagesSequentially();

      replenishPool(20);
    } catch (e) {
      console.error("Initial load failed", e);
    }
  }

  async function loadImagesSequentially() {
    // Create array of indices and shuffle them
    const indices = Array.from({ length: gridSquares.length }, (_, i) => i);

    // Fisher-Yates shuffle algorithm
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Load images in random order
    for (const i of indices) {
      if (!isComponentMounted) return;
      await preloadImage(gridSquares[i].currentImage);
      gridSquares[i].isLoaded = true;
      // Small staggered delay for visual flair
      await new Promise((r) => setTimeout(r, 20));
    }
    isInitialLoadComplete = true;
    startTransitions();
  }

  function startTransitions() {
    if (transitionInterval) clearInterval(transitionInterval);
    transitionInterval = window.setInterval(() => {
      if (isComponentMounted) fadeRandomSquare();
    }, 2000);
  }

  async function fadeRandomSquare() {
    if (
      gridSquares.length === 0 ||
      !isInitialLoadComplete ||
      songPool.length === 0
    ) {
      if (songPool.length < 5) replenishPool(20);
      return;
    }

    const idx = Math.floor(Math.random() * gridSquares.length);
    const square = gridSquares[idx];
    if (square.isTransitioning) return;

    // Pick the next song from our local pool
    const nextSongData = songPool.shift();
    if (!nextSongData) return;

    const [newId, newSong] = nextSongData;
    const newImageUrl = newSong.coverUrl || "";

    // Pre-check pool size: if we are running low, fetch more now
    if (songPool.length < 5) replenishPool(20);

    await preloadImage(newImageUrl);
    if (!isComponentMounted) return;

    gridSquares[idx].nextImage = newImageUrl;
    gridSquares[idx].isTransitioning = true;

    setTimeout(() => {
      if (!isComponentMounted) return;
      gridSquares[idx].currentImage = newImageUrl;
      gridSquares[idx].songId = newId;
      gridSquares[idx].nextImage = null;
      gridSquares[idx].isTransitioning = false;
    }, 800);
  }

  function calculateGrid(width: number, height: number) {
    if (width === 0 || height === 0) return;
    let newSquareSize = 160;
    if (width < 640) newSquareSize = 100;
    else if (width < 1024) newSquareSize = 120;
    else if (width < 1536) newSquareSize = 140;

    const newCols = Math.ceil(width / newSquareSize) + 1;
    const newRows = Math.ceil(height / newSquareSize) + 1;

    if (newCols === cols && newRows === rows) return;

    squareSize = newSquareSize;
    cols = newCols;
    rows = newRows;
    gridWidth = cols * squareSize;
    gridHeight = rows * squareSize;
    offsetX = -(gridWidth - width) / 2;
    offsetY = -(gridHeight - height) / 2;
    initializeGrid();
  }

  $effect(() => {
    calculateGrid(containerW, containerH);
  });

  onMount(() => {
    isComponentMounted = true;
  });
  onDestroy(() => {
    isComponentMounted = false;
    if (transitionInterval) clearInterval(transitionInterval);
  });
</script>

<section
  class={cn(
    "relative w-full flex flex-col overflow-hidden bg-black",
    className
  )}
  bind:clientWidth={containerW}
  bind:clientHeight={containerH}
>
  <div
    class="absolute grid-container"
    style="
      left: {offsetX}px; 
      top: {offsetY}px; 
      width: {gridWidth}px; 
      height: {gridHeight}px;
      display: grid;
      grid-template-columns: repeat({cols}, {squareSize}px);
      grid-template-rows: repeat({rows}, {squareSize}px);
    "
  >
    {#each gridSquares as square (square.id)}
      <div class="square-container">
        {#if square.currentImage}
          <img
            src={square.currentImage}
            alt=""
            class="square-image"
            class:loaded={square.isLoaded}
            loading="lazy"
          />
        {/if}
        {#if square.nextImage && square.isTransitioning}
          <img
            src={square.nextImage}
            alt=""
            class="square-image square-overlay z-10"
          />
        {/if}
      </div>
    {/each}
  </div>

  <div class="absolute inset-0 bg-black/75 z-20"></div>

  <div
    class="relative z-30 flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-5xl text-center">
      <h1
        class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl drop-shadow-2xl font-header"
      >
        Top2000+
      </h1>
      <p
        class="mt-5 text-base leading-7 text-gray-100 sm:mt-6 sm:text-lg md:text-xl lg:text-2xl drop-shadow-lg max-w-3xl mx-auto"
      >
        Aan deze Top2000-fansite wordt nog hard gewerkt. Tot die tijd kun je
        alvast ons eerste spel Hoger Lager spelen!
      </p>
      <div
        class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
      >
        <Button
          href="/s/hoger-lager"
          class="h-14 px-8 w-full sm:w-auto text-base rounded-lg font-semibold"
          >Speel Hoger Lager</Button
        >
        <Button
          href="mailto:bram@leis.ink"
          variant="ghost"
          class="h-14 px-8 w-full sm:w-auto text-base rounded-lg font-semibold border-white/90 bg-white/5 backdrop-blur-sm text-white border-2 hover:bg-white/10"
          >Contact</Button
        >
      </div>
    </div>
  </div>
</section>

<style>
  .grid-container {
    position: absolute;
    will-change: transform;
  }

  .square-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #111;
  }

  .square-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .square-image.loaded {
    opacity: 1;
  }

  .square-overlay {
    animation: fadeIn 0.8s ease-in-out forwards;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
