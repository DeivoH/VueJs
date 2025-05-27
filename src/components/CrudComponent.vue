<script lang="ts" setup>
import { VAutocomplete } from 'vuetify/lib/components/index.mjs';

const { module, label } = defineProps({

  module: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: "Seleccione"
  }
})

const action = ref<String>("none")
const loading = ref<Boolean>(false)
const valToCreate = ref<String | null>()
const items = ref<Array<object>>([])
const model = defineModel()
const crudAction = (action_input: string, data?: any) => {
  action.value = action_input
  if (action.value == 'edit') {
    valToCreate.value = items.value.find(ele => ele.value == model.value)?.title
  }
}
const saveData = async () => {
  loading.value = true
  const { data, response } = await useApi(module + 'store').post({
    id: model.value > 0 ? model.value : null,
    name: valToCreate.value
  });
  loading.value = false
  if (response.value?.ok && data.value) {
    closeInput()
    fetchList()
  }

}
const closeInput = () => {
  action.value = "none"
  valToCreate.value = null
}


const fetchList = async () => {
  loading.value = true
  const { data, response } = await useApi(module + 'select-list').post();
  loading.value = false
  if (response.value?.ok && data.value) {
    items.value = data.value.data
  }
}

onMounted(async () => {
  await fetchList()
})

</script>
<template>
  <VRow>
    <VCol cols="12" class="d-flex">
      <VMenu location="top">
        <template #activator="{ props }">



          <VBtn size="37" v-if="action == 'none'" class="mt-6 mr-2" color="primary" icon v-bind="props">
            <!-- {{ v_model }} -->
            <VIcon icon="tabler-plus" />
          </VBtn>
          <VBtn size="30" v-if="action == 'edit' || action == 'create'" class="mt-7 mr-1" color="success" icon
            @click="saveData">
            <!-- {{ v_model }} -->
            <VIcon icon="tabler-check" />
          </VBtn>
          <VBtn size="30" v-if="action == 'edit' || action == 'create'" class="mt-7 mr-1" color="error" icon
            @click="closeInput">
            <!-- {{ v_model }} -->
            <VIcon icon="tabler-x" />
          </VBtn>
        </template>
        <VListItem class=" text-left" style="left: -13px;">
          <VBtn size="35" color="success" icon @click="crudAction('create')">
            <VIcon icon="tabler-plus" />
          </VBtn>
        </VListItem>
        <VListItem class=" text-left" style="left: -13px;" v-if="model">
          <VBtn size="35" color="success" icon @click="crudAction('edit')">
            <VIcon icon="tabler-pencil" />
          </VBtn>
        </VListItem>
        <!-- <VListItem class=" text-left" style="left: -13px;">
          <VBtn size="35" color="error" icon @click="crudAction('delete')">
            <VIcon icon="tabler-trash" />
          </VBtn>
        </VListItem> -->
        <VListItem class="mb-1 text-left" style="left: -13px;">
          <VBtn size="35" color="secondary" icon @click="crudAction('none')">
            <VIcon icon="tabler-x" />
          </VBtn>
        </VListItem>
      </VMenu>
      <VAutocomplete :loading="loading" :disabled="loading" v-if="action == 'none'" :items="items" v-model="model"
        :label="label" :placeholder="label" />
      <!-- <AppSelect :loading="loading" :disabled="loading" v-if="action == 'none'" :items="items" v-model="model"
        :label="label" :placeholder="label" /> -->
      <AppTextField :disabled="loading" v-else-if="action == 'edit' || action == 'create'" v-model="valToCreate"
      :label="label" :placeholder="label"  />
    </VCol>
  </VRow>

</template>
