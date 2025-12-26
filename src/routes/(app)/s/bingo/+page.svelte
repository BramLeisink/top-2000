<script lang="ts">
  import { getRandomSongs } from "$lib/remote/songs.remote";
  import BingoCard from "./bingo-card.svelte";
  import type { Cell } from "$lib/types/bingo";
  import type { Song } from "$lib/types/song";
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { Input } from "$lib/components/ui/input";
  import { Switch } from "$lib/components/ui/switch";
  import { Separator } from "$lib/components/ui/separator";
  import { Printer, RefreshCw, Music2, Layers } from "@lucide/svelte";
  import logo from "$lib/assets/favicon.svg";

  let loading = $state(false);
  let songs = $state(await getRandomSongs({ n: 25 }));
  let numberOfCards = $state(4);
  let cardTitle = $state("Top2000 Bingo");
  let useFreeSpace = $state(true);

  const mapToCell = ([id, song]: [string, Song]): Cell => ({
    primary: song.title.replace("(Albumversie)", ""),
    secondary: song.artist,
    bg: song.coverUrl ?? undefined,
  });

  const gridSize = 5;

  const createBingoGrid = (songsList: [string, Song][], freeSpace: boolean) => {
    const cells = songsList.map((songData, index) => {
      if (freeSpace && index === 12) {
        return null;
      }
      return mapToCell(songData);
    });

    const grid: (Cell | null)[][] = [];
    for (let i = 0; i < cells.length; i += gridSize) {
      grid.push(cells.slice(i, i + gridSize));
    }
    return grid;
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const allBingoGrids = $derived.by(() => {
    const grids: (Cell | null)[][][] = [];
    for (let i = 0; i < numberOfCards; i++) {
      const shuffledSongs = shuffleArray(songs);
      grids.push(createBingoGrid(shuffledSongs, useFreeSpace));
    }
    return grids;
  });

  async function regenerateCards() {
    loading = true;
    try {
      songs = await getRandomSongs({ n: 25 });
    } finally {
      loading = false;
    }
  }

  function printCards() {
    window.print();
  }
</script>

<div class="flex-1 hidden lg:flex print:flex">
  <aside
    class="fixed left-0 top-[--header-height] h-full w-80 bg-secondary text-white z-20 print:hidden overflow-y-auto shadow-2xl"
  >
    <div class="p-6 space-y-8">
      <div class="flex items-center gap-3 pb-2">
        <div class="p-2 bg-white rounded-xl">
          <img src={logo} alt="Top2000+" class="size-8" />
        </div>
        <div>
          <h1 class="font-black text-xl tracking-tighter leading-none">
            Top2000 BINGO
          </h1>
          <p class="text-[10px] text-neutral-50">Kaartjes generator</p>
        </div>
      </div>

      <div class="space-y-6">
        <section class="space-y-4">
          <header class="flex items-center gap-2 text-neutral-400">
            <Layers size={14} />
            <span class="text-[11px] font-bold uppercase tracking-widest"
              >Configuratie</span
            >
          </header>

          <div
            class="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10"
          >
            <div class="space-y-2">
              <Label class="text-xs font-semibold text-neutral-300"
                >Titel op kaart</Label
              >
              <Input
                bind:value={cardTitle}
                class="bg-neutral-800 border-neutral-700 h-8 text-sm focus:ring-red-500"
              />
            </div>

            <div class="space-y-2">
              <Label class="text-xs font-semibold text-neutral-300"
                >Aantal kaarten</Label
              >
              <Input
                type="number"
                bind:value={numberOfCards}
                min="1"
                max="50"
                class="bg-neutral-800 border-neutral-700 h-8 text-sm"
              />
            </div>

            <div class="flex items-center justify-between pt-2">
              <Label class="text-xs font-semibold text-neutral-300"
                >Vrij vakje (Midden)</Label
              >
              <Switch bind:checked={useFreeSpace} />
            </div>
          </div>
        </section>

        <section class="space-y-3">
          <Button
            onclick={regenerateCards}
            disabled={loading}
            variant="secondary"
            class="w-full font-bold group"
          >
            <RefreshCw
              class="mr-2 size-4 transition-transform group-hover:rotate-180"
            />
            {loading ? "Laden..." : "Nieuwe Nummers"}
          </Button>

          <Button
            onclick={() => window.print()}
            class="w-full bg-red-600 hover:bg-red-500 text-white font-bold shadow-lg shadow-red-900/20"
          >
            <Printer class="mr-2 size-4" />
            Print Kaarten
          </Button>
        </section>
      </div>

      <div class="p-4 rounded-xl border border-neutral-600/50">
        <p class="text-[11px] text-neutral-400 leading-relaxed">
          Voor het beste resultaat, zet <b>"Achtergrondafbeeldingen"</b> aan in je
          printinstellingen.
        </p>
      </div>
    </div>
  </aside>

  <main class="flex-1 ml-80 print:ml-0 transition-all duration-500 bg-muted">
    <div class="max-w-4xl mx-auto p-12 print:p-0">
      <div
        class="mb-12 print:hidden border-b border-muted-foreground/20 pb-6 flex justify-between items-end"
      >
        <div>
          <h2 class="text-3xl font-bold text-foreground font-header">
            Live Preview
          </h2>
          <p class="text-sm text-muted-foreground font-medium">
            Bekijk hoe je {numberOfCards} kaarten eruit komen te zien
          </p>
        </div>
      </div>

      <div class="flex flex-col items-center gap-16 print:block print:gap-0">
        {#each allBingoGrids as grid, index}
          <div class="print-page w-full flex justify-center">
            <BingoCard
              {grid}
              cardNumber={index + 1}
              totalCards={numberOfCards}
              title={cardTitle}
              class="shadow-[0_20px_50px_rgba(0,0,0,0.1)] print:shadow-none"
            />
          </div>
        {/each}
      </div>
    </div>
  </main>
</div>

<div class="lg:hidden print:hidden">
  Bekijk deze pagina op een groter scherm om jouw eigen Top2000 bingokaarten te
  maken...
</div>

<style>
  @media print {
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    .print-page {
      page-break-after: always;
      page-break-inside: avoid;
      display: flex !important;
      align-items: center;
      justify-content: center;
      width: 210mm;
      height: 297mm;
      margin: 0 auto;
    }

    .print-page :global(.shadow-xl) {
      shadow: none !important;
      border: 1px solid #eee !important;
    }

    :global(body) {
      background: white !important;
    }

    :global(body *) {
      visibility: hidden;
    }

    :global(.print-page),
    :global(.print-page *) {
      visibility: visible;
    }

    @page {
      size: A4 portrait;
      margin: 2cm;
    }

    .print-page:last-child {
      page-break-after: avoid;
    }
  }
</style>
