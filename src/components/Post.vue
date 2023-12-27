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
            <n-input placeholder="5" :allow-input="onlyAllowDecimal">
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
  import { UploadFileInfo } from 'naive-ui'
  export default defineComponent({
    setup () {
        const showModalRef = ref(false)
        const previewImageUrlRef = ref('')
        function handlePreview (file: UploadFileInfo) {
            const { url } = file
            previewImageUrlRef.value = url as string
            showModalRef.value = true
        }
        const deadLine = ref("一小时")
        const sizeNum = ref(15)
    return {
        sizeNum,
        handlePreview,
        showModal: showModalRef,
        previewImageUrl: previewImageUrlRef,
        deadLine,
        bodyStyle: {
          width: '600px'
        },
        segmented: {
          content: 'soft',
          footer: 'soft'
        } as const,
        showPostModal: ref(false),
        titleValue: ref(null),
        value: ref(null),
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