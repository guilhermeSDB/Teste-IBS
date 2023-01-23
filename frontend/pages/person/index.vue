<template>
  <div>
    <div class="overflow-x-hidden">
      <div class="flex items-center justify-center my-10">
        <NuxtLink to="/" class="text-center text-3xl font-bold underline mx-auto">
          Voltar
        </NuxtLink>
      </div>

      <h1 class='text-center my-10 text-3xl font-bold'>Lista de Pessoas</h1>
  
      <TransitionGroup v-if="personsList" name="list" tag="ul">
        <li v-for="person in personsList" :key="person._id">
          <NuxtLink :to="`/person/${person._id}`">
            <Person :data="person" />
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
        Cadastrar pessoa
      </template>
      <PersonForm @onSavePerson="isModalOpen = false, getPersonsList()" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { apiBase } from '~~/utils/apiBase';
import { IPerson } from '@/types/person';
import AddButton from '~~/components/common/addButton.vue';
import Modal from '~~/components/modal/modal.vue';
import PersonForm from '~~/components/form/personForm.vue';

const personsList = ref<Array<IPerson>>([]);
const isModalOpen = ref<boolean>(false);
const api = apiBase();

async function getPersonsList() {
  await useFetch(api +'/persons')
  .then(resp => {
    const response: any = resp.data.value;

    if(response){
      personsList.value = response;
    }
  })
}

getPersonsList();
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