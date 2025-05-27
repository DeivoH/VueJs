<script setup lang="ts">
import { usePostsStore } from '@/stores/UsePostsStore';
import { VDataTable } from 'vuetify/lib/labs/components.mjs';
const postStore = usePostsStore()
const { posts,
  selectedPost,
  severQuery,
  loading
} = storeToRefs(postStore)

const headers = [
  { title: 'Título', key: 'title', sortable: false },
  { title: '', key: 'actions', sortable: false },
]



</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard :loading="loading">
        <VCardText>
          <div class="d-flex align-center mb-5 gap-x-4">
            <h2 class="text-h5">Listado de Post</h2>

            <VTooltip
              :text="severQuery ? 'Consultando por medio de API' : 'Activa o desactiva la petición al servidor (por defecto solamente usa la reactividad de VUE)'">
              <template #activator="{ props }">
                <VSwitch v-bind="props" v-model="severQuery" label="Petición al servidor" hide-details inset />
              </template>
            </VTooltip>
          </div>

          <VRow>
            <VCol cols="12" sm="3">

              <VDataTable :headers="headers" :items="posts" :items-per-page="5" class="elevation-1">
                <template #item.actions="{ item }">
                  <VBtn icon="tabler-eye" size="small" color="info" variant="text" @click="postStore.setDetails(item)"
                    data-test="btn-view-details" />
                </template>
              </VDataTable>
            </VCol>

            <VCol cols="12" sm="8">
              <VCard>
                <VCardTitle class="d-flex">
                  <h3>Post de:</h3>
                  <p class="ml-2" v-if="selectedPost">{{ selectedPost.userId }}</p>
                </VCardTitle>
                <VCardText v-if="selectedPost">
                  <VRow>
                    <VCol cols="12">
                      <p><strong>Título:</strong> {{ selectedPost.title }}</p>
                    </VCol>
                    <VCol cols="4">
                      {{ selectedPost.body }}
                    </VCol>
                  </VRow>

                </VCardText>
                <VCardText v-else>
                  <p class="text-grey">Seleccione un ítem para ver los detalles.</p>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
