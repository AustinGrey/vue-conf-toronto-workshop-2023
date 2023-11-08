import { ref, reactive, computed, nextTick } from 'vue'
import droidData from './droids.js'

const getRandomTime = (multiplier = 10000) => Math.random() * multiplier + 1000

// Define shared global state
const selectedDroid = ref(null)

// Randomize droid order
const randomDroids = ref(droidData.sort(() => Math.random() - 0.5))
const initialDroids = randomDroids.value.slice(0, 4)
const droids = reactive(initialDroids)
const repairInProgress = ref(false)

// Initial parts should cover the first two droids
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
const initialParts = allParts.filter((part) => {
  return initialDroids.some((droid) => {
    return droid.partsNeeded.includes(part.name)
  })
})
const parts = reactive(initialParts)

export const useParts = () => {
  const partSearchTerm = ref('')

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

  return {
    partSearchTerm,
    filteredAndSortedParts,
    missingParts
  }
}

export const useDroids = () => {
  const droidSearchTerm = ref('')
  const remainingDroids = randomDroids.value.slice(4)

  function addRandomDroid() {
    const randomIndex = Math.floor(Math.random() * remainingDroids.length)
    const randomDroid = remainingDroids.splice(randomIndex, 1)[0]
    droids.push(randomDroid)

    if (remainingDroids.length) {
      setTimeout(addRandomDroid, getRandomTime())
    }
  }
  setTimeout(addRandomDroid, getRandomTime())

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

  const filteredAndSortedDroids = computed(() => {
    return droids.filter((droid) => {
      return (
        droid.type.toLowerCase().includes(droidSearchTerm.value.toLowerCase()) ||
        droid.status.toLowerCase().includes(droidSearchTerm.value.toLowerCase())
      )
    })
  })

  return {
    selectedDroid,
    droidSearchTerm,
    toggleSelectedDroid,
    filteredAndSortedDroids
  }
}

export const useRepair = () => {
  const repairProgress = ref(0)

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

  return {
    initiateRepair,
    completedRepairs,
    repairInProgress,
    repairProgress
  }
}
