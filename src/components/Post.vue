<template>
    <n-button @click="showPostModal = true">
      来吧
    </n-button>
    <n-modal
      v-model:show="showPostModal"
      class="custom-card"
      preset="card"
      style="width: 600px;"
      title="发布任务"
      size="huge"
      :bordered="false"
      :on-after-leave="handleAfterLeave"
    >
      <template #header-extra>
      </template>
      <n-space vertical :size="sizeNum">
        <n-input v-model:value="titleValue" type="text" placeholder="请输入标题" clearable show-count :maxlength="30"/>
        <n-input
        v-model:value="descriptionvalue"
        type="textarea"
        placeholder="请说明内容"
        clearable
        show-count :maxlength="300"
        />
        <div>
          <label class="custom-file-upload">
          <input type="file" @change="handleFileChange" />
            上传图片
          </label>
          <n-gradient-text type="success">
            {{image}}
          </n-gradient-text>
        </div>
      </n-space>
      <template #footer>
        <n-space justify="space-between">
            <n-input v-model:value="reward" placeholder="金额" :allow-input="onlyAllowDecimal">
                <template #prefix>
                    <n-icon size="25" color="#F4CB72FF" :component="ReportMoney" />
                </template>
                <template #suffix>
                元
                </template>
            </n-input>
            <n-select placeholder="有效时间" @update:value="handleUpdateValue" :options="options" style="width: 100px;"/>
            <n-button strong secondary type="primary" @click="publishRequirement" >
                发布
            </n-button>
        </n-space>
      </template>
    </n-modal>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { ReportMoney } from '@vicons/tabler';
  import axios from 'axios';
  import qs from 'qs';
  import { useMessage } from 'naive-ui';
  
  const file = ref<File | null>(null);
  const message = useMessage();
  const showPostModal = ref(false);
  const titleValue = ref("");
  const descriptionvalue = ref("");
  const reward = ref();
  const deadLine = ref<number>(1);
  const sizeNum = ref(15);
  const image = ref("")
  const handleAfterLeave = (): void => {
  // 在模态框关闭后触发的回调函数
  console.log('Modal 关闭后执行的操作');
  // 在这里可以执行你希望在模态框关闭后进行的操作
};
  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const selectedFile = target.files[0];
      file.value = selectedFile;
      console.log(selectedFile.name);
      image.value=selectedFile.name
    }
  };
  const publishRequirement = async () => {

  
    try {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const userData = JSON.parse(userInfo);
        const userId = userData.userid;
  
        const postData = {
          userid: userId,
          requireid: 0,
          title: titleValue.value,
          description: descriptionvalue.value,
          reward: parseFloat(reward.value),
          createtime: '',
          endtime: '',
          status: 'Available',
        };
  
        const response = await axios.post(`http://localhost:80/requireByLater/${deadLine.value}`, qs.stringify(postData));
        if (file.value) {
        const formData = new FormData();
        formData.append('photo', file.value);
        formData.append('requireid', response.data);
  
        try {
          const response = await axios.post('http://localhost:80/img', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          console.log('上传成功', response.data);
        } catch (error) {
          console.error('上传失败', error);
        }
      } else {
        console.warn('请选择要上传的图片');
      }
        console.log('发布成功，返回的数据：', response.data);
        showPostModal.value = false;
      } else {
        message.warning('你还没有登陆');
      }
    } catch (error) {
      console.error('发布失败:', error);
    }
  };
  
  const onlyAllowDecimal = (value: string) => {
    if (!value) return true;
    return /^\d+(\.\d{0,2})?$/.test(value);
  };
  
  const handleUpdateValue = (value: number) => {
    deadLine.value = value;
  };
  
  const options = [
    { label: "一小时", value: 60 },
    { label: '两小时', value: 120 },
    { label: '三小时', value: 180 },
    { label: "六小时", value: 360 },
    { label: '一天', value: 1440 },
    { label: '三天', value: 4320 },
    { label: '一周', value: 10080 },
    { label: '一个月', value: 43200 },
  ];
  </script>
  
  <style scoped>
  .custom-file-upload {
    height: 20px;
    display: inline-block;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    color: #18a058;
    background-color: rgba(24, 160, 88, 0.16); /* Naive UI primary color */
    border: 1px solid rgba(24, 160, 87, 0);
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    user-select: none;
    
  }
  
  .custom-file-upload:hover {
    background-color: rgba(24, 160, 88, 0.22); /* Naive UI primary color - darker shade */
  }
  
  .button-content {
    display: inline-block;
    vertical-align: middle;
  }
  
  /* 隐藏原生的文件上传按钮 */
  input[type="file"] {
    display: none;
  }
  </style>