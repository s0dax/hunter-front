<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import Main from './components/Main.vue'
// import Table from './components/Table.vue';
import Navbar from './components/Navbar.vue'
// import Test from './components/Test.vue';
// import Search from './components/Search.vue'
import List from './components/List.vue'
import Post from './components/Post.vue'
// import Demo from './components/Demo.vue'
import { zhCN,dateZhCN } from "naive-ui";
import { ref, provide } from 'vue';
import { darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'
const theme = ref<GlobalTheme | null>(null)
theme.value = theme.value
const keyWord = ref('');
provide('keyWord', keyWord);
provide('theme',theme)
</script>

<template>
    <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <div id="app">
      <n-layout-header bordered>
        <n-message-provider>
          <Navbar></Navbar>
        </n-message-provider>

      </n-layout-header>
      <n-layout-content>
      <div id="title">
      <h1>
      悬赏平台
    </h1>
    <n-message-provider>
      <Post></Post>
    </n-message-provider>
    </div>
    <List></List>
      </n-layout-content>


  </div>
  <n-global-style />
  </n-config-provider>
  
</template>

<style scoped>
  #title{
    display: flex;
      align-items: center;
      justify-content: center;
  }
</style>
