<script setup lang="ts">
import { ref } from 'vue';

interface Emit {
  (e: 'sendFilter', value: object): void
  (e: 'clearFilter', value: []): void
}

const { inputs } = defineProps({
  inputs: {
    type: Array<object>,
    required: true
  },
})
const emit = defineEmits<Emit>()

const filters = [
  { value: 'LIKE', title: 'Parecido' },
  { value: '=', title: 'Igual' },
  { value: '!=', title: 'Diferente' }
]

const booleanYesAndNot = [
  { value: 1, title: 'Si' },
  { value: 0, title: 'No' }
]

const booleanState = [
  { value: 1, title: 'Aprobado' },
  { value: 0, title: 'Rechazado' }
]

const booleanActive = [
  { value: 1, title: 'Activo' },
  { value: 2, title: 'Inactivo' }
]

const branches = ref<Array<number>>([])
const tags = ref<Array<number>>([])

const arrayFilter = ref<Array<{
  input: null
  type: null | string
  search: null
  input_type: null
  relation_key: null
  relation: null,
  arrayList: Array<Object>,
}>>([{
  input: null,
  type: null,
  search: null,
  input_type: null,
  relation_key: null,
  relation: null,
  arrayList: [],
}])


const addFilter = () => {
  arrayFilter.value.push({
    input: null,
    type: 'LIKE',
    search: null,
    input_type: null,
    relation_key: null,
    relation: null,
    arrayList: [],
  })
}

const removeFilter = (index: number) => {
  arrayFilter.value.splice(index, 1)
}

const search = () => {
  emit('sendFilter', {
    arrayFilter: arrayFilter.value,
    branches: branches.value,
    tags: tags.value,
  })
}

const ChangeInput = async (index: number, input_value: number) => {
  const input = inputs.find((item: any) => item.key === input_value)


  if (input) {
    arrayFilter.value[index].search = null
    arrayFilter.value[index].input_type = input.type ?? 'string'
    arrayFilter.value[index].relation_key = input.relation_key ?? null
    arrayFilter.value[index].relation = input.relation ?? null
    arrayFilter.value[index].arrayList = input.arrayList ?? []
  }
}

const clearFilter = () => {
  arrayFilter.value = [{
    input: null,
    type: null,
    search: null,
    input_type: null,
    relation_key: null,
    relation: null,
    arrayList: [],
  }]
  branches.value = []
  tags.value = []
  emit('clearFilter', [])
}

const formatInputs = ref(inputs.filter((item) => item.active != false))
</script>
<template>
  <div>
    <!-- {{inputs}} -->
    <VRow v-for="(item, index) in arrayFilter" :key="index">
      <VCol cols="3">
        <VSelect v-model="item.input" clearable :items="formatInputs" label="Campo" item-title="title" item-value="key"
          @update:modelValue="ChangeInput(index, item.input)" />
      </VCol>

      <VCol cols="3">
        <VSelect v-model="item.type" clearable :items="filters" label="Filtro" />
      </VCol>


      <!-- Posibles busquedas -->
      <VCol cols="3" v-if="item.input_type == 'date'">
        <AppDateTimePicker v-model="item.search" placeholder="De-a" :config="{ mode: 'range' }" />
      </VCol>

      <VCol cols="3" v-else-if="item.input_type == 'booleanYesAndNot'">
        <VSelect v-model="item.search" clearable :items="booleanYesAndNot" label="Estado" />
      </VCol>

      <VCol cols="3" v-else-if="item.input_type == 'booleanState'">
        <VSelect v-model="item.search" clearable :items="booleanState" label="Estado" />
      </VCol>

      <VCol cols="3" v-else-if="item.input_type == 'booleanActive'">
        <VSelect v-model="item.search" clearable :items="booleanActive" label="Estado" />
      </VCol>
      <VCol cols="3" v-else-if="item.input_type == 'arrayList'">
        <VSelect v-model="item.search" clearable :items="item.arrayList" label="Estado" />
      </VCol>

      <VCol cols="3" v-else>
        <VTextField v-model="item.search" label="Buscar" required></VTextField>
      </VCol>
      <!-- Posibles busquedas -->

      <VCol cols="3">
        <VBtn v-if="index == 0" size="30" icon color="primary" class="mr-3" @click="addFilter">
          <VIcon icon="tabler-plus"></VIcon>
        </VBtn>

        <VBtn v-if="index == 0" size="30" icon color="success" @click="search">
          <VIcon icon="tabler-search"></VIcon>
        </VBtn>
        <VBtn v-if="index == 0" size="30" icon color="warning" class="ml-3" @click="clearFilter">
          <VIcon icon="tabler-trash"></VIcon>
        </VBtn>

        <VBtn v-if="index != 0" size="30" icon color="primary" class="mr-3" @click="removeFilter(index)">
          <VIcon icon="tabler-minus"></VIcon>
        </VBtn>
      </VCol>
    </VRow>
  </div>
</template>
