<script setup>
import TodoItem from './TodoItem.vue'

defineProps({
  tarefas: { type: Array, required: true },
})
defineEmits(['alternar', 'remover'])
</script>

<template>
  <ul v-if="tarefas.length" class="todo-list">
    <TodoItem
      v-for="tarefa in tarefas"
      :key="tarefa.id"
      :tarefa="tarefa"
      @alternar="$emit('alternar', $event)"
      @remover="$emit('remover', $event)"
    />
  </ul>
  <p v-else class="todo-list__vazio">Nenhuma tarefa por aqui.</p>
</template>
