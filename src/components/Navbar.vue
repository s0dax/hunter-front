<template>
  <div class="navbar">
    <div class="nav-left" style="width: 100px;">
      <!-- 导航栏左侧内容 -->
      <n-space justify="between-around" :wrap="false">
        <!-- <n-button text @click="handleButtonClick('about')" class="nav-button">关于</n-button> -->
        <!-- <n-button text @click="handleButtonClick('contact')" class="nav-button">联系我们</n-button> -->
        <n-button text @click="changetheme">
		      {{ themebtntit }}
        </n-button>
        <Post></Post>
      </n-space>
      
    </div>
    <div class="search-container">
        <n-input clearable :onClear="handleClear" size="large" round v-model:value="keyWordValue" placeholder="搜索" style="max-width: 70%;"/>
        <n-button size = "large" round type="primary" @click="clickSearch">
            <n-icon><search /></n-icon>
        </n-button>
    </div>
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
            color="#FFFFFF00"
            size="large"
            :src="getUserImg()"
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
          <n-form-item-row label="邮箱">
            <n-input v-model:value="userid" placeholder="请输入邮箱"/>
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
      <n-form
        ref="formRef" :model="model" :rules="rules"
      >
          <n-form-item-row label="用户名" path="username">
            <n-input :maxlength="10" placeholder="请输入用户名" v-model:value="model.username" @keydown.enter.prevent/>
          </n-form-item-row>
          <n-form-item-row label="密码" path="password">
            <n-input
              type="password"
              v-model:value="model.password"
              show-password-on="click"
              placeholder="请输入密码"
              :maxlength="16"
              @input="handlePasswordInput"
              @keydown.enter.prevent
            >
      <template #password-visible-icon>
        <n-icon :size="16" :component="GlassesOutline" />
      </template>
      <template #password-invisible-icon>
        <n-icon :size="16" :component="Glasses" />
      </template>
    </n-input>
          </n-form-item-row >
          <n-form-item-row first label="重复密码" ref="rPasswordFormItemRef" path="reenteredPassword">
            <n-input
              v-model:value="model.reenteredPassword"
              :disabled="!model.password"
              @keydown.enter.prevent
              type="password"
              show-password-on="click"
              placeholder="请输入密码"
              :maxlength="16"
            >
      <template #password-visible-icon>
        <n-icon :size="16" :component="GlassesOutline" />
      </template>
      <template #password-invisible-icon>
        <n-icon :size="16" :component="Glasses" />
      </template>
    </n-input>
          </n-form-item-row>
          <n-form-item-row label="邮箱地址" path="mallAddress">
            <!-- <n-input
              @keydown.enter.prevent
              placeholder="请输入邮箱地址"
              v-model:value="model.mallAddress"
            > -->
            <n-auto-complete
              v-model:value="model.mallAddress"
              @keydown.enter.prevent
              :options="mallOptions"
              placeholder="请输入邮箱地址"
            >
            <template #suffix>
                <n-button style="width: 100px;" type="success" strong secondary @click="handleValidateButtonClick">发送验证码</n-button>
            </template>
            </n-auto-complete>
          <!-- </n-input> -->
          </n-form-item-row>
          <n-form-item-row label="专业" path="code">
            <n-input v-model:value="model.department" placeholder="请输入专业"/>
          </n-form-item-row>
          <n-form-item-row label="年级" path="code">
            <n-input v-model:value="model.semester" placeholder="请输入年级"/>
          </n-form-item-row>
          <n-form-item-row label="验证码" path="code">
            <n-input v-model:value="model.code" placeholder="请输入验证码"/>
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong @click="handleSignin">
          注册
        </n-button>
      </n-tab-pane>
    </n-tabs>
  </n-modal>
</template>

<script setup lang="ts">
import Post from './Post.vue'
import { darkTheme } from "naive-ui";
import { inject } from 'vue';
import qs from 'qs'
import { ref,h,computed } from 'vue';
import { useMessage, NIcon,FormInst,FormItemInst,FormItemRule,FormRules } from 'naive-ui';
import {
  // PersonCircleOutline as UserIcon,
  // Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
} from '@vicons/ionicons5';
import { GlassesOutline, Glasses } from '@vicons/ionicons5'
import axios from 'axios';
import { Search } from '@vicons/ionicons5'

