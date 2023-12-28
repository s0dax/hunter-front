<template>
  <h3>后台首页</h3>
  <el-form :model="formData">
      <el-form-item label="书籍封面:" label-width="100">
          <el-upload
                  :http-request="httpRequest"
                  multiple
                  :show-file-list="true"
                  list-type="picture-card"
          ><el-icon><Plus /></el-icon>
          </el-upload>
      </el-form-item>
      <div>
          <el-button>取消</el-button>
          <el-button type="primary" @click="onBtn">添加</el-button>
      </div>
  </el-form>
  <form action="/upload">
    <input type="file" name="file"/>
    <input type="submit" value="Upload"/>
  </form>
</template>

<script setup>
import {ref, reactive} from "vue";
import axios from "axios";
import { Plus } from '@element-plus/icons-vue'


//定义一个响应式数组用来接收图片
const fileList = ref([])
const id = ref(1)
//自定义函数用来覆盖原有的XHR行为（默认提交行为）
function httpRequest(option) {
//将图片存到数组中
  fileList.value.push(option)
}

async function onBtn() {
  let dataForm = new FormData();

//将图片的二进制通过表单的形式发送到后台
  fileList.value.forEach((it,index)=>{
      dataForm.append('filename',it.file)
  })
  const response = await axios.post('http://localhost:80/img', dataForm, {
    params: {
      requireid: id.value,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  console.log(response.data);
}
</script>