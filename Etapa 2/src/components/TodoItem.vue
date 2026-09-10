<script setup>
defineProps({
  tarefa: { type: Object, required: true },
})
defineEmits(['alternar', 'remover'])
</script>

<template>
  <li class="todo-item" :class="{ concluida: tarefa.concluida }">
    <label class="todo-item__rotulo">
      <input
        type="checkbox"
        :checked="tarefa.concluida"
        @change="$emit('alternar', tarefa.id)"
      />
      <span>{{ tarefa.texto }}</span>
    </label>
    <button
      class="todo-item__remover"
      type="button"
      aria-label="Remover tarefa"
      @click="$emit('remover', tarefa.id)"
    >
      ✕
    </button>
  </li>
</template>
