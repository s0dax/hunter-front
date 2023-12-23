<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import Main from './components/Main.vue'
// import Table from './components/Table.vue';
import Navbar from './components/Navbar.vue'
// import Test from './components/Test.vue';
import Search from './components/Search.vue'
import List from './components/List.vue'
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue!!!!!!" /> -->
  <div id="app">
    <Navbar></Navbar>
    <div id="title">
      <h1>
      悬赏平台
    </h1>
    </div>
    <Search></Search>
  </div>
  <!-- <n-message-provider>
    <Table></Table>
  </n-message-provider> -->
  <List></List>
</template>

<style scoped>
  #title{
    display: flex;
      align-items: center;
      justify-content: center;
  }
</style>
