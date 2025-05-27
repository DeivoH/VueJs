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
                <h2 class="mb-10">Solución mas grafica</h2>

                <VRow>
                  <VCol cols="3" v-for="item in items">
                    <VCard :title="users[item.userId] ?? 'Sin Usuario'">
                      <VCardText>
                        <VRow>
                          <VCol cols="12">
                            {{ item.title }}
                          </VCol>
                        </VRow>
                      </VCardText>
                    </VCard>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
