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
          <div
            v-for="droid in filteredAndSortedDroids"
            :key="droid.id"
            class="bg-gray-200 border-2 rounded-lg p-4 duration-200 ease-in-out"
            :class="{
              'border-blue-500': selectedDroid && selectedDroid.id === droid.id,
              'border-transparent': selectedDroid && selectedDroid.id !== droid.id,
              // Pulsing background when repairing
              'animate-pulse': repairInProgress && selectedDroid && selectedDroid.id === droid.id,
              'cursor-pointer': !repairInProgress,
              'cursor-not-allowed': repairInProgress
            }"
            tabindex="0"
            @click="toggleSelectedDroid(droid)"
            @keydown.enter="toggleSelectedDroid(droid)"
          >
            <h4 class="text-lg font-bold mb-2">{{ droid.type }}</h4>
            <p class="mb-2">
              <span class="font-bold text-gray-500">Status:</span>
              {{ droid.status }}
            </p>
            <p class="text-gray-700 mb-2">
              <span class="font-bold text-gray-500">Parts Needed:</span>
              {{ droid.partsNeeded.join(', ') }}
            </p>
          </div>
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
import { ref, reactive, computed, nextTick } from 'vue'
import droidData from './droids.js'

const useRandomized = (dataSource)=>{
  return {
    randomizedData: ref(dataSource.sort(()=>Math.random() - 0.5)),
  }
}
const {randomizedData: randomDroids} = useRandomized(droidData);




const allParts = randomDroids.value.reduce((acc, droid) => {
  droid.partsNeeded.forEach((part) => {
    if (acc.findIndex((el) => el.name === part) === -1) {
      acc.push({
        id: acc.length + 1,
        name: part,
        quantity: Math.floor(Math.random() * 10)
      })
    }
  })
  return acc
}, [])

const initialDroids = randomDroids.value.slice(0, 4)
const remainingDroids = randomDroids.value.slice(4)

const droids = reactive(initialDroids)

// Initial parts should cover the first two droids
const initialParts = allParts.filter((part) => {
  return initialDroids.some((droid) => {
    return droid.partsNeeded.includes(part.name)
  })
})
const parts = reactive(initialParts)

// Set up timer to add random new droids at random intervals
const getRandomTime = (multiplier = 10000) => Math.random() * multiplier + 1000
function addRandomDroid() {
  const randomIndex = Math.floor(Math.random() * remainingDroids.length)
  const randomDroid = remainingDroids.splice(randomIndex, 1)[0]
  droids.push(randomDroid)

  if (remainingDroids.length) {
    setTimeout(addRandomDroid, getRandomTime())
  }
}
setTimeout(addRandomDroid, getRandomTime())

// Randomly add parts
async function addRandomPart() {
  const randomIndex = Math.floor(Math.random() * allParts.length)
  const randomPart = allParts[randomIndex]
  const matchingPart = parts.find((p) => p.name === randomPart.name)
  let updated
  if (matchingPart) {
    matchingPart.quantity++
    updated = matchingPart
  } else {
    parts.push(randomPart)
    updated = randomPart
  }

  if (updated) {
    // Trigger animation
    updated.added = true
    setTimeout(() => {
      updated.added = false
    }, 1000)
  }

  setTimeout(addRandomPart, getRandomTime())
}
setTimeout(addRandomPart, getRandomTime())

const selectedDroid = ref(null)
const droidSearchTerm = ref('')
const partSearchTerm = ref('')
const repairInProgress = ref(false)
const repairProgress = ref(0)

function toggleSelectedDroid(droid) {
  if (repairInProgress.value) {
    return
  }

  if (selectedDroid.value && selectedDroid.value.id === droid.id) {
    selectedDroid.value = null
  } else {
    selectedDroid.value = droid
  }
}

function initiateRepair() {
  repairInProgress.value = true
  repairProgress.value = 0
  selectedDroid.value.status = 'Repairing...'

  // Remove parts from inventory
  selectedDroid.value.partsNeeded.forEach((part) => {
    const matchingPart = parts.find((p) => p.name === part)
    if (matchingPart) {
      matchingPart.quantity--
      matchingPart.removed = true
      setTimeout(() => {
        matchingPart.removed = false
      }, 1000)
    }
  })

  let start = null
  const duration = Math.random() * 1000 + 1000
  async function step(timestamp) {
    if (!start) start = timestamp
    const progress = timestamp - start
    repairProgress.value = Math.min(progress / (duration / 100), 100)
    if (progress < duration) {
      window.requestAnimationFrame((timestamp) => step(timestamp, duration))
    } else {
      repairProgress.value = 100

      selectedDroid.value.status = 'Repaired'
      repairInProgress.value = false
      completedRepairs.value.push(selectedDroid.value)
      const indexToDelete = droids.indexOf(selectedDroid.value)
      selectedDroid.value = null

      await nextTick()
      droids.splice(indexToDelete, 1)
    }
  }
  window.requestAnimationFrame(step)
}

const completedRepairs = ref([])
const filteredAndSortedDroids = computed(() => {
  return droids.filter((droid) => {
    return (
      droid.type.toLowerCase().includes(droidSearchTerm.value.toLowerCase()) ||
      droid.status.toLowerCase().includes(droidSearchTerm.value.toLowerCase())
    )
  })
})

const filteredAndSortedParts = computed(() => {
  return parts.filter((part) => {
    return part.name.toLowerCase().includes(partSearchTerm.value.toLowerCase())
  })
})

const missingParts = computed(() => {
  if (!selectedDroid.value || repairInProgress.value) {
    return []
  }

  return selectedDroid.value.partsNeeded.filter((part) => {
    const matchingPart = parts.find((p) => p.name === part)
    return !matchingPart || matchingPart.quantity === 0
  })
})
</script>

<style src="./style.css" scoped></style>
