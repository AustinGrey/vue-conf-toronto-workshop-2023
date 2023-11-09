<template>
  <div class="demo font-sans">
    <!-- Droid List Display -->
    <div class="mb-8 rounded-lg border border-gray-300 bg-gray-100 p-4">
      <h3 class="text-xl font-bold mb-2">Droids for Repair</h3>
      <div class="my-4">
        <input
          v-model="droidSearchTerm"
          placeholder="Search Droids"
          class="px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[800px] overflow-y-auto overflow-x-clip"
      >
        <div v-if="!filteredAndSortedDroids.length" class="text-gray-700">No droids found</div>
        <TransitionGroup name="list">

        </TransitionGroup>
      </div>
    </div>

    <!-- Repair Bay -->
    <div ref="repairList" class="mb-8 rounded-lg border border-gray-300 bg-gray-100 p-4">
      <h3 class="text-xl font-bold">Repair Bay</h3>
      <Transition name="list" mode="out-in">
        <div class="bg-gray-200 rounded-lg p-4 mt-4" v-if="selectedDroid" :key="selectedDroid.type">
          <div class="flex flex-row justify-between">
            <div class="flex flex-col justify-between">
              <div>
                <h4 class="text-lg font-bold mb-2 flex flex-row items-center justify-between">
                  Selected Droid: {{ selectedDroid.type }}
                </h4>
                <ul class="list-disc list-inside mb-4">
                  <li v-for="part in selectedDroid.partsNeeded" :key="part" class="text-gray-700">
                    {{ part }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- Missing Parts Notification -->
            <div class="w-1/2" v-if="missingParts.length">
              <h4 class="text-lg font-bold mb-2 text-red-500">Missing Parts</h4>
              <ul class="list-disc list-inside">
                <li v-for="missing in missingParts" :key="missing.part" class="text-gray-700">
                  {{ missing }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Button to Initiate Repair -->
          <div ref="repairContainer">
            <button
              key="initiate-repair"
              v-if="!repairInProgress"
              class="w-full px-4 py-2 rounded-md bg-blue-500 text-white disabled:opacity-50"
              :class="{
                'cursor-not-allowed': missingParts.length,
                'hover:bg-blue-400': !missingParts.length
              }"
              @click="initiateRepair"
              :disabled="missingParts.length"
            >
              Initiate Repair
            </button>
            <div
              key="repair-progress"
              class="bg-gray-100 rounded-lg border border-gray-300 p-4 mt-4"
              v-else
            >
              <span class="font-bold">Repair Progress</span>
              <div class="mt-2 relative pt-1">
                <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    :style="{ width: repairProgress + '%' }"
                    class="flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-700 mt-4">No droid selected</div>
      </Transition>
    </div>

    <!-- Parts Inventory -->
    <div class="mb-8 rounded-lg border border-gray-300 bg-gray-100 p-4">
      <h3 class="text-xl font-bold mb-2">Parts Inventory</h3>
      <div class="my-4">
        <input
          v-model="partSearchTerm"
          placeholder="Search Parts"
          class="px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[800px] overflow-y-auto overflow-x-clip"
      >
        <div v-if="!filteredAndSortedParts.length" class="text-gray-700">No parts found</div>

        <TransitionGroup name="list">
          <div
            v-for="part in filteredAndSortedParts"
            :key="part.id"
            class="rounded-lg p-4 h-full flex flex-row justify-between items-center transition-colors duration-200 ease-in-out"
            :class="{
              'bg-gray-200': !part.added && !part.removed,
              'bg-green-200': part.added,
              'bg-red-200': part.removed
            }"
          >
            <h4 class="text-lg font-bold">{{ part.name }}</h4>
            <p class="text-gray-700">
              <span class="font-bold text-gray-500">{{ part.quantity }}</span>
            </p>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <!-- Completed Repairs List -->
    <div class="mb-8 rounded-lg border border-gray-300 bg-gray-100 p-4">
      <h3 class="text-xl font-bold">Completed Repairs</h3>
      <div
        ref="completedList"
        class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[800px] overflow-y-auto overflow-x-clip"
      >
        <div v-if="completedRepairs.length === 0" class="text-gray-700">No completed repairs</div>

        <TransitionGroup name="list">
          <div v-for="droid in completedRepairs" :key="droid.id" class="bg-gray-200 rounded-lg p-4">
            <h4 class="text-lg font-bold">{{ droid.type }}</h4>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useParts, useDroids, useRepair } from './useDroidRepair'

const { missingParts, filteredAndSortedParts, partSearchTerm } = useParts()

const { repairInProgress, repairProgress, initiateRepair, completedRepairs } = useRepair()

const { droidSearchTerm, filteredAndSortedDroids, selectedDroid, toggleSelectedDroid } = useDroids()
</script>

<style src="./style.css" scoped></style>
