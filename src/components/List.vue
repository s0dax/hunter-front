<template>
  <div class="list-container">
    <n-list hoverable clickable>
      <n-list-item v-for="item in backendData" :key="item.id">
        <n-thing :title="item.title" :content-style="item.contentStyle">
          <template #description>
            <n-space size="small" style="margin-top: 4px">
              <n-tag v-for="tag in item.tags" :key="tag" :bordered="false" type="info" size="small">
                {{ tag }}
              </n-tag>
            </n-space>
          </template>
          {{ item.description }}
        </n-thing>
      </n-list-item>
    </n-list>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    // 使用 ref 创建响应式数据
    const backendData = ref([
      {
        id: 1,
        title: '标题',
        contentStyle: 'margin-top: 10px;',
        tags: ['代取', '代取'],
        description: '这里是一段描述这里也是一段描述',
      },
      {
        id: 2,
        title: '标题',
        contentStyle: 'margin-top: 10px;',
        tags: ['代取', '代取'],
        description: '这里是一段描述这里也是一段描述',        
      },
      {
        id: 3,
        title: '标题',
        contentStyle: 'margin-top: 10px;',
        tags: ['代取', '代取'],
        description: '这里是一段描述这里也是一段描述',        
      },
      {
        id: 1,
        title: '标题',
        contentStyle: 'margin-top: 10px;',
        tags: ['代取', '代取'],
        description: '这里是一段描述这里也是一段描述',
      },
      {
        id: 2,
        title: '标题',
        contentStyle: 'margin-top: 10px;',
        tags: ['代取', '代取'],
        description: '这里是一段描述这里也是一段描述',        
      },
      {
        id: 3,
        title: '标题',
        contentStyle: 'margin-top: 10px;',
        tags: ['代取', '代取'],
        description: '这里是一段描述这里也是一段描述',        
      },
      {
        id: 1,
        title: '标题',
        contentStyle: 'margin-top: 10px;',
        tags: ['代取', '代取'],
        description: '这里是一段描述这里也是一段描述',
      },
      {
        id: 2,
        title: '标题',
        contentStyle: 'margin-top: 10px;',
        tags: ['代取', '代取'],
        description: '这里是一段描述这里也是一段描述',        
      },
      {
        id: 3,
        title: '标题',
        contentStyle: 'margin-top: 10px;',
        tags: ['代取', '代取'],
        description: '这里是一段描述这里也是一段描述这里是一段描述这里也是一段描述这里是一段描述这里也是一段描述这里是一段描述这里也是一段描述这里是一段描述这里也是一段描述这里是一段描述这里也是一段描述',        
      },
      // 可以根据后端数据的结构添加更多项
    ]);

    // 返回组件的初始状态
    return {
      backendData,
    };
  },
};
</script>

<style scoped>
.list-container {
  padding: 50px 650px;
}
</style>
