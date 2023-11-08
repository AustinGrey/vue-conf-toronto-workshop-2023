<template>
  <div class="p-4 col-span-1 bg-gray-200 rounded-md font-sans">
    <ul>
      <li
        v-for="notification in notifications"
        :key="notification.id"
        class="mb-2 p-0"
      >
        <div>
          <div class="italic">{{ notification.content }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import useFakeData from './useFakeData';
const { notifications } = useFakeData();
</script>
