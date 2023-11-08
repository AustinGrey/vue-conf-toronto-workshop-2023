<template>
  <Section title="Parts Inventory">
    <SearchInput
      :search-term="partSearchTerm"
      :placeholder="'Search Parts'"
      @update:search-term="(val) => (partSearchTerm = val)"
    />
    <PartsList :parts="filteredAndSortedParts" />
  </Section>
</template>

<script setup lang="ts">
import PartsList from './PartsList.vue';
import SearchInput from './SearchInput.vue';
import Section from './Section.vue';
import { useParts } from './useDroidRepair';

const { partSearchTerm, filteredAndSortedParts } = useParts();
</script>
