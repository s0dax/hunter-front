<template>
  <div class="list-container">
    <n-list hoverable clickable>
      <n-space vertical>
        <n-list-item v-for="requirement in requirements" :key="requirement.requireid">
        <n-thing :title="requirement.title" content-style="margin-top: 10px;">
          <template #description>
            <n-space size="small" style="margin-top: 4px">
              <n-tag :bordered="false" type="info" size="small">
                {{ requirement.reward }}
              </n-tag>
            </n-space>
          </template>
          {{ requirement.description }}
        </n-thing>
      </n-list-item>
      </n-space>
    </n-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios, { AxiosResponse } from 'axios';

interface Requirement {
  userid: number;
  requireid: number;
  title: string;
  description: string;
  reward: string;
  createtime: string;
  endtime: string;
  status: string;
}

export default defineComponent({
  setup() {
    // 使用 ref 创建响应式数据
    const requirements = ref<Requirement[]>([]);

    // 在组件加载时调用后端接口
    onMounted(async () => {
      try {
        // 发起 GET 请求获取需求列表
        const response: AxiosResponse<Requirement[]> = await axios.get('http://localhost:80/require');

        // 将返回的需求列表数据赋值给 requirements
        requirements.value = response.data;
      } catch (error) {
        console.error('Error fetching requirements:', error);
      }
    });

    return {
      requirements,
    };
  },
});
</script>

<style scoped>
.list-container {
  padding: 50px 650px;
}
</style>
