<template>
  <div class="w-full lg:max-w-xl border-[1px] border-gray-200 flex flex-col lg:flex-row items-center rounded-xl py-4 lg:py-0 lg:gap-10 my-10 mx-auto cursor-pointer">
    <PersonImg class="w-40 h-40" :imageUrl="props.data.imageUrl" />

    <div>
      <h1 class="text-lg font-bold">{{ data.name }}</h1>

      <div class="flex">
        Profissão:  
        <span v-if="data.profession !== null"> {{ data.profession.name }}</span>
        <div v-else class="font-light italic"> * Profissão não cadastrada *</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IPerson } from '~~/types/person';

const props = defineProps<{
  data: IPerson
}>();
</script>
