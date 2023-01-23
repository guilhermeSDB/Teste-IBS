<template>
  <button v-on:click="handleClick" class="w-16 h-16 right-6 bottom-6 fixed rounded-full bg-pink-600 text-white flex items-center justify-center">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['onClick'])

function handleClick(){
  emit('onClick');
}
</script>
