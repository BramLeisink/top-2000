<script lang="ts">
  import * as Select from "$lib/components/ui/select/index.js";

  const years = [2025, 2024];

  let value = $state("2025");
</script>

<Select.Root type="single" name="editie" bind:value>
  <Select.Trigger class="min-w-24">
    {value}
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Label>Editie</Select.Label>
      {#each years as year}
        <Select.Item value={year.toString()} label={year.toString()}>
          {year}
        </Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>
