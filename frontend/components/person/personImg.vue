<template>
  <img
    class="rounded-lg object-cover object-center" 
    :src="props.imageUrl" 
    alt="" 
  />
</template>

<script setup lang="ts">

export interface ImageProps{
  imageUrl: string
}

const props = withDefaults(defineProps<ImageProps>(), {
  imageUrl: 'https://thumbs.dreamstime.com/b/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663211.jpg',
})

</script>
