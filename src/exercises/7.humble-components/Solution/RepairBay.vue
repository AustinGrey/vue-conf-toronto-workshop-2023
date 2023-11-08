<template>
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
        <div class="w-1/2" v-if="missingParts.length">
          <h4 class="text-lg font-bold mb-2 text-red-500">Missing Parts</h4>
          <ul class="list-disc list-inside">
            <li v-for="missing in missingParts" :key="missing" class="text-gray-700">
              {{ missing }}
            </li>
          </ul>
        </div>
      </div>
      <div ref="repairContainer">
        <button
          v-if="!repairInProgress"
          class="w-full px-4 py-2 rounded-md bg-blue-500 text-white disabled:opacity-50"
          :class="{
            'cursor-not-allowed': missingParts.length,
            'hover:bg-blue-400': !missingParts.length
          }"
          @click="$emit('initiate-repair')"
          :disabled="missingParts.length > 0"
        >
          Initiate Repair
        </button>
        <div class="bg-gray-100 rounded-lg border border-gray-300 p-4 mt-4" v-else>
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
</template>

<script setup lang="ts">
defineProps<{
  repairInProgress: boolean
  repairProgress: number
  selectedDroid: {
    id: number
    type: string
    status: string
    partsNeeded: string[]
  } | null
  missingParts: string[]
}>()

defineEmits<{
  (e: 'initiate-repair'): void
}>()
</script>
