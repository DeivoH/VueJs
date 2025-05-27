<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { images } = defineProps({
  images: {
    type: Array,
    default: () => []
  },
})
const path = ref(useFileUpload())
const isDragging = ref(false)
const fileInputRef = ref();

const selectFiles = async () => {
  fileInputRef.value.click();
}
const onDragOver = (event: any) => {
  event.preventDefault();
  isDragging.value = true
  event.dataTransfer.dropEffect = "copy";
}

const onDragLeave = (event: any) => {
  event.preventDefault();
  isDragging.value = false
}

const onDrop = (event: any) => {
  event.preventDefault();
  const elemento = {
    target: {
      files: event.dataTransfer.files
    }
  }
  const files = event.dataTransfer.files

  path.value.handleImageSelected(elemento)

  processFiles(files)
}

const onFileSelect = (event: any) => {
  path.value.handleImageSelected(event)
  const files = event.target.files


  processFiles(files)
}

const deleteImage = (index: any) => {
  images.splice(index, 1)
}
const processFiles = (filesList: FileList) => {

  if (filesList.length === 0) return;

  for (let index = 0; index < filesList.length; index++) {
    const file = filesList[index];
    const extencion = file.name.split('.').pop()
    images.push({ name: file.name, url: URL.createObjectURL(file), type: file.type, extencion: extencion, data: file });
    path.value.key++;
  }
};
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <div class="card">
          <div class="top">
            <p>
              {{ t('Componets.DropZone.Same') }}
            </p>
          </div>
          <div class="drag-area" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
            <span v-if="!isDragging" class="text-center">
              {{ t('Componets.DropZone.UploadFiles') }}
              <br>
              <span class="select text-center" role="button" @click="selectFiles">
                <VIcon icon="tabler-photo-plus" size="60" />
              </span>
            </span>
            <div v-else class="select">
              {{ t('Componets.DropZone.DownloadFilesHere') }}
            </div>
            <input name="file" type="file" class="file" ref="fileInputRef" multiple @change="onFileSelect"
              :key="path.key" />
          </div>
          <div class="container">
            <div class="image" v-for="item, index in images" :key="index">
              <span class="delete" @click="deleteImage(index)">&times;</span>
              <div class="container-doc" style="background-color: green;" v-if="item.extencion == 'xlsx'">
                <VIcon size="30" icon="tabler-file-analytics"></VIcon><br>
                <span style="font-size: 8px;">
                  {{ t('Componets.DropZone.Excel') }}
                </span>
              </div>
              <div class="container-doc" style="background-color: red;" v-else-if="item.extencion == 'pdf'">
                <VIcon size="30" icon="tabler-pdf"></VIcon><br>
                <span style="font-size: 8px;">
                  {{ t('Componets.DropZone.PDF') }}
                </span>
              </div>
              <div class="container-doc" style="background-color: rgb(72, 136, 255);"
                v-else-if="item.extencion == 'docx'">
                <VIcon size="30" icon="tabler-align-center"></VIcon><br>
                <span style="font-size: 8px;">
                  {{ t('Componets.DropZone.Document') }}
                </span>
              </div>
              <img v-else :src="item.url" />
            </div>
          </div>
        </div>
      </VCol>
    </VRow>
  </div>
</template>
<style scoped>
.container-doc {
  color: white;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  width: 100%;
  padding: 10px;
  box-shadow: 0 0 5px #FF6600;
  border-radius: 5px;
  overflow: hidden;
}

.card .top {
  text-align: center;
}

.card p {
  font-weight: bold;
}

.card button {
  outline: 0;
  border: 0;
  color: #000;
  border-radius: 4px;
  font-weight: 400;
  padding: 8px 13px;
  width: 100%;
  background: #ededed;
}

.card .drag-area {
  height: 150px;
  border-radius: 5px;
  border: 2px dashed #FF6600;
  background-color: #ededed;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: center;
  -webkit-user-select: none;
  margin-top: 10px;
}

.card .drag-area .visible {
  font-size: 18px;
}

.card .select {
  margin-left: 5px;
  cursor: pointer;
  transition: 0.6;
}

.card .select:hover {
  opacity: 0.6;
}

.card .container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  max-height: 200px;
  position: relative;
  margin-bottom: 8px;
  padding: 15px;
}

.card .container .image img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.card .container .image span {
  position: absolute;
  top: -2px;
  right: 9px;
  font-size: 20px;
  cursor: pointer;
}

.card input,
.card .drag-area .on-drop,
.card .drag-area.dragover .visible {
  display: none;
}

.delete {
  z-index: 999;
  color: #fff;
}

.card .container .image {
  width: 100px;
  margin-right: 5px;
  height: 100px;
  position: relative;
  margin-bottom: 8px;
}
</style>
