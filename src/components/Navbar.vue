<template>
  <div class="navbar">
    <div class="nav-left">
      <!-- 导航栏左侧内容 -->
      <n-space>
        <n-button text @click="handleButtonClick('home')" class="nav-button">首页</n-button>
        <n-button text @click="handleButtonClick('about')" class="nav-button">关于</n-button>
        <n-button text @click="handleButtonClick('contact')" class="nav-button">联系我们</n-button>
      </n-space>
      
    </div>
    <Search></Search>
    <div class="nav-right">
      <!-- 导航栏右侧内容，包括登录注册和用户头像下拉菜单 -->
      <template v-if="!isLoggedIn">
        <!-- 未登录时显示登录和注册按钮 -->
        <n-space>
          <n-button @click="handleLogin" class="auth-button">登录</n-button>
          <n-button @click="showModal = true" class="auth-button">注册</n-button>
        </n-space>
      </template>
      <template v-else>
        <!-- 已登录时显示用户头像和下拉菜单 -->
        <n-dropdown :options="options" @select="handleSelect">
          <n-avatar
            round
            size="medium"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </n-dropdown>
      </template>
    </div>
  </div>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    title="您还没有登录"
    :style="bodyStyle"
    size="huge"
    :bordered="false"
  >
  <n-tabs
      class="card-tabs"
      default-value="signin"
      size="large"
      animated
      pane-wrapper-style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <n-tab-pane name="signin" tab="登录">
        <n-form>
          <n-form-item-row label="用户名">
            <n-input placeholder="请输入用户名"/>
          </n-form-item-row>
          <n-form-item-row label="密码">
            <n-input
      type="password"
      show-password-on="click"
      placeholder="请输入密码"
      :maxlength="8"
    >
      <template #password-visible-icon>
        <n-icon :size="16" :component="GlassesOutline" />
      </template>
      <template #password-invisible-icon>
        <n-icon :size="16" :component="Glasses" />
      </template>
    </n-input>
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong>
          登录
        </n-button>
      </n-tab-pane>
      <n-tab-pane name="signup" tab="注册">
        <n-form>
          <n-form-item-row label="用户名">
            <n-input placeholder="请输入用户名"/>
          </n-form-item-row>
          <n-form-item-row label="密码">
            <n-input
      type="password"
      show-password-on="click"
      placeholder="请输入密码"
      :maxlength="8"
    >
      <template #password-visible-icon>
        <n-icon :size="16" :component="GlassesOutline" />
      </template>
      <template #password-invisible-icon>
        <n-icon :size="16" :component="Glasses" />
      </template>
    </n-input>
          </n-form-item-row>
          <n-form-item-row label="重复密码">
            <n-input
      type="password"
      show-password-on="click"
      placeholder="请输入密码"
      :maxlength="8"
    >
      <template #password-visible-icon>
        <n-icon :size="16" :component="GlassesOutline" />
      </template>
      <template #password-invisible-icon>
        <n-icon :size="16" :component="Glasses" />
      </template>
    </n-input>
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong>
          注册
        </n-button>
      </n-tab-pane>
    </n-tabs>
  </n-modal>
</template>

<script setup lang="ts">
import { ref,h } from 'vue';
import { NIcon } from 'naive-ui';
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
} from '@vicons/ionicons5';
import Search from './Search.vue'
import { GlassesOutline, Glasses } from '@vicons/ionicons5'
const renderIcon = (icon: any) => () => h(NIcon, null, { default: () => h(icon) });
const isLoggedIn = ref(false);
// const handleLogout = () => {
//   console.log('退出账号点击');
//   isLoggedIn.value = false; // 退出账号成功后设置为 false
// };

const options = [
  {
    label: '用户资料',
    key: 'profile',
    icon: renderIcon(UserIcon)
  },
  {
    label: '编辑用户资料',
    key: 'editProfile',
    icon: renderIcon(EditIcon)
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon),
  }
];
const handleSelect = (key: string | number) => {
  //message.info(String(key));
  console.log(key);
  if(key=='logout') {
    isLoggedIn.value = false;
  }
};
const handleButtonClick = (route: string) => {
  console.log(`按钮点击: ${route}`);
};

const handleLogin = () => {
  console.log('登录点击');
  isLoggedIn.value = true; // 登录成功后设置为 true
};

// const handleRegister = () => {
//   console.log('注册点击');
// };
const bodyStyle = ref({ width: '600px' })
const showModal = ref(false)
</script>

<style scoped>
.navbar {
  background-color: #fff;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left {
  display: flex;
  align-items: center;
}

.nav-right {
  display: flex;
  align-items: center;
}

.nav-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
}
</style>
