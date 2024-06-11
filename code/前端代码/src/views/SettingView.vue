<!-- Register.vue -->
<template>
  <div id="register" :style="{ backgroundColor: '#333333' }">
    <!-- 固定在顶部的导航栏 -->
    <header class="navbar">
      <nav style="color: white;">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/movie-search" class="nav-item">电影检索</router-link>
        <router-link to="/profile" class="nav-item">个人主页</router-link>
      </nav>

      <!-- 头像区域 -->
      <div class="avatar-container">
        <img :src="userAvatar" :alt="userDisplayName" class="avatar rounded-circle" />
      </div>

<!--      &lt;!&ndash; 搜索框 &ndash;&gt;-->
<!--      <form>-->
<!--        <input-->
<!--            type="text"-->
<!--            placeholder="搜索电影..."-->
<!--            readonly-->
<!--            @click="redirectToSearch"-->
<!--        />-->
<!--      </form>-->
    </header>


    <!-- 红线分隔符 -->
    <div class="separator-line"></div>
    <div class="content global-scroll">
      <!-- 新增一个内容容器，带有灰色背景和圆角 -->
      <div class="grey-content-container" :style="{ backgroundColor: '#6C6C6C' }">
        <div class="profile-info">
          <img :src="userAvatar" :alt="'用户头像'" class="profile-avatar" />
        </div>
        <!-- 表单区域 -->
        <main class="registration-form">
<!--          <button class="avatar-button" >点击上传头像</button>-->
          <input type="username" class="form-control" v-model="user.username" placeholder="请输入新用户名" required>
          <input type="password" class="form-control" v-model="user.password" placeholder="请输入新密码" required>
          <button class="delete-history-button" type="button" @click="deleteHistory(user.uid)">清空历史</button>
          <!-- 更新设置按钮 -->
          <button class="update-button" type="button" @click="updateUserInfo">更新设置</button>
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
      user:{
        username: '',
        password: '',
        uid: 4
      },
      // 添加头像和用户名属性
      userAvatar: require('./AAA.png'), // 使用require导入头像资源
      userDisplayName: '访客', // 用户显示名称
    };
  },
  methods: {
    // onSubmit() {
    //   this.$router.push({ path: '/search', query: { q: this.searchQuery } });
    //   this.searchQuery = '';
    // },
    // redirectToSearch() {
    //   this.$router.push('/searchline');
    // },

    async updateUserInfo() {
      try {
        const response = await axios.put(this.$VUE_API_URL+'/user', this.user); // 假定 '/api' 是你的API基础路径

        if (response.status === 200) {
          this.$message.success('更新成功'); // 假设使用element-ui的message组件
          // 可能还需要其他处理，如刷新页面或数据等
        } else {
          throw new Error('Unexpected response status');
        }
      } catch (error) {
        console.error('更新用户信息时出错:', error);
        this.$message.error('更新失败');
      }
    },

    async deleteHistory(uid) {
      try {
        const response = await axios.get(this.$VUE_API_URL+'/deleteHistory/' + uid);
        console.log(uid)
        if (response.status === 200) {
          this.$message.success('删除浏览历史成功'); // 假设使用element-ui的message组件
          // 可能还需要其他处理，如刷新相关数据等
        } else {
          throw new Error('Unexpected response status');
        }
      } catch (error) {
        console.error('删除浏览历史时出错:', error);
        this.$message.error('删除浏览历史失败');
      }
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
  border-radius: 24px; /* 或者您想要的任意圆角大小 */
  padding: 10px; /* 可根据需要调整内边距 */
  /* 根据导航栏的高度进行调整 */
  margin: 20px 100px;
}

.registration-form input {
  border: 2px solid #FFFFFF; /* 边框颜色和宽度 */
  border-radius: 11px; /* 圆角边框 */
  padding: 16px 12px; /* 内边距 */
  box-sizing: border-box; /* 让边框和内边距不影响元素总宽度 */
  width: 100%; /* 占满父元素宽度 */
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
  color: white;  /* 使用!important以覆盖可能存在的其他样式优先级 */
  font-size: 34px;
  margin-left: 15px;
  margin-right: 15px;
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
.profile-info {
  display: flex;
  justify-content: center;
  margin-left: 1px; /* 根据需求调整左右间距 */
}
.profile-avatar {
  display: flex;

  width: 130px; /* 根据需求调整头像宽度 */
  height: 130px; /* 根据需求调整头像高度 */
  border-radius: 50%; /* 使图像变为圆形 */
  object-fit: cover; /* 保证图片填满整个区域且不失真 */
  display: block; /* 使其作为一个块级元素显示 */

}

.avatar-button {
  margin-top: 0px;
  margin-bottom: 20px;
  width: 100px;
  height: 50px;
  border-radius: 20px;
  border: 2px solid #6C6C6C; /* 边框颜色和宽度 */
}
.form-control {
  font-size: 16px;
  color: #888888;
  background-color: #FFFFFF;
}
.delete-history-button {
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100px;
  height: 50px;
  border-radius: 20px;
  border: 2px solid #6C6C6C; /* 边框颜色和宽度 */
}
.update-button {
  margin-top: 10px;
  margin-bottom: 20px;
  width: 40px;
  height: 50px;
  border-radius: 20px;
  border: 4px solid #FFFFFF; /* 边框颜色和宽度 */
  color: #FFFFFF;
  background-color: #9A9A9A;
}


</style>
