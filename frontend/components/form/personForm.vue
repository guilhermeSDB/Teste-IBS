<template>
  <form class="my-4">
    <div>
      <label for="imageUrl">URL da Imagem</label>
      <input 
        class="input-style" 
        type="text" 
        placeholder="Digite a url da imagem" 
        name="imageUrl"
        v-model="person.imageUrl"
        required
      />
    </div>

    <div>
      <label for="name">Nome</label>
      <input 
        class="input-style" 
        type="text" 
        placeholder="Nome da pessoa" 
        name="name" 
        v-model="person.name"
        required
      />
    </div>

    <div>
      <label for="telefone">Telefone</label>
      <input 
        class="input-style" 
        type="text" 
        placeholder="(DDD) 99999-9999" 
        name="telefone"
        v-model="person.phone"
        required
      />
    </div>

    <div>
      <label for="email">Email</label>
      <input 
        class="input-style" 
        type="email" 
        placeholder="usuario@usuario.com" 
        v-model="person.email"
        required
      />
    </div>

    <div>
      <label for="profession">Profissões</label>
      <select class="input-style" name="profession" id="profession" v-model="person.profession._id" required>
        <option class="text-gray-400" disabled selected>Escolha uma profissão</option>
        <option :value="profession._id" v-for="profession in professionsList" :key="profession._id">{{ profession.name }}</option>
      </select>
    </div>
    
    <input v-on:click.prevent="savePerson" class="input-button" type="submit" value="Salvar Pessoa">
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue';
import { IPerson } from '~~/types/person';
import { IProfession } from '~~/types/profession';
import { apiBase } from '@/utils/apiBase';

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: ''
  }
});

const emit = defineEmits(['onSavePerson']);
const isEditForm = ref(false);
const api = apiBase();
const professionsList = ref<Array<IProfession>>([]);

const person = reactive<IPerson>({
  imageUrl: '',
  name: '',
  email: '',
  phone: '',
  profession: <IProfession>{
    _id: '',
  },
});

watch(
  () => person,
  (newPerson) =>{
    console.log(newPerson);
  })

function setEditForm() {
  if(props.id !== ''){
    getPersonById();
    isEditForm.value = true
  }
}

async function getProfessions() {
  await useFetch(api + '/professions')
  .then(resp => {
    const response: any = resp.data.value;

    if(response){
      professionsList.value = response;
    }
  })
}

async function getPersonById(){
  console.log('Passou por aqui: GetPersonById');
  await useFetch(api + `/person/${props.id}`,{
    method: 'GET',
  })
  .then(resp => {
    const data: any = resp.data.value;
    Object.assign(person, data);
  })
}

async function savePerson() {
  console.log(isEditForm.value);
  const uri = isEditForm.value ? `/person/${props.id}` : '/person';
  const method = isEditForm.value ? 'PUT' : 'POST';
  console.log(method);
  console.log(uri);
  debugger
  await useFetch(api + uri, 
  { 
    method: method,
    body: person 
  })
  .then(() => {
    emit('onSavePerson');

    if(method == 'PUT'){
      alert('Usuario Salvo com sucesso');
    }else{
      alert('Usuario Cadastrado com sucesso');
    }
  })
}

onMounted(() => {
  setEditForm();
  getProfessions();
})
</script>
