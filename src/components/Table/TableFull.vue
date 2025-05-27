<script setup lang="ts">
import { useTable } from "@/composables/useTable";
import Swal from "sweetalert2";
import { VDataTable } from 'vuetify/labs/VDataTable';



interface Props {
  noUrl?: Boolean
  url: String
  inputsTableFilter: any[]
  btnDelete?: Boolean
  btnEdit?: Boolean
  btnView?: Boolean
  noFilter?: Boolean
  noStatus?: Boolean
  noAvatar?: Boolean
  showSelect?: Boolean
  expandOnClick?: Boolean
  params?: any
  dataForm?: any
  dataTableSelected?: any
}

const { noUrl, url, inputsTableFilter, btnDelete, btnEdit, btnView, noFilter, noStatus, noAvatar, dataForm, params, showSelect, expandOnClick, dataTableSelected } = withDefaults(defineProps<Props>(), {
  noUrl: false,
  url: null,
  inputsTableFilter: [],
  btnDelete: true,
  btnEdit: true,
  btnView: true,
  noFilter: true,
  noStatus: true,
  noAvatar: true,
  showSelect: false,
  expandOnClick: false,
  params: {},
  dataForm: {},
  dataTableSelected: [],
})


const loading = ref<boolean>(false)
const emit = defineEmits(["goView", "responseData", "update:dataTableSelected", "loading"])
const tableData = ref<Array<object>>([])

// Listar Data
const fetchDataTable = async (dataFilter: Array<object> = []) => {
  loading.value = true
  const { data, response } = await useApi(`${url}-list`).post({
    perPage: rowPerPage.value,
    page: currentPage.value,
    searchQuery: dataFilter,
    params
  })
  loading.value = false

  if (response.value?.ok && data.value) {
    emit("responseData", data.value)
    tableData.value = data.value.tableData
    lastPage.value = data.value.lastPage
    totalData.value = data.value.totalData
    totalPage.value = data.value.totalPage
    currentPage.value = data.value.currentPage
  }
}

const { lastPage, totalData, totalPage, currentPage, rowPerPage, paginationData } = useTable(fetchDataTable, tableData.value)

// Eliminar
const deleteData = async (id: number) => {
  Swal.fire({
    title: 'Está seguro que desea eliminar el registro?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Si',
    denyButtonText: 'No',
  }).then(async result => {
    if (result.isConfirmed) {
      loading.value = true
      const { data, response } = await useApi(`${url}-delete/${id}`).delete()
      loading.value = false
      if (response.value?.ok && data.value) await fetchDataTable()
    }
  })
}

// Cambiar estado
const changeStatus = async (obj: object, field: string, value: number) => {
  const { data, response } = await useApi(`${url}-changeStatus`).post({
    id: obj.id,
    value: value,
    field: field
  })

  if (response.value?.ok && data.value) obj[field] = value
}

const goView = (action: string = "create", id: number | undefined = undefined) => {
  emit("goView", {
    action: action,
    id: id,
  })
}

onMounted(async () => {
  if (!noUrl) {

    if (dataForm.code == 200) {

      tableData.value = dataForm.tableData
      lastPage.value = dataForm.lastPage
      totalData.value = dataForm.totalData
      totalPage.value = dataForm.totalPage
      currentPage.value = dataForm.currentPage
    } else {
      await fetchDataTable()
    }
  }
})

</script>

<template>
  <div>
    <VCard class="mt-2" variant="text" :loading="loading" :disabled="loading">
      <VCardText>
        <!-- {{inputsTableFilter}} -->
        <Filter :inputs="inputsTableFilter" @sendFilter="fetchDataTable" @clearFilter="fetchDataTable([])"
          v-if="noFilter" />

      </VCardText>
      <VCardText>
        <VDataTable :show-select="showSelect ? true : false" :expand-on-click="expandOnClick ?? false"
          @update:model-value="emit('update:dataTableSelected', $event)" class="mt-5" :headers="inputsTableFilter"
          :items-per-page="rowPerPage" :items="tableData">

          <!-- Codigo que itera sobre las ranuras disponibles en el componente padre e individualmente rinde cada ranura con sus propias propiedades -->
          <template v-for="(_, name) in $slots" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps || {}" />
          </template>
          <!-- Codigo que itera sobre las ranuras disponibles en el componente padre e individualmente rinde cada ranura con sus propias propiedades -->

          <template v-slot:headers="{ columns }">
            <tr>
              <template v-for="(column, index) in columns" :key="index">

                <td style="min-inline-size: 130px">
                  <VLabel>{{ column.title }}</VLabel>
                </td>
              </template>
            </tr>
          </template>


          <template #item.status_name="{ item, index }">
            <slot name="item.status_name" :item="item" :index="index">
              <div class="d-flex align-center" v-if="noStatus">
                <VChip color="success" v-if="item.status_id == 1" @click="changeStatus(item, 'status_id', 2)">
                  <VIcon start size="16" icon="tabler-bell" />
                  Activo
                  <VTooltip location="top" transition="scale-transition" activator="parent" text="Estado">
                  </VTooltip>
                </VChip>
                <VChip color="error" v-else @click="changeStatus(item, 'status_id', 1)">
                  <VIcon start size="16" icon="tabler-alert-circle" />
                  Inactivo
                  <VTooltip location="top" transition="scale-transition" activator="parent" text="Estado">
                  </VTooltip>
                </VChip>
              </div>
            </slot>
          </template>


          <template #item.actions="{ item, index }">
            <div>

              <VBtn v-if="btnView" size="38" color="warning" icon class="mr-2" @click="goView('view', item.id)">
                <VIcon icon="tabler-eye" size="22" />
                <VTooltip location="top" transition="scale-transition" activator="parent" text="Ver">
                </VTooltip>
              </VBtn>

              <VBtn v-if="btnEdit" size="38" color="primary" icon class="mr-2" @click="goView('edit', item.id)">
                <VIcon icon="tabler-edit" size="22" />
                <VTooltip location="top" transition="scale-transition" activator="parent" text="Editar">
                </VTooltip>
              </VBtn>

              <VBtn v-if="btnDelete" size="38" color="error" icon class="mr-2" @click="deleteData(item.id)">
                <VIcon icon="tabler-trash" size="22" />
                <VTooltip location="top" transition="scale-transition" activator="parent" text="Eliminar">
                </VTooltip>
              </VBtn>

              <slot name="item.actions2" :item="item" :index="index"></slot>

            </div>
          </template>


          <template #bottom>
            <VCardText class="pt-2">
              <VRow>
                <VCol lg="2" cols="3">
                  <VTextField v-model="rowPerPage" label="Filas Por Página" type="number" min="-1" hide-details
                    variant="underlined" />
                </VCol>

                <VContainer fluid class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
                  <span class="text-sm text-disabled">
                    {{ paginationData(tableData.length) }}
                  </span>
                  <VPagination v-model="currentPage" size="small" :total-visible="5" :length="lastPage" />
                </VContainer>
              </VRow>
            </VCardText>
          </template>
        </VDataTable>
      </VCardText>
    </VCard>
  </div>
</template>
