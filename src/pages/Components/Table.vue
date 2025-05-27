<script setup lang="ts">

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" sm="12">
        <VCard>
          <VCardText>
            <VRow>
              <VCol cols="12" class="text-center">

                <h2 class="mb-10">Solución con tabla</h2>

                <VTable class=" mt-5">
                  <thead>
                    <tr>
                      <th class="text-center">
                        Titulo
                      </th>
                      <th>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="item in items" :key="item.dessert">
                      <td>
                        {{ item.title }}
                      </td>
                      <td>
                        <VBtn icon="tabler-eye" size="30" color="info" variant="text"></VBtn>
                      </td>
                    </tr>
                  </tbody>
                </VTable>



              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>

</template>
