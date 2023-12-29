<!-- <template>
  <Upload v-model:file-list="files" />
  <button @click="uploadImage">上传图片</button>
  <button @click="zipUpload">111</button> 
  <n-upload
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="fileList"
    list-type="image-card"
  >
    点击上传
  </n-upload>
</template>

<script setup lang="ts">
import { UploadFileInfo } from 'naive-ui'
import axios from 'axios';
import { ref, watchEffect } from 'vue';
fileList: ref<UploadFileInfo[]>
const files = ref([]);

const zipUpload = async (file: any) => {
    //允许自行实现上传文件的请求
    var fd = new FormData();
    fd.append("file", file.file)
    console.log(file.file)
}
const uploadImage = async () => {
  if (files.value.length > 0) {
    const formData = new FormData();
    formData.append('photo', files.value[0]);
    formData.append('requireid', '1');

    try {
      // 发送POST请求到后端
      const response = await axios.post('http://localhost:80/img', formData, {
      });

      // 处理后端返回的数据
      console.log('上传成功', response.data);
    } catch (error) {
      // 处理上传失败的情况
      console.error('上传失败', error);
    }
  } else {
    console.warn('请选择要上传的图片');
  }
};

watchEffect(() => {
  console.log('!!files:', files.file);
});
</script> -->
