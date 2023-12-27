<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import Main from './components/Main.vue'
// import Table from './components/Table.vue';
import Navbar from './components/Navbar.vue'
// import Test from './components/Test.vue';
// import Search from './components/Search.vue'
import List from './components/List.vue'
import Post from './components/Post.vue'
</script>

<template>
    <div id="app">
    <Navbar></Navbar>
    <div id="title">
      <h1>
      悬赏平台
    </h1>
    <Post></Post>
    </div>
    <List></List>
  </div>
</template>

<style scoped>
  #title{
    display: flex;
      align-items: center;
      justify-content: center;
  }
</style>
