<template>
  <div>
    <div class="overflow-x-hidden">
      <div class="flex items-center justify-center my-10">
        <NuxtLink to="/" class="text-center text-3xl font-bold underline mx-auto">
          Voltar
        </NuxtLink>
      </div>

      <h1 class='text-center my-10 text-3xl font-bold'>Lista de Profissões</h1>
  
      <TransitionGroup v-if="professionsList" name="list" tag="ul">
        <li v-for="profession in professionsList" :key="profession._id">
          <NuxtLink :to="`/profession/${profession._id}`">
            <Profession :data="profession" />
          </NuxtLink>
        </li>
      </TransitionGroup>
  
      <div v-else>
        Nenhum registro encontrado
      </div>
  
      <AddButton @onClick="isModalOpen = true">
        <span class="text-[40px] mb-2 leading-[0px]">+</span>
      </AddButton>
    </div>
  
    <Modal :isOpenModal="isModalOpen" @handleClose="isModalOpen = false">
      <template v-slot:title>
        Cadastrar Profissão
      </template>
      <ProfessionForm @onSaveProfession="isModalOpen = false, getProfessionsList()" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { apiBase } from '~~/utils/apiBase';
import { IProfession } from '~~/types/profession';
import AddButton from '~~/components/common/addButton.vue';
import Modal from '~~/components/modal/modal.vue';
import ProfessionForm from '~~/components/form/professionForm.vue';

const professionsList = ref<Array<IProfession>>([]);
const isModalOpen = ref<boolean>(false);
const api = apiBase();

async function getProfessionsList() {
  await useFetch(api + '/professions')
  .then(resp => {
    const { data:professions }: any = resp;

    if(professions.value){
      professionsList.value = professions.value;
    }
  })
}

getProfessionsList();
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>