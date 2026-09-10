import { ref, computed } from 'vue'

let proximoId = 1

export function useTodos() {
  const tarefas = ref([])
  const filtro = ref('todas') // 'todas' | 'pendentes' | 'concluidas'

  function adicionarTarefa(texto) {
    const textoLimpo = texto.trim()
    if (!textoLimpo) return
    tarefas.value.push({ id: proximoId++, texto: textoLimpo, concluida: false })
  }

  function removerTarefa(id) {
    tarefas.value = tarefas.value.filter((tarefa) => tarefa.id !== id)
  }

  function alternarConcluida(id) {
    const tarefa = tarefas.value.find((tarefa) => tarefa.id === id)
    if (tarefa) tarefa.concluida = !tarefa.concluida
  }

  function definirFiltro(novoFiltro) {
    filtro.value = novoFiltro
  }

  const tarefasFiltradas = computed(() => {
    if (filtro.value === 'pendentes') return tarefas.value.filter((tarefa) => !tarefa.concluida)
    if (filtro.value === 'concluidas') return tarefas.value.filter((tarefa) => tarefa.concluida)
    return tarefas.value
  })

  const totalPendentes = computed(
    () => tarefas.value.filter((tarefa) => !tarefa.concluida).length,
  )

  return {
    filtro,
    tarefasFiltradas,
    totalPendentes,
    adicionarTarefa,
    removerTarefa,
    alternarConcluida,
    definirFiltro,
  }
}
