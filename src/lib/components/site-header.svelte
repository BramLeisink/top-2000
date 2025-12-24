<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import { Menu, Search } from "@lucide/svelte";
  import MainNav from "$lib/components/main-nav.svelte";

  import logo from "$lib/assets/favicon.svg";
  import YearSelect from "./year-select.svelte";
</script>

<header class="bg-card sticky top-0 z-50 border-b h-(--header-height)">
  <div
    class="mx-auto flex max-w-384 items-center justify-between gap-6 px-4 py-3 sm:px-6"
  >
    <div class="flex items-center gap-4">
      <!-- <Button variant="outline" class="xl:hidden" size="icon">
        <Menu />
        <span class="sr-only">Menu</span>
      </Button> -->
      <a href="/"
        ><div class="flex items-center">
          <img src={logo} alt="" class="size-10" />
          <!-- <span
            class="ml-2.5 hidden text-xl font-semibold sm:block font-header"
          > -->
          <span class="ml-2.5 block text-xl font-semibold font-header">
            Top2000+
          </span>
        </div></a
      >
    </div>
    <MainNav class="xl:block hidden" />
    <div class="flex items-center gap-1.5">
      <Button href="mailto:bram@leis.ink" variant="outline">Contact</Button>
      <!-- <Button variant="ghost" size="icon">
        <Search />
      </Button>
      <YearSelect /> -->
    </div>
  </div>
</header>
