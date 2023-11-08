<template>
  <div class="demo font-sans">
    <DroidController />
    <RepairController />
    <PartsController />
    <CompletedRepairsController />
  </div>
</template>

<script setup>
import DroidController from './DroidController.vue';
import RepairController from './RepairController.vue';
import PartsController from './PartsController.vue';
import CompletedRepairsController from './CompletedRepairsController.vue';
</script>

<style src="./style.css" scoped></style>
