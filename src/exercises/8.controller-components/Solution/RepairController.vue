<template>
  <Section title="Repair Bay">
    <RepairBay
      :selected-droid="selectedDroid"
      :repair-in-progress="repairInProgress"
      :repair-progress="repairProgress"
      :missing-parts="missingParts"
      @initiate-repair="initiateRepair"
    />
  </Section>
</template>

<script setup lang="ts">
import Section from './Section.vue'
import RepairBay from './RepairBay.vue'
import { useRepair, useDroids, useParts } from './useDroidRepair'

const { repairInProgress, repairProgress, initiateRepair, completedRepairs } = useRepair()
const { missingParts } = useParts()
const { selectedDroid } = useDroids()
</script>
