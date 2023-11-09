<template>
  <div class="flex-col justify-between min-h-[500px] max-h-[500px] overflow-auto">
    <div class="overflow-auto pb-8" v-if="messages.length">
      <ul class="pl-4 flex flex-col-reverse">
        <li class="mb-5" v-for="message in messages" :key="message.id">
          <div class="grid grid-cols-3 justify-between items-center">
            <div class="col-span-2 font-sans" :class="{ 'text-blue-500': message.from === 'You' }">
              {{ message.content }}
            </div>
            <div class="text-sm font-sans text-right text-gray-400 pr-4">
              {{ message.time }}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>No messages</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ messages: any[] }>()
</script>
