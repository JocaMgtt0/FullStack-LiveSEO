<script setup>
import { ref } from 'vue'

const emit = defineEmits(['adicionar'])
const texto = ref('')

function enviar() {
  if (!texto.value.trim()) return
  emit('adicionar', texto.value)
  texto.value = ''
}
</script>

<template>
  <form class="todo-input" @submit.prevent="enviar">
    <input v-model="texto" type="text" placeholder="Adicionar nova tarefa..." />
    <button type="submit">Adicionar</button>
  </form>
</template>
