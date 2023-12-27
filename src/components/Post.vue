<template>
    <n-button @click="showPostModal = true">
      来吧
    </n-button>
    <n-modal
      v-model:show="showPostModal"
      class="custom-card"
      preset="card"
      :style="bodyStyle"
      title="发布任务"
      size="huge"
      :bordered="false"
    >
      <template #header-extra>
      </template>
      <n-space vertical :size="sizeNum">
        <n-input v-model:value="titleValue" type="text" placeholder="请输入标题" clearable show-count :maxlength="30"/>
        <n-input
        v-model:value="value"
        type="textarea"
        placeholder="请说明内容"
        clearable
        show-count :maxlength="300"
        />
        <n-upload
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            :default-file-list="fileList"
            list-type="image-card"
        >
        点击上传
        </n-upload>
      </n-space>
      <template #footer>
        <n-space justify="space-between">
            <n-input placeholder="金额" :allow-input="onlyAllowDecimal">
                <template #prefix>
                    <n-icon size="25" color="#F4CB72FF" :component="ReportMoney" />
                </template>
                <template #suffix>
                元
                </template>
            </n-input>
            <n-select v-model:value="deadLine" :options="options" style="width: 100px;"/>
            <n-button strong secondary type="primary">
                发布
            </n-button>
        </n-space>
      </template>
    </n-modal>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { ReportMoney } from '@vicons/tabler'
  import axios from 'axios';
  import { UploadFileInfo } from 'naive-ui'
  export default defineComponent({
    setup () {
        const showPostModal = ref(false)
        const titleValue = ref("")
        const value = ref("")
        const reward = ref(0)
        const previewImageUrlRef = ref('')
        const deadLine = ref("一小时")
        const sizeNum = ref(15)
        const publishRequirement = async () => {
      try {
        // 构造要发送的数据对象
        const postData = {
          userid: 1, // 填写用户 ID，可以根据你的登录状态获取
          requireid: 0, // 如果是新增，可以填写 0，如果是修改需求，填写需求的 ID
          title: titleValue.value,
          description: value.value,
          reward: reward.value, // 将字符串转换为浮点数
          createtime: new Date().toISOString(), // 填写创建时间，这里使用当前时间
          endtime: '', // 如果有截止时间，填写相应的逻辑获取截止时间
          status: 'Available', // 根据实际情况填写需求的状态
          // 其他属性...
        };

        // 发送 POST 请求到后端接口
        const response = await axios.post('http://43.143.250.26:80/require', postData);

        // 处理响应，这里可以根据后端返回的数据进行一些逻辑处理
        console.log('发布成功，返回的数据：', response.data);

        // 关闭模态框
        showPostModal.value = false;

        // 可以根据后端返回的数据进行一些提示或其他操作
        // 例如，如果后端返回了新创建的 requirement 的 ID，可以在前端进行一些操作
        // const newRequirementId = response.data.requireid;
        // 其他操作...
      } catch (error) {
        console.error('发布失败:', error);
        // 处理错误，例如弹出错误提示
      }
    };
    return {
        titleValue,
        showPostModal,
        value,
        reward,
        publishRequirement,
        sizeNum,
        previewImageUrl: previewImageUrlRef,
        deadLine,
        bodyStyle: {
          width: '600px'
        },
        segmented: {
          content: 'soft',
          footer: 'soft'
        } as const,
        ReportMoney,
        onlyAllowDecimal: (value: string) => {
        if (!value) return true; // Allow empty input
        return /^\d+(\.\d{0,2})?$/.test(value);
      },
      options: [
        {
          label: "一小时",
          value: 'song0',
        },
        {
          label: '两小时',
          value: 'song1'
        },
        {
          label: '三小时',
          value: 'song2'
        },
        {
          label: "六小时",
          value: 'song3'
        },
        {
          label: '一天',
          value: 'song4'
        },
        {
          label: '三天',
          value: 'song5'
        },
        {
          label: '一周',
          value: 'song6'
        },
        {
          label: '一个月',
          value: 'song7'
        }
      ],
      fileList: ref<UploadFileInfo[]>([
        {
          id: 'a',
          name: '我是上传出错的普通文件.png',
          status: 'error'
        },
        {
          id: 'b',
          name: '我是普通文本.doc',
          status: 'finished',
          type: 'text/plain'
        },
        {
          id: 'c',
          name: '我是自带url的图片.png',
          status: 'finished',
          url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        },
        {
          id: 'd',
          name: '我是上传进度99%的文本.doc',
          status: 'uploading',
          percentage: 99
        }
      ]),
      }
    }
  })
  </script>