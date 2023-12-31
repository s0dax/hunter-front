<!-- <template>
  <div>
    <input type="file" @change="handleFileChange" multiple/>
    <button @click="uploadImage">上传图片</button>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    // 获取选择的文件
    const file = target.files[0];
    // 将文件存储在组件状态中，以备上传时使用
    // 可以使用 ref 或者其他状态管理方式
    // 这里简化为直接在组件内部存储
    componentState.file = file;
  }
};

const uploadImage = async () => {
  if (componentState.file) {
    const formData = new FormData();
    formData.append('photo', componentState.file);
    formData.append('requireid','1');
    console.log(componentState.file)
    try {
      // 发送POST请求到后端
      const response = await axios.post('http://localhost:80/img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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

// 组件内部状态
const componentState = {
  file: null as File | null,
};
</script> -->
