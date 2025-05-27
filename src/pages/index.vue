<script setup lang="ts">
definePage({
  path: "/",
  name: "Index",
  meta: {
    layout: "blank",
  },
});


const items = ref()
const users = ref()


onMounted(() => {

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
      items.value = json
    })
})
</script>

<template>
  <div>
    <VCard class="mb-10 ml-10 mr-10 mt-10">
      <VCardText>


        <VRow>
          <VCol cols="12" class="text-center">
            <h1>
              Linktic
            </h1>
          </VCol>
        </VRow>

        <VRow justify="center">
          <VCol cols="4">
            <VCard>
              <VCardText>
                <VRow>
                  <VCol cols="12" class="text-center">
                    <h1>Listar elementos</h1>
                    <p>Selecciona el api a consultar</p>
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>

      </VCardText>
    </VCard>
  </div>
</template>
