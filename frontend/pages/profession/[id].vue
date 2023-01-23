<template>
  <div>
    <div class="max-w-screen-xl flex flex-col items-center justify-start h-screen py-10 bg-gray-50">
      <NuxtLink to="/profession" class="text-3xl font-bold underline">
        Voltar
      </NuxtLink>

      <div class="w-full lg:w-96 h-40 flex items-center bg-white m-auto overflow-hidden rounded-xl shadow-lg relative">
        <h1 class="text-2xl font-bold mx-auto">{{  profession.name }}</h1>

        <div class="w-full flex items-center justify-between absolute bottom-0 lg:flex-col lg:w-10 lg:h-full lg:right-0 ">
          <div v-on:click="editProfessionById" class="flex items-center justify-center w-full p-1 lg:h-full mx-auto bg-teal-600 cursor-pointer" title="Editar Pessoa">
            <svg  class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
  
          </div>
          <div v-on:click="isOpenModalConfirmDeletion = true" class="flex items-center justify-center w-full p-1 lg:h-full mx-auto bg-red-600 cursor-pointer" title="Remover Pessoa">
            <svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <ModalConfirmDeletion 
      :isOpenModal="isOpenModalConfirmDeletion"
      @onAccept="deleteProfessionById"
      @onCancel="isOpenModalConfirmDeletion = false"
    >
      <h5 class="my-5">Tem certeza que deseja excluir esta profissão?</h5>
    </ModalConfirmDeletion>
  
    <Modal :isOpenModal="isOpenEditProfessionModal" @handleClose="isOpenEditProfessionModal = false">
      <template v-slot:title>
        Editar profissão
      </template>
      <ProfessionForm 
        :id="profession._id"
        @onCreateNewPerson="isOpenEditProfessionModal = false, getProfessionById()" 
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { IProfession } from '~~/types/profession';
import { apiBase } from '~~/utils/apiBase';
import ProfessionForm from '~~/components/form/professionForm.vue';
import ModalConfirmDeletion from '~~/components/modal/modalConfirmDeletion.vue';

const { id } = useRoute().params;
const router = useRouter();
const isOpenModalConfirmDeletion = ref<boolean>(false);
const isOpenEditProfessionModal = ref<boolean>(false);
const uri = '/profession/'+ id;
const api = apiBase();

const profession = ref<IProfession>({
  _id: '',
  name: '',
});

function editProfessionById() {
  isOpenEditProfessionModal.value = true
}

async function getProfessionById(){

  await useFetch(api + uri,{
    method: 'GET',
  })
  .then(resp => {
    const { data: personData } = resp;
    const data: any = personData.value
    profession.value = data
  })
}

async function deleteProfessionById() {
  await useFetch(api + uri, {
    method: 'DELETE',
  })
  .then(()=>{
    router.push({
      path: '/profession'
    })
  })
}

getProfessionById();
</script>
