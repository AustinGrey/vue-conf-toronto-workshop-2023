<template>
  <Section title="Droids for Repair">
    <SearchInput
      :search-term="droidSearchTerm"
      :placeholder="'Search Droids'"
      @update:search-term="(val) => (droidSearchTerm = val)"
    />
    <DroidList
      :droids="filteredAndSortedDroids"
      :selected-droid="selectedDroid"
      :repair-in-progress="repairInProgress"
      @select-droid="toggleSelectedDroid"
    />
  </Section>
</template>

<script setup lang="ts">
import Section from './Section.vue'
import DroidList from './DroidList.vue'
import SearchInput from './SearchInput.vue'
import { useDroids, useRepair } from './useDroidRepair'

const { droidSearchTerm, filteredAndSortedDroids, selectedDroid, toggleSelectedDroid } = useDroids()
const { repairInProgress } = useRepair()
</script>
