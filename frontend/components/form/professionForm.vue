<template>
  <form class="my-4" v-on:submit.prevent="saveProfession">
    <div>
      <label for="name">Nome da profissão</label>
      <input 
        class="input-style" 
        type="text" 
        placeholder="Digite a url da imagem" 
        name="name"
        v-model="profession.name"
        required
      />
    </div>

    <input class="input-button" type="submit" value="Salvar Profissão" />
  </form>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { IProfession } from '~~/types/profession';
import { apiBase } from '@/utils/apiBase';

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: ''
  }
})

const emit = defineEmits(['onSaveProfession']);

const api = apiBase();
const isEditForm = ref<boolean>(false);
const profession = reactive<IProfession>({
  name: ''
});

function setEditForm() {
  if(props.id !== ''){
    getProfessionById();
    isEditForm.value = true
  }
}

async function getProfessionById(){
  await useFetch(api + `/profession/${props.id}`,{
    method: 'GET',
  })
  .then(resp => {
    const data: any = resp.data.value;
    Object.assign(profession, data);
  })
}

async function saveProfession() {
  const uri = isEditForm.value ? `/profession/${props.id}` : '/profession';
  const method = isEditForm.value ? 'PUT' : 'POST';

  await useFetch(api + uri, 
  { 
    method: method,
    body: profession 
  })
  .then(resp => {
    const { data: newPerson } = resp
    emit('onSaveProfession', newPerson.value);

    if(method == 'PUT'){
      alert('Profissão Salvo com sucesso');
    }else{
      alert('Profissão Cadastrado com sucesso');
    }
  })
}

onMounted(() => {
  setEditForm();
})
</script>
