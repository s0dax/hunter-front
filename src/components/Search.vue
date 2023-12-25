<template>
    <div class="search-container">
        <n-input size="large" round placeholder="搜索" autosize style="min-width: 70%;"/>
        <n-button size = "large" round type="primary">
            <n-icon><search /></n-icon>
        </n-button>
    </div>
</template>

<script lang="ts">
import { Search } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Search
  }
})
</script>

<style scoped>
.search-container {
  width: 60%;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center;
}
</style>