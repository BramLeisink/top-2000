<script lang="ts">
  import type { Cell } from "$lib/types/bingo";
  import logo from "$lib/assets/favicon.svg";
  import { cn } from "$lib/utils";

  let {
    grid,
    cardNumber = 1,
    totalCards = 1,
    title = "BINGO",
    class: className,
  }: {
    grid: (Cell | null)[][];
    cardNumber?: number;
    totalCards?: number;
    title?: string;
    class?: string;
  } = $props();
</script>

{#snippet cell(value: Cell | null)}
  <div class="group relative aspect-square overflow-hidden bg-white">
    {#if value}
      {#if value.bg}
        <div
          class="absolute inset-0 bg-cover bg-center"
          style="background-image: url({value.bg})"
        ></div>
        <div class="absolute inset-0 bg-white/80 backdrop-blur-[1px]"></div>
      {/if}

      <div
        class="relative h-full flex flex-col items-center justify-center p-3 text-center"
      >
        <h3
          class="font-bold text-[12px] font-header tracking-tight leading-[1.1] mb-1 line-clamp-3"
        >
          {value.primary}
        </h3>
        <p class="text-[9px] text-neutral-700 leading-tight line-clamp-2">
          {value.secondary}
        </p>
      </div>
    {:else}
      <div
        class="h-full flex flex-col items-center justify-center relative overflow-hidden"
      >
        <img src={logo} alt="" class="size-16 z-10" />
      </div>
    {/if}
  </div>
{/snippet}

<div
  class={cn(
    "bg-white w-full max-w-[210mm] border border-neutral-200 overflow-hidden flex flex-col",
    className
  )}
>
  <div class="h-1.5 w-full bg-linear-to-r from-primary to-primary"></div>

  <div class="px-8 pt-8 pb-3 flex justify-between items-end">
    <div>
      <h2
        class="text-4xl font-bold font-header tracking-tighter text-neutral-900 leading-none"
      >
        {title}
      </h2>
      <div class="flex items-center gap-2 mt-4">
        <span
          class="px-2 py-0.5 bg-neutral-100 rounded text-[10px] font-bold text-neutral-600 uppercase tracking-widest"
        >
          {cardNumber.toString().padStart(3, "0")}
        </span>
        <span class="text-[10px] text-neutral-400 font-medium"
          >/ {totalCards}</span
        >
      </div>
    </div>
    <div class="text-right">
      <img src={logo} alt="" class="size-12 ml-auto mb-5" />
    </div>
  </div>

  <div class="px-8 pb-4">
    <div class="grid grid-cols-5 gap-[2px]">
      {#each grid as row}
        {#each row as value}
          {@render cell(value)}
        {/each}
      {/each}
    </div>
  </div>

  <div
    class="px-8 py-6 flex items-center justify-between border-t border-dashed border-neutral-200 mt-auto"
  >
    <div class="flex flex-col">
      <span class="text-[10px] font-bold text-neutral-800 tracking-tighter"
        >Top2000 Bingo • 2025</span
      >
      <span class="text-[9px] text-neutral-400"
        >Genereer je eigen kaart op
        <a href="https://top2000.leis.ink/">https://top2000.leis.ink/</a>
      </span>
    </div>
    <div class="flex flex-col items-end opacity-40">
      <div class="flex gap-0.5 h-4 mb-1">
        {#each Array(12) as _}
          <div
            class="w-px bg-black h-full"
            style="width: {Math.random() * 3 + 1}px"
          ></div>
        {/each}
      </div>
    </div>
  </div>
</div>
