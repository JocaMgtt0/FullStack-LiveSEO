<script setup>
import { useTodos } from './composables/useTodos'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFilter from './components/TodoFilter.vue'

const {
  filtro,
  tarefasFiltradas,
  totalPendentes,
  adicionarTarefa,
  removerTarefa,
  alternarConcluida,
  definirFiltro,
} = useTodos()
</script>

<template>
  <main class="card">
    <h1>Lista de Tarefas</h1>

    <TodoInput @adicionar="adicionarTarefa" />

    <TodoFilter :filtro-atual="filtro" @mudar-filtro="definirFiltro" />

    <TodoList
      :tarefas="tarefasFiltradas"
      @alternar="alternarConcluida"
      @remover="removerTarefa"
    />

    <p class="resumo">{{ totalPendentes }} tarefa(s) pendente(s)</p>
  </main>
</template>
