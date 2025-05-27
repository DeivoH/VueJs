<script setup lang="ts">
import { usePostsStore } from '@/stores/UsePostsStore'
import { onMounted } from 'vue'
import Table from './Components/Table.vue'


definePage({
  path: "/",
  name: "Index",
  meta: {
    layout: "blank",
  },
})
const postStore = usePostsStore()

const { loading } = storeToRefs(postStore)

onMounted(async () => {
  loading.value = true
  await postStore.fetchPosts()
  loading.value = false
})

</script>

<template>
  <div>
    <VCard class="mb-10 ml-10 mr-10 mt-10" :loading="loading">
      <VCardText>


        <VRow>
          <VCol cols="12" class="text-center">
            <h1>
              Linktic
            </h1>
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12">
            <Table />
          </VCol>
        </VRow>

      </VCardText>
    </VCard>
  </div>
</template>
