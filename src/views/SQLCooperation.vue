<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { message } from "ant-design-vue";

const extensions = [javascript(), oneDark];

const files = reactive([]);
const resultSQL = ref('');

const fileInputRef = ref(null);

const selectFolder = () => {
  fileInputRef.value.click();
};

const handleFolderSelection = (event:any) => {
  const selectedFiles = event.target.files;
  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    if (file.name.endsWith('.sql')) {
      readAndDisplayFileContent(file);
    }
  }
};

const readAndDisplayFileContent = (file:any) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const content = event.target.result;
    files.push({ content });
  };
  reader.readAsText(file);
};

const copySQL = () => {
  const textarea = document.createElement('textarea');
  textarea.value = resultSQL.value;
  document.body.appendChild(textarea);

  textarea.select();
  document.execCommand('copy');

  document.body.removeChild(textarea);
  message.success("复制成功");
};

const resultSQLComputed = computed(() => {
  return files.reduce((accumulator, currentFile) => {
    return accumulator + currentFile.content;
  }, '');
});
</script>

<script lang="ts">
import {Codemirror} from "vue-codemirror";

export default {
  components: {
    Codemirror,
  },
};
</script>


<template>
  <div style="padding:0 20px;background: #f8fbf8;min-height: calc(100vh - 85.8px)">
    <h2>选择文件夹，合并文件夹中的SQL文件</h2>
    <input
        type="file"
        ref="fileInputRef"
        @change="handleFolderSelection"
        webkitdirectory
        directory
        multiple
        style="display:none;"
    />
    <a-button @click="selectFolder" style="border-radius: 2px;margin-bottom: 20px">选择文件夹</a-button>
    <a-card title="生成结果" style="width: 100%">
      <a-empty v-if="resultSQLComputed === ''">
        <template #description>
        <span>
          请先输入数据，并点击【一键生成】
        </span>
        </template>
      </a-empty>
      <a-collapse v-else activeKey="1">
        <a-collapse-panel key="1">
          <template v-slot:extra>
            <a-button @click.stop="copySQL">复制</a-button>
          </template>
          <codemirror
              v-model="resultSQLComputed"
              placeholder="Code goes here..."
              :style="{ height: '400px' }"
              :autofocus="true"
              :indent-with-tab="true"
              :tabSize="2"
              :extensions="extensions"
          />
        </a-collapse-panel>
      </a-collapse>
    </a-card>
  </div>
</template>

<style scoped>

</style>
