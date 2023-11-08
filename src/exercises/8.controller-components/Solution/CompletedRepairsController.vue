<template>
  <Section title="Completed Repairs">
    <CompletedRepairsList :completed-repairs="completedRepairs" />
  </Section>
</template>

<script setup lang="ts">
import Section from './Section.vue'
import CompletedRepairsList from './CompletedRepairsList.vue'
import { useRepair } from './useDroidRepair'

const { completedRepairs } = useRepair()
</script>