interface ModelType {
  username: string | null
  password: string | null
  reenteredPassword: string | null
  mallAddress: string
  code: string | null
  department: string | null
  semester: string | null
}
const model = ref<ModelType>({
      username: null,
      password: null,
      reenteredPassword: null,
      mallAddress: "",
      code: null,
      department: null,
      semester: null
})
const themebtntit = ref("暗色");
const keyWord = inject<any>('keyWord')
const theme = inject<any>('theme')
const keyWordValue = ref('')
const verifyId = ref(0)
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
  const changetheme = () => {
  theme.value = theme.value == null ? darkTheme : null;
  themebtntit.value = themebtntit.value == "亮色" ? "暗色" : "亮色";
};
function validatePasswordStartWith (
    _rule: FormItemRule,
    value: string
  ): boolean {
    return (
      !!model.value.password &&
      model.value.password.startsWith(value) &&
      model.value.password.length >= value.length
    )
  }

function validatePasswordSame (_rule: FormItemRule, value: string): boolean {
    return value === model.value.password
  }
const rules: FormRules = {
      username: [
        {
          required: true,
          validator (_rule: FormItemRule, value: string) {
            if (!value) {
              return new Error('需要用户名')
            } 
            return true
          },
          trigger: ['input', 'blur']
        }
      ],
      password: [
        {
          required: true,
          validator(_rule: FormItemRule, value: string) {
            if (!value) {
              return new Error('请输入密码');
            } else if (value.length < 8) {
              return new Error('密码长度必须大于8位');
            } else if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
              return new Error('密码必须包含数字和字母');
            }
            return true;
          },
          trigger: ['input', 'blur']
        }
      ],
      reenteredPassword: [
        {
          required: true,
          message: '请再次输入密码',
          trigger: ['input', 'blur']
        },
        {
          validator: validatePasswordStartWith,
          message: '两次密码输入不一致',
          trigger: 'input'
        },
        {
          validator: validatePasswordSame,
          message: '两次密码输入不一致',
          trigger: ['blur', 'password-input']
        }
      ],
      mallAddress: [
        {
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }
      ],
      code: [
        {
          required: false,
          message: '请输入验证码'
        }
      ],
      department: [
        {
          required: false,
        }
      ],
      semester: [
        {
          required: false,
        }
      ]
  }
  const handlePasswordInput = () => {
  if (model.value.reenteredPassword) {
    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
  }
}

const clickSearch = () => {
  keyWord.value = keyWordValue.value
}
const handleClear = () => {
  keyWord.value = ''
};
const handleValidateButtonClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      handleVerify()
      message.success('验证码已发送')
    } else {
      message.error('发送失败')
    }
  })
}
const renderIcon = (icon: any) => () => h(NIcon, null, { default: () => h(icon) });
const isLoggedIn = ref(false);
const userid = ref('')
const password = ref('')
const options = [
  // {
  //   label: '用户资料',
  //   key: 'profile',
  //   icon: renderIcon(UserIcon)
  // },
  // {
  //   label: '编辑用户资料',
  //   key: 'editProfile',
  //   icon: renderIcon(EditIcon)
  // },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon),
  }
];

