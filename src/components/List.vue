<template>
  <div ref="outerDivRef">
    <n-space vertical size="large" style="align-items: center; margin-top: 20px;">
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
            color="#FFFFFF00"
            :size="58"
            :src="requirement.endtime"
          />
          {{ requirement.username }}
        </n-space>
        </div>
      </template>
      <template #footer>

          <n-space justify="space-between" :wrap-item="false">
            <n-tag :bordered="false" type="warning" size="large" :round="true" style="font-weight: bold;">
            {{ requirement.reward }}元
          </n-tag>
          <div style="height: 10px;">
            <n-time :time="0" :to="requirement.createtime" type="relative"/>
          </div>
          </n-space>

      </template>
      <div>
        {{ requirement.description }}
      </div>

      <img class="img" v-for="image in requirement.img" :src="'http://43.143.250.26:8080/requires/'+requirement.requireid + '/' + image.imgpath">
    </n-card>
    <n-pagination
    size="large"
    v-model:page="page"
    v-model:page-size="pageSize"
    v-model:page-count="totalPages"
    show-size-picker
    :page-sizes="[5, 10, 20, 30]"
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
import qs from 'qs'
import { inject } from 'vue';
interface Requirement {
  userid: number;
  requireid: number;
  title: string;
  description: string;
  reward: string;
  createtime: number;
  endtime: string;
  status: string;
  // 新增用户信息
  username: string;
  img: Array<{
    imgid: number;
    requireid: number;
    imgpath: string;
    imgrealpath: string;
  }>;
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
    const keyWord = inject<any>('keyWord')
    const requirements = ref<Requirement[]>([]);
    const page = ref(1);
    const pageSize = ref(10);
    const totalPages = ref(0);
    const handleCardClick = (requirement: Requirement) => {
      console.log('卡片被点击了！', requirement);
      const now = new Date();

  // 将未来日期字符串转换为日期对象
  const future = new Date('2023-12-29 23:50:45');
  // 计算毫秒差异
  const timeDifference = future.getTime() - now.getTime();
  console.log(timeDifference);
    };

    const fetchData = async () => {
      try {
        const response: AxiosResponse<IPage<Requirement>> = await axios.get(`http://43.143.250.26:8080/search/require`, {
          params: {
            keyword: keyWord.value,
            pageNum: page.value,
            pageSize: pageSize.value,
          },
        });
        if(!response.data) {
          
        }
        // 遍历需求列表，获取用户信息
        for (const requirement of response.data.records) {
          // 根据 userid 发起请求获取用户信息
          const userResponse: AxiosResponse<any> = await axios.get(`http://43.143.250.26:8080/user/${requirement.userid}`); //http://localhost:80 http://43.143.250.26:80
          const formData = qs.stringify({
            userid: requirement.userid
          })
          const userImgResponse = await axios.get(`http://43.143.250.26:8080/img/profilePic?${formData}`);
          const reuqireImgResponse = await axios.get(`http://43.143.250.26:8080/require/${requirement.requireid}/img`);
          requirement.img = reuqireImgResponse.data
          // 将用户信息添加到 requirement 对象中
          requirement.username = userResponse.data.username;
          requirement.endtime = 'http://43.143.250.26:8080/defaultProfilePic/'+userImgResponse.data.userimgpath
          const create = new Date(requirement.createtime);
          const now = new Date();
          const timeDifference = now.getTime() - create.getTime();
          requirement.createtime = timeDifference
        }

        requirements.value = response.data.records;
        totalPages.value = response.data.pages;

      } catch (error) {
        console.error('Error fetching requirements:', error);
      }
    };
    const fetchDataSearch = async () => {
      try {
        const response: AxiosResponse<IPage<Requirement>> = await axios.get(`http://43.143.250.26:8080/search/require`, {
          params: {
            keyword: keyWord.value,
          },
        });
        if(!response.data) {
          
        }
        // 遍历需求列表，获取用户信息
        for (const requirement of response.data.records) {
          // 根据 userid 发起请求获取用户信息
          const userResponse: AxiosResponse<any> = await axios.get(`http://43.143.250.26:8080/user/${requirement.userid}`); //http://localhost:80 http://43.143.250.26:80
          const formData = qs.stringify({
            userid: requirement.userid
          })
          const userImgResponse = await axios.get(`http://43.143.250.26:8080/img/profilePic?${formData}`);
          const reuqireImgResponse = await axios.get(`http://43.143.250.26:8080/require/${requirement.requireid}/img`);
          requirement.img = reuqireImgResponse.data
          // 将用户信息添加到 requirement 对象中
          requirement.username = userResponse.data.username;
          requirement.endtime = 'http://43.143.250.26:8080/defaultProfilePic/'+userImgResponse.data.userimgpath
          const create = new Date(requirement.createtime);
          const now = new Date();
          const timeDifference = now.getTime() - create.getTime();
          requirement.createtime = timeDifference
        }

        requirements.value = response.data.records;
        totalPages.value = response.data.pages;

      } catch (error) {
        console.error('Error fetching requirements:', error);
      }
    };
    // 监听 page 和 pageSize 的变化
    watch([page, pageSize, keyWord], () => {
      fetchData();
    });
    watch([keyWord], () => {
      fetchDataSearch();
    });
    onMounted(fetchData);

    const outerWidth = ref<number>(0);  // 指定 outerWidth 的类型为 number
    const innerWidth = ref<number>(0);  // 指定 innerWidth 的类型为 number

    const outerDivRef = ref<HTMLElement | null>(null);  // 指定 outerDivRef 的类型为 HTMLElement 或 null

    return {
      outerDivRef,
      outerWidth,
      innerWidth,
      keyWord,
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
  width: 700px;
  @media (max-width: 767px) {
    /* 在小于等于 767px 的屏幕上，取消两侧留白 */
    width: 370px;
  }
}
.img {
  width: 515px;
  @media (max-width: 767px) {
    /* 在小于等于 767px 的屏幕上，取消两侧留白 */
    width: 290px;
  }
}
.myfooter{
  display: flex;
  justify-content: flex-end;
}
.n-card-header {
  font-weight: bold;
}
</style>
