<template>
  <div id="outer" align-items= center; style="justify-content: center;display: flex;align-items: center;">
    <n-space vertical size="large" style="align-items: center; margin-top: 20px;width: 80%;">
    <n-card embedded size="huge" v-for="requirement in requirements" :key="requirement.requireid" hoverable @click="handleCardClick" class="custom-card">
      <template #header>
        <div>
          <h3>
            {{ requirement.title }}
          </h3>
        </div>
      </template>
      <template #header-extra>
        <div style="height:80px; width: 100px; text-align: right;">
        <n-space vertical>
          <n-avatar
            :size="58"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
          {{ requirement.username }}
        </n-space>
        </div>
      </template>
      <template #footer>
        <div style="display: flex; justify-content: flex-end;">
          <n-tag :bordered="false" type="warning" size="large" :round="true" style="font-weight: bold;">
            {{ requirement.reward }}元
          </n-tag>
        </div>
      </template>
      {{ requirement.description }}
    </n-card>
    <n-pagination
    size="large"
    v-model:page="page"
    v-model:page-size="pageSize"
    v-model:page-count="totalPages"
    show-size-picker
    :page-sizes="[10, 20, 30]"
    style="margin-bottom: 20px;margin-top: 10px;"
  />
    <!-- <n-card title="卡片" hoverable>
      卡片内容
    </n-card> -->
  </n-space>
  </div>
  
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
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
  // 新增用户信息
  username: string;
}

interface IPage<T> {
  current: number;
  pages: number;
  size: number;
  total: number;
  records: T[];
}

export default defineComponent({
  setup() {
    const requirements = ref<Requirement[]>([]);
    const page = ref(1);
    const pageSize = ref(10);
    const totalPages = ref(0);

    const handleCardClick = (requirement: Requirement) => {
      console.log('卡片被点击了！', requirement);
    };

    const fetchData = async () => {
      try {
        const response: AxiosResponse<IPage<Requirement>> = await axios.get(`http://localhost:80/require/findByCreateTime/`, {
          params: {
            pageNum: page.value,
            pageSize: pageSize.value,
          },
        });
        // 遍历需求列表，获取用户信息
        for (const requirement of response.data.records) {
          // 根据 userid 发起请求获取用户信息
          const userResponse: AxiosResponse<any> = await axios.get(`http://localhost:80/user/${requirement.userid}`); //http://localhost:80 http://43.143.250.26:80

          // 将用户信息添加到 requirement 对象中
          requirement.username = userResponse.data.username;
        }

        requirements.value = response.data.records;
        totalPages.value = response.data.pages;
      } catch (error) {
        console.error('Error fetching requirements:', error);
      }
    };

    // 监听 page 和 pageSize 的变化
    watch([page, pageSize], () => {
      fetchData();
    });

    onMounted(fetchData);

    return {
      page,
      pageSize,
      totalPages,
      requirements,
      handleCardClick,
    };
  },
});
</script>

<style scoped>
.n-card {
  width: 600px;
  cursor: pointer;
  border-radius: 10px;
}
.myfooter{
  display: flex;
  justify-content: flex-end;
}
.n-card-header {
  font-weight: bold;
}
</style>