const mallOptions = computed(() => [
  ['谷歌', '@gmail.com'],
  ['网易', '@163.com'],
  ['腾讯', '@qq.com']
].map((emailInfo) => ({
  type: 'group',
  label: emailInfo[0],
  key: emailInfo[0],
  children: [model.value.mallAddress.split('@')[0] + emailInfo[1]]
})));
const handleSelect = (key: string | number) => {
  //message.info(String(key));
  console.log(key);
  if(key=='logout') {
    isLoggedIn.value = false;
    localStorage.removeItem('userInfo');
  }
};
// const handleButtonClick = (route: string) => {
//   console.log(`按钮点击: ${route}`);
// };
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
      IdOrMailAddress: userid.value,
      password: password.value,
    });
    //http://localhost:80 http://43.143.250.26:80
    // 发送登录请求到后端
    const response = await axios.post('http://43.143.250.26:8080/login', requestData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // 设置请求头为表单数据格式
      },
    });

    // 根据后端返回的数据处理登录结果
    if (response.data) {
      // 登录成功，可以保存用户登录状态，执行跳转等操作
      console.log('登录成功');
      const userInfoResponse = await axios.get(`http://43.143.250.26:8080/user/${response.data}`);
      const formData = qs.stringify({
        userid: response.data
      })
      const userImgResponse = await axios.get(`http://43.143.250.26:8080/img/profilePic?${formData}`);
      console.log("imgSrc:",userImgResponse.data.userimgpath)
      // 保存用户信息到localStorage
      localStorage.setItem('userInfo', JSON.stringify({
        userid: Number(response.data),
        username: userInfoResponse.data.username,
        userImg: userImgResponse.data.userimgpath
        // 其他用户信息...
      }));
      console.log(response.data.username)
      isLoggedIn.value = true;
      showModal.value = false;
    } else {
      // 登录失败，可以给用户提供相应的提示信息
      message.error('登录失败，用户名与密码不匹配');
      console.log('登录失败：用户名与密码不匹配');
    }
  } catch (error) {
    console.error('登录出错：', error);
  } finally {
    // 关闭模态框
    //showModal.value = false;
  }
};
const handleSignin = async () => {
  console.log("注册点击")
  console.log("verifyId",verifyId)
  console.log("userInputCode",model.value.code)
  try {
    // 使用qs.stringify将数据转换为适合发送给后端的格式
    const formData = qs.stringify({
      username: model.value.username,
      password: model.value.password,
      userdepartment: model.value.department,
      usersemester: model.value.semester,
      verifyId: verifyId.value,
      userInputCode: model.value.code,
    });
    //http://localhost:80 http://43.143.250.26:80
    // 发送登录请求到后端
    const response = await axios.post('http://43.143.250.26:8080/user/verify',formData,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
});

    // 根据后端返回的数据处理登录结果
    if (response.data) {
      console.log('注册成功');
      const userInfoResponse = await axios.get(`http://43.143.250.26:8080/user/${response.data}`);
      // // 保存用户信息到localStorage
      const formData = qs.stringify({
        userid: response.data
      })
      const userImgResponse = await axios.get(`http://43.143.250.26:8080/img/profilePic?${formData}`);
      localStorage.setItem('userInfo', JSON.stringify({
        userid: Number(response.data),
        username: userInfoResponse.data.username,
        userImg: userImgResponse.data.userimgpath
        // 其他用户信息...
      }));
      // console.log(response.data.username)
      isLoggedIn.value = true;
      showModal.value = false;
    } else {
      // 注册失败
      console.log('注册失败');
    }
  } catch (error) {
    console.error('注册出错：', error);
  } finally {
    // 关闭模态框
    //showModal.value = false;
  }
};
const handleVerify = async () => {
  console.log("验证点击")
  
  try {
    // 使用qs.stringify将数据转换为适合发送给后端的格式
    //http://localhost:80 http://43.143.250.26:80
    const formData = new FormData();
    console.log(formData);
    formData.append('userMailAddress', model.value.mallAddress);
    const response = await axios.post('http://43.143.250.26:8080/user',formData, {
      headers: {
              'Content-Type': 'multipart/form-data',
      },
    });

    // 根据后端返回的数据处理登录结果
    if (response.data) {
      // 登录成功，可以保存用户登录状态，执行跳转等操作
      console.log('验证码发送成功');
      console.log(response.data)
      verifyId.value = response.data
    } else {
      // 登录失败，可以给用户提供相应的提示信息
      console.log('没有获得返回值');
    }
  } catch (error) {
    console.error('注册出错：', error);
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
const getUserImg = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { userImg } = JSON.parse(userInfo);
    const url = 'http://43.143.250.26:8080/defaultProfilePic/'
    return url + userImg;
  }
  return '';
};
</script>

<style scoped>
.navbar {
  min-width: 50%;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left {
  /* display: flex;
  align-items: center; */
}

.nav-right {
  display: flex;
  align-items: center;
}

.nav-button {
  /* background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 10px; */
}

.search-container {
  min-width: 60%;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center;
}
</style>
