<script setup>
defineProps({
  filtroAtual: { type: String, required: true },
})
defineEmits(['mudar-filtro'])

const opcoes = [
  { valor: 'todas', rotulo: 'Todas' },
  { valor: 'pendentes', rotulo: 'Pendentes' },
  { valor: 'concluidas', rotulo: 'Concluídas' },
]
</script>

<template>
  <div class="todo-filter">
    <button
      v-for="opcao in opcoes"
      :key="opcao.valor"
      type="button"
      :class="{ ativo: filtroAtual === opcao.valor }"
      @click="$emit('mudar-filtro', opcao.valor)"
    >
      {{ opcao.rotulo }}
    </button>
  </div>
</template>
