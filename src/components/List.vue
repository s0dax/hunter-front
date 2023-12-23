<template>
  <n-space vertical size="large" style="align-items: center; margin-top: 20px;">
    <n-card size="huge" v-for="requirement in requirements" :key="requirement.requireid" :title="requirement.title" hoverable @click="handleCardClick" class="custom-card">
      <span>
        <!-- 显示用户名 -->
        {{ requirement.username }}
      </span>
      <template #header-extra>
        <n-space vertical>
          <n-avatar
            :size="58"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
          {{ requirement.username }}
        </n-space>
      </template>
      <template #footer>
        <div style="display: flex; justify-content: flex-end;">
          <n-tag :bordered="false" type="warning" size="large" :round="true">
            {{ requirement.reward }}
          </n-tag>
        </div>
      </template>
      {{ requirement.description }}
    </n-card>
    <n-card title="卡片" hoverable>
      卡片内容
    </n-card>
  </n-space>
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
  // 新增用户信息
  username: string;
}

export default defineComponent({
  setup() {
    const requirements = ref<Requirement[]>([]);

    const handleCardClick = () => {
      console.log('卡片被点击了！');
    };

    onMounted(async () => {
      try {
        const response: AxiosResponse<Requirement[]> = await axios.get('http://localhost:80/require');

        // 遍历需求列表，获取用户信息
        for (const requirement of response.data) {
          // 根据 userid 发起请求获取用户信息
          const userResponse: AxiosResponse<any> = await axios.get(`http://localhost:80/user/${requirement.userid}`);

          // 将用户信息添加到 requirement 对象中
          requirement.username = userResponse.data.username;
        }

        requirements.value = response.data;
      } catch (error) {
        console.error('Error fetching requirements:', error);
      }
    });

    return {
      requirements,
      handleCardClick,
    };
  },
});
</script>

<style scoped>
.n-card {
  width: 660px;
  cursor: pointer;
}
.myfooter{
  display: flex;
  justify-content: flex-end;
}
</style>
