<template>
  <Modal :isOpenModal="props.isOpen" @handleClose="handleCancel">
    <template v-slot:title>
      Excluir pessoa
    </template>

    <slot></slot>

    <div class="flex items-center justify-center gap-4 mt-4">
      <button class="input-button bg-red-500" v-on:click="handleAccept">Sim</button>
      <button class="input-button bg-gray-400" v-on:click="handleCancel">Cancelar</button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from './modal.vue';

const emit = defineEmits(['onAccept', 'onCancel']);

const props = defineProps({
  isOpen: Boolean
})

function handleAccept(){
  emit('onAccept');
}

function handleCancel() {
  emit('onCancel');
}

</script>

<style scoped>

</style>