<!-- Register.vue -->
<template>
  <div id="register" :style="{ backgroundColor: '#333333' }">
    <!-- 固定在顶部的导航栏 -->
    <header class="navbar">
      <nav style="color: white;">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/moviesearchv" class="nav-item">电影检索</router-link>
        <router-link to="/profile" class="nav-item">个人主页</router-link>
      </nav>

      <!-- 头像区域 -->
      <div class="avatar-container">
        <img :src="userAvatar" :alt="userDisplayName" class="avatar rounded-circle" />
      </div>

      <!-- 搜索框 -->
      <form>
        <input
            type="text"
            placeholder="搜索电影..."
            readonly
            @click="redirectToSearch"
        />
      </form>
    </header>


    <!-- 红线分隔符 -->
    <div class="separator-line"></div>
    <div class="content global-scroll">
      <!-- 新增一个内容容器，带有灰色背景和圆角 -->
      <div class="grey-content-container" :style="{ backgroundColor: '#6C6C6C' }">
        <!-- 注册标题 -->
        <h2 class="registration-title">注册</h2>
        <!-- 注册表单区域 -->
        <main class="registration-form">
          <form @submit.prevent="onRegisterSubmit">
            <div class="rice-content-container" :style="{backgroundColor: '#EBC795'}">
              <input type="username" class="form-control" v-model="user.username" placeholder="请输入用户名" required>
              <input type="password" class="form-control" v-model="user.password" placeholder="请输入密码" required>
              <input type="confirmPassword" class="form-control" v-model="user.confirmPassword" placeholder="请再次输入密码" required>

              <button type="submit">注册</button>
              <p v-if="passwordMessage" class="message">{{ passwordMessage }}</p>
              <p v-if="message" class="message">{{ message }}</p>
            </div>

            <!-- 返回登录按钮 -->
            <button type="button" @click="goToLogin">返回登录</button>
          </form>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
        confirmPassword: '',
      },
      // 添加头像和用户名属性
      userAvatar: require('./white.png'), // 使用require导入头像资源
      userDisplayName: '访客', // 用户显示名称
      message: '',
      passwordMessage: '',
    };
  },
  computed: {
    isPasswordMatch() {
      return this.user.password === this.user.confirmPassword;
    },
  },
  methods: {
    async onRegisterSubmit() {
      if (!this.isPasswordMatch) {
        this.passwordMessage = '两次输入的密码不一致';
        return;
      }

      try {
        const response = await axios.post(this.$VUE_API_URL + '/user/signup', this.user);

        if (response.status === 200) {
          this.message = '注册成功！';
          // 可以在此处添加逻辑，比如跳转到登录页面
        } else {
          throw new Error('注册失败，未知错误。');
        }
      } catch (error) {
        if (error.response && error.response.data.message === "username exist") {
          this.message = '用户名已存在！';
        } else {
          this.message = '注册时发生错误，请重试。';
          console.error('注册失败:', error);
        }
      } finally {
        this.passwordMessage = ''; // 清除密码确认错误信息
      }
    },
    goToLogin() {
      this.$router.push('/login');
    },
    onSubmit() {
      this.$router.push({ path: '/search', query: { q: this.searchQuery } });
      this.searchQuery = '';
    },
    redirectToSearch() {
      this.$router.push('/searchline');
    },
  },
};
</script>

<style scoped>
.global-scroll {
//height: 100vh;
//overflow-y: auto;
}
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

#register {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

/*灰色框*/
.grey-content-container {
  border-radius: 24px; /* 任意圆角大小 */
  padding: 100px; /* 可根据需要调整内边距 */
  /* 根据导航栏的高度进行调整 */
  margin: 20px 100px;
}
/*米色框*/
.rice-content-container {
  border-radius: 24px; /* 或者您想要的任意圆角大小 */
  padding: 80px; /* 可根据需要调整内边距 */
  margin-top: 20px; /* 根据导航栏的高度进行调整 */
}
.registration-form input {
  border: 2px solid #FFFFFF; /* 边框颜色和宽度 */
  border-radius: 11px; /* 圆角边框 */
  padding: 16px 12px; /* 内边距 */
  box-sizing: border-box; /* 让边框和内边距不影响元素总宽度 */
  width: 200px; /* 占满父元素宽度 */
  outline: none; /* 移除浏览器默认轮廓 */

  color: #FFFFFF; /* 文字颜色 */
  background-color: #9A9A9A; /* 输入框背景颜色 */
}
.registration-form {
  position: relative;
  top: 5px; /* 适配导航栏高度 */
  padding: 30px 2rem 2rem; /* 增加顶部内边距为30像素 */
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center; /* 如果需要垂直居中 */
}
/*注册*/
.registration-title {
  font-size: 50px;
  font-weight: bold;
  color: white;
  text-align: center;
  margin: 0 0 10px;

}

.registration-form label,
.registration-form input {
  display: block;
  margin-bottom: 1rem;
}

.registration-form button {
  width: 100%;
  margin-top: 2rem;
}
.navbar nav .nav-item {
  color: white  /* 使用!important以覆盖可能存在的其他样式优先级 */
}

/* 如果是鼠标悬停或激活状态也需要变白，可以添加以下样式 */
.navbar nav .nav-item:hover,
.navbar nav .nav-item.router-link-active {
  color: gold !important;
}
.navbar {
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #333333;
  padding: 1rem;
  z-index: 50; /* 确保导航栏在内容之上 */
}
.separator-line {
  margin-top: 100px; /* 增加此行代码，以适应导航栏高度 */
  width: 100%;
  height: 20px;
  background-color: #C20C0C;
  border-top: 1px solid #BBBBBB; /* 设置顶部边框为1像素宽的实线，颜色为#BBBBBB */
  border-bottom: 1px solid #BBBBBB; /* 设置顶部边框为1像素宽的实线，颜色为#BBBBBB */
  margin-bottom: 5px; /* 为红线与主内容之间添加间距 */
}

.content {
  min-height: calc(100ch - 100px); /* 根据实际情况调整高度 */
  overflow-y: auto;
}

.movie-item h3,
.movie-item p {
  color: white;
}
.movie-item img {
  width: 500px; /* 调整图片宽度以适应布局 */
  height: auto;
  margin-bottom: 10px;
}
.avatar-container {
  position: absolute;
  top: 10px;
  right: 10px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.message {
  text-align: center; /* 水平居中 */
  margin: 10px auto; /* 上下外边距为10px，左右自动，实现水平居中 */
}



</style>
