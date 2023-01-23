<template>
  <div class="w-full lg:max-w-xl border-[1px] border-gray-200 flex flex-col lg:flex-row items-center rounded-xl py-4 lg:py-0 lg:gap-10 my-10 mx-auto cursor-pointer">
    <PersonImg class="w-40 h-40" :imageUrl="props.data.imageUrl" />

    <div>
      <h1 class="text-lg font-bold">{{ data.name }}</h1>

      <div>Profissão: 
        <span> {{ data.profession.name }}</span>
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
