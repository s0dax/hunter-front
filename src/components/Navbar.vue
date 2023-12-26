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
          <n-button @click="openModal('signin')" class="auth-button">登录</n-button>
          <n-button @click="openModal('signup')" class="auth-button">注册</n-button>
        </n-space>
      </template>
      <template v-else>
        <div style="display: flex;gap: 20px;align-items: center;">
          <span style="font-weight: bold;height: 22.4px;">{{ getUsername() }}</span>
        <!-- 已登录时显示用户头像和下拉菜单 -->
        <div style="height: 34px;width: 34px;">
        <n-dropdown :options="options" @select="handleSelect">
          
            <n-avatar
            size="medium"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
          
        </n-dropdown>
      </div>
        </div>
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
    @closed="handleModalClosed"
  >
  <n-tabs
      class="card-tabs"
      :default-value="activeTab"
      size="large"
      animated
      pane-wrapper-style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <n-tab-pane name="signin" tab="登录">
        <n-form>
          <n-form-item-row label="用户名">
            <n-input v-model:value="userid" placeholder="请输入用户名"/>
          </n-form-item-row>
          <n-form-item-row label="密码">
            <n-input
            v-model:value="password"
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
        <n-button @click="handleLogin" type="primary" block secondary strong>
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
import qs from 'qs'
import { ref,h } from 'vue';
import { NIcon } from 'naive-ui';
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
} from '@vicons/ionicons5';
import Search from './Search.vue'
import { GlassesOutline, Glasses } from '@vicons/ionicons5'
import axios from 'axios';

const renderIcon = (icon: any) => () => h(NIcon, null, { default: () => h(icon) });
const isLoggedIn = ref(false);
const userid = ref('')
const password = ref('')
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
    localStorage.removeItem('userInfo');
  }
};
const handleButtonClick = (route: string) => {
  console.log(`按钮点击: ${route}`);
};
const openModal = (tab: string) => {
      showModal.value = true
      activeTab.value = tab
}
const handleModalClosed = () => {
      // 模态框关闭时重置用户ID和密码
      userid.value = ''
      password.value = ''
  }
const activeTab = ref('signin')
const handleLogin = async () => {
  console.log('当前userid:', userid.value);

  console.log('登录点击');
  try {
    // 使用qs.stringify将数据转换为适合发送给后端的格式
    const requestData = qs.stringify({
      userid: Number(userid.value),
      password: password.value,
    });

    // 发送登录请求到后端
    const response = await axios.post('http://localhost:80/login', requestData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // 设置请求头为表单数据格式
      },
    });

    // 根据后端返回的数据处理登录结果
    if (response.data) {
      // 登录成功，可以保存用户登录状态，执行跳转等操作
      console.log('登录成功');
      const userInfoResponse = await axios.get(`http://localhost:80/user/${userid.value}`);
      // 保存用户信息到localStorage
      localStorage.setItem('userInfo', JSON.stringify({
        userid: Number(userid.value),
        username: userInfoResponse.data.username,
        // 其他用户信息...
      }));
      console.log(response.data.username)
      isLoggedIn.value = true;
      showModal.value = false;
    } else {
      // 登录失败，可以给用户提供相应的提示信息
      console.log('登录失败：用户名与密码不匹配');
    }
  } catch (error) {
    console.error('登录出错：', error);
  } finally {
    // 关闭模态框
    //showModal.value = false;
  }
};
const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
if (userInfo && userInfo.userid) {
  // 用户已登录，设置登录状态
  isLoggedIn.value = true;
}
const bodyStyle = ref({ width: '600px' })
const showModal = ref(false)
const getUsername = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { username } = JSON.parse(userInfo);
    return username;
  }
  return '';
};
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
