<script lang="ts">
  import logo from "$lib/assets/favicon.svg";
  import { Mail } from "@lucide/svelte";
  import Separator from "./ui/separator/separator.svelte";
</script>

<footer>
  <div
    class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8"
  >
    <a href="/"
      ><div class="flex items-center">
        <img src={logo} alt="" class="size-10" />
        <span class="ml-2.5 block text-xl font-semibold font-header">
          Top2000+
        </span>
      </div>
    </a>
    <p class="">
      {`©${new Date().getFullYear()}`} Top2000+, gemaakt door
      <a href="https://www.linkedin.com/in/bram-leisink/" class="underline"
        >Bram Leisink</a
      >
    </p>
  </div>
</footer>
