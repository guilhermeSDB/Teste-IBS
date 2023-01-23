<template>
  <div class="flex items-center justify-center mx-auto">
    <button class="py-4 border-2 text-xl text-black font-bold border-gray-100 bg-white w-96 my-1 rounded-lg shadow-sm hover:bg-gray-100">
      {{ props.data.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { IProfession } from '~~/types/profession';

const props = defineProps<{
  data: IProfession
}>();
</script>
