<template>
  <div>
    <div class="max-w-screen-xl flex flex-col items-center justify-start h-screen mx-auto py-10 bg-white">
      <NuxtLink to="/person" class="text-3xl font-bold underline">
        Voltar
      </NuxtLink>
  
      <div class="lg:w-[40rem] pb-6 lg:pb-0 flex flex-col lg:flex-row items-center bg-white m-auto overflow-hidden rounded-xl shadow-lg relative">
        <PersonImg class="w-full h-40 lg:w-40 lg:h-full rounded-none" :imageUrl="person.imageUrl" />
  
        <div class="flex flex-col text-left gap-2 px-5 py-6">
          <div>
            <span class="font-bold text-xs uppercase tracking-widest">Nome</span>
            <h1 class="">{{ person.name }}</h1>
          </div>
    
          <div>
            <span class="font-bold text-xs uppercase tracking-widest">Telefone</span>
            <h1 class="">{{ person.phone }}</h1>
          </div>
    
          <div>
            <span class="font-bold text-xs uppercase tracking-widest">Email</span>
            <h1 class="">{{ person.email }}</h1>
          </div>
    
          <div>
            <span class="font-bold text-xs uppercase tracking-widest">Profissão</span>
            <h1 v-if="person.profession" class="">{{ person.profession.name }}</h1>
            <div v-else class="font-light italic"> * Profissão não cadastrada *</div>
          </div>
        </div>
  
        <div class="w-full flex items-center justify-between absolute bottom-0 lg:flex-col lg:w-10 lg:h-full lg:right-0 ">
          <div v-on:click="editPersonById" class="flex items-center justify-center w-full p-1 lg:h-full mx-auto bg-teal-600 cursor-pointer" title="Editar Pessoa">
            <svg  class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
  
          </div>
          <div v-on:click="isOpenModalConfirmarExclusão = true" class="flex items-center justify-center w-full p-1 lg:h-full mx-auto bg-red-600 cursor-pointer" title="Remover Pessoa">
            <svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  
    <ModalConfirmDeletion 
      :isOpenModal="isOpenModalConfirmarExclusão"
      @onAccept="deletePersonById"
      @onCancel="isOpenModalConfirmarExclusão = false"
     >
     <h5 class="my-5">Tem certeza que deseja excluir esta pessoa?</h5>
    </ModalConfirmDeletion>
  
    <Modal :isOpenModal="isOpenEditPersonModal" @handleClose="isOpenEditPersonModal = false">
      <template v-slot:title>
        Editar pessoa
      </template>
      <PersonForm 
        :id="person._id"
        @onSavePerson="isOpenEditPersonModal = false, getPersonById()" 
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { IPerson } from '~~/types/person';
import { IProfession } from '~~/types/profession';
import { apiBase } from '@/utils/apiBase';
import PersonForm from '~~/components/form/personForm.vue';
import ModalConfirmDeletion from '~~/components/modal/modalConfirmDeletion.vue';

const { id } = useRoute().params;
const router = useRouter();
const isOpenModalConfirmarExclusão = ref<boolean>(false);
const isOpenEditPersonModal = ref<boolean>(false);
const uri = '/person/'+ id;
const api = apiBase();

const person = ref<IPerson>({
  _id: '',
  name: '',
  imageUrl: '',
  email: '',
  phone: '',
  profession: <IProfession>{}
});

function editPersonById() {
  isOpenEditPersonModal.value = true
}

async function getPersonById(){
  await useFetch(api + uri,{
    method: 'GET',
  })
  .then(resp => {
    const { data: personData } = resp;
    const data: any = personData.value
    person.value = data
  })
}

async function deletePersonById() {

  await useFetch(api + uri, {
    method: 'DELETE',
  })
  .then(()=>{
    router.push({
      path: '/person'
    })
  })
}

getPersonById();
</script>