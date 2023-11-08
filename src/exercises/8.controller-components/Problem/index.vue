<template>
  <div class="demo font-sans">
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

    <Section title="Repair Bay">
      <RepairBay
        :selected-droid="selectedDroid"
        :repair-in-progress="repairInProgress"
        :repair-progress="repairProgress"
        :missing-parts="missingParts"
        @initiate-repair="initiateRepair"
      />
    </Section>

    <Section title="Parts Inventory">
      <SearchInput
        :search-term="partSearchTerm"
        :placeholder="'Search Parts'"
        @update:search-term="(val) => (partSearchTerm = val)"
      />
      <PartsList :parts="filteredAndSortedParts" />
    </Section>

    <Section title="Completed Repairs">
      <CompletedRepairsList :completed-repairs="completedRepairs" />
    </Section>
  </div>
</template>

<script setup>
import Section from './Section.vue'
import SearchInput from './SearchInput.vue'
import DroidList from './DroidList.vue'
import RepairBay from './RepairBay.vue'
import PartsList from './PartsList.vue'
import CompletedRepairsList from './CompletedRepairsList.vue'
import { useParts, useDroids, useRepair } from './useDroidRepair'

const { missingParts, filteredAndSortedParts, partSearchTerm } = useParts()

const { repairInProgress, repairProgress, initiateRepair, completedRepairs } = useRepair()

const { droidSearchTerm, filteredAndSortedDroids, selectedDroid, toggleSelectedDroid } = useDroids()
</script>

<style src="./style.css" scoped></style>
