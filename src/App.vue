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
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <div id="app">
    <n-message-provider>
      <Navbar></Navbar>
    </n-message-provider>
    <div id="title">
    <h1>
      悬赏平台
    </h1>
    <!-- <Test></Test> -->
    <n-message-provider>
      <Post></Post>
    </n-message-provider>
    </div>
    <List></List>
  </div>
  </n-config-provider>
</template>

<style scoped>
  #title{
    display: flex;
      align-items: center;
      justify-content: center;
  }
</style>
