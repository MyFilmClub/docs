<!-- UserProfile.vue -->
<template>
  <div id="profile" :style="{ backgroundColor: '#333333' }">
    <!-- 固定在顶部的导航栏 -->
    <header class="navbar">
      <nav style="color: white;">
        <router-link to="/home" class="nav-item">首页</router-link>
        <router-link to="/movie-search" class="nav-item">电影检索</router-link>
        <router-link to="/profile" class="nav-item router-link-active">个人主页</router-link>
      </nav>
      <!-- 搜索框 -->
<!--      <form>-->
<!--        <input-->
<!--            type="text"-->
<!--            placeholder="搜索电影..."-->
<!--            readonly-->
<!--            @click="redirectToSearch"-->
<!--        />-->
<!--      </form>-->
    </header>

    <!-- 分割线 -->
    <div class="separator-line"></div>

    <!-- 个人主页内容 -->
    <div class="content global-scroll">
      <div class="personal-profile">
        <div class="grey-content-container" :style="{ backgroundColor: '#6C6C6C' }">
          <div class="profile-header">
            <div class="profile-info">
              <img :src="userAvatar" :alt="'用户头像'" class="profile-avatar" />
            </div>
            <div class="profile-identity">
              <h3 class="profile-name">{{ userName }}</h3>
              <h3 class="profile-name">{{userId}}</h3>
            </div>
            <!-- 添加设置按钮 -->
            <router-link to="/setting" class="nav-item-settings">
              <i class="el-icon-setting"></i>
            </router-link>
          </div>
          <!-- 线分隔符 -->
          <div class="white-line1"></div>
          <h3>关注电影类型：</h3>
          <div class="tag-container">
            <div v-for="(tag, index) in selectedtags" :key="index" class="tag">
              {{ tag }}
            </div>
            <div class="nav-item-plus">
              <el-popover
                  placement="bottom"
                  trigger="click"
                  width="300"
                  height="auto"
              >
                <div class="posts-popover">
                  <div v-for="(uniqueTag,index) in uniqueTags" :key="index">
                    <el-button class="posts-button" type="primary" @click="addTags(uniqueTag)">
                      {{uniqueTag}}
                    </el-button>
                  </div>
                </div>
                <el-icon slot="reference" class="el-icon-circle-plus-outline"></el-icon>
              </el-popover>
            </div>
          </div>
        </div>

        <!-- 线分隔符 -->
        <div class="white-line2"></div>
        <div class="button-container">
          <button class="button" @click="goToMyPosts">我的帖子</button>
          <button class="button" @click="goToMyCollections">我的收藏</button>
          <button class="button" @click="goToBrowsingHistory">浏览记录</button>
        </div>

        <!-- 笔记列表 -->
        <div v-if="activeTab === 'posts'">
          <div v-for="pp in myPosts" :key="pp.pid" class="movies2-item">
            <div class="note-grey-content-container" :style="{ backgroundColor: '#6C6C6C' }">
              <div class="movies2-info">
                <div @click="gethistory(pp)">
                  <img :src="pp.picurl" alt="电影海报" class="movies2-item">
                </div>
                <div class="movies2-details">
                  <div @click="gethistory(pp)">
                    <h3 class="movies2-title">{{ pp.ptitle }}</h3>
                    <el-rate
                        v-model="pp.value"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}"
                        class="rate">
                    </el-rate>
                    <p class="movies2-description">{{ pp.pcontent }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="activeTab === 'collections'">
          <div v-for="pp in myCollections" :key="pp.pid" class="movies2-item">
            <div class="note-grey-content-container" :style="{ backgroundColor: '#6C6C6C' }">
              <div class="movies2-info">
                <div @click="jump(pp)">
                  <img :src="pp.picurl" alt="电影海报" class="movies2-item">
                </div>
                <div class="movies2-details">
                  <div @click="gethistory(pp)">
                    <h3 class="movies2-title">{{ pp.ptitle }}</h3>
                    <el-rate
                        v-model="pp.value"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}"
                        class="rate">
                    </el-rate>
                    <p class="movies2-description">{{ pp.pcontent }}</p>
                    <!-- 其他电影详情元素... -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="activeTab === 'history'">
          <div v-for="pp in browsingHistory" :key="pp.pid" class="movies2-item">
            <div class="note-grey-content-container" :style="{ backgroundColor: '#6C6C6C' }">
              <div class="movies2-info">
                <div @click="jump(pp)">
                  <img :src="pp.picurl" alt="电影海报" class="movies2-item">
                </div>
                <div class="movies2-details">
                  <div @click="gethistory(pp)">
                    <h3 class="movies2-title">{{ pp.ptitle }}</h3>
                    <el-rate
                        v-model="pp.value"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}"
                        class="rate">
                    </el-rate>
                    <p class="movies2-description">{{ pp.pcontent }}</p>
                    <!-- 其他电影详情元素... -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {

      // 添加个人主页相关数据
      userName: '用户',
      userAvatar: require('./AAA.png'),
      uid: 4,
      userId:'123456',
      tags: ['喜剧', '爱情', '动作', '科幻', '战争', '动漫','犯罪', '恐怖', '家庭', '历史', '剧情', '悬疑','中国', '美国', '韩国', '日本', '中国香港', '中国台湾', '意大利'],
      selectedtags: [],
      activeTab: 'posts', // 初始显示我的帖子
      myPosts: [], // 帖子数据
      myCollections: [], // 收藏数据
      browsingHistory: [], // 浏览记录数据
      dbTagsString: ""
    };
  },
  computed: {
    // 计算属性用于过滤掉selectedtags中存在的标签
    uniqueTags() {
      // 使用filter方法从tags中过滤掉重复的标签
      return this.tags.filter(tag => !this.selectedtags.includes(tag));
    }
  },

  async created() {
    try {
      const response = await axios.get(this.$VUE_API_URL+'/tags/'+this.uid);

      // 将获取到的数据赋值给对应的data属性
      this.dbTagsString = response.data.data;
      console.log(this.dbTagsString)
      // 将字符串转换为数组
      this.selectedtags = this.dbTagsString[0].split(',');

      console.log(this.selectedtags)
    } catch (error) {
      console.error('获取标签数据时出错:', error);
      // 可以在这里处理错误，例如显示错误消息给用户
    }
  },

  methods: {

    async addTags(tag) {
      try {
        const addData = {
          uid: this.uid,
          newTags: tag
        };
        const response = await axios.post(this.$VUE_API_URL+'/updateTags/', addData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        if (response.status === 200) {
          console.log("添加标签" + addData.newTags + "成功");

          // 确保新标签不在selectedtags中才添加，避免重复
          if (!this.selectedtags.includes(tag)) {
            this.selectedtags.push(tag);
          }
        }
      } catch (error) {
        console.error("添加标签时出错:", error);
      }
    },

    async goToMyPosts() {
      // 在此处添加跳转到“我的帖子”页面的逻辑
      this.activeTab = 'posts';
      try {
        const response = await axios.get(this.$VUE_API_URL+'/findPost/' + this.uid); // API路径
        this.myPosts = response.data.data; // 假设返回的数据直接赋值给myPosts

      } catch (error) {
        console.error("Error loading posts:", error);
      }
    },

    async goToMyCollections() {
      // 在此处添加跳转到“我的收藏”页面的逻辑
      this.activeTab = 'collections';
      try {
        const response = await axios.get(this.$VUE_API_URL+'/findCollectedPost/' + this.uid); // API路径
        this.myCollections = response.data.data; // 假设返回的数据直接赋值给myPosts
        // console.log(response.data)
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    },
    async goToBrowsingHistory() {
      // 在此处添加跳转到“浏览记录”页面的逻辑
      this.activeTab = 'history';
      try {
        const response = await axios.get(this.$VUE_API_URL+'/findHistory/' + this.uid); // API路径
        this.browsingHistory = response.data.data; // 假设返回的数据直接赋值给myPosts
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    },

    async gethistory(pp) {
      try {
        // 构建对象
        const historyData = {
          uid: 4, // 用户ID
          pid: pp.pid, // 帖子ID
        };
        console.log(historyData.uid);
        console.log(historyData.pid);
        // 发送POST请求到接口
        const response = await axios.post(this.$VUE_API_URL+'/addHistoryPost', historyData);

        if (response.status === 200) {
          await this.$router.push({
            path: '/postdetails/' + pp.fid,
            query: {id1: pp.fid, id2: pp.pid},
          });
        }
      } catch (error) {
        console.error('请求错误:', error);
        alert('发生错误，请检查网络或稍后重试');
      }
    },

    async jump(pp) {
      try {
        console.log(pp.uid);
        console.log(pp.pid);
        // 发送POST请求到收藏接口

        await this.$router.push({
          path: '/postdetails/' + pp.fid,
          query: {id1: pp.fid, id2: pp.pid},
        });
      } catch (error) {
        console.error('请求错误:', error);
        alert('发生错误，请检查网络或稍后重试');
      }
    },
    selectTags(){

    }
    // onSubmit() {
    //   this.$router.push({ path: '/search', query: { q: this.searchQuery } });
    //   this.searchQuery = '';
    // },
    // redirectToSearch() {
    //   this.$router.push('/searchline');
    // },
  },

};
</script>

<style scoped>

.global-scroll {
//height: 100vh;
//overflow-y: auto;
}
.navbar nav .nav-item {
    color: white;  /* 使用!important以覆盖可能存在的其他样式优先级 */
    font-size: 34px;
    margin-left: 15px;
    margin-right: 15px;
}

/* 鼠标悬停或激活状态 */
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
/*灰色框*/
.grey-content-container {
  border-radius: 24px; /* 任意圆角大小 */
  padding: 10px; /* 可根据需要调整内边距 */
  /* 根据导航栏的高度进行调整 */
  margin-left: 20px;
  margin-right: 20px;
}
.note-grey-content-container {
  border-radius: 24px; /* 任意圆角大小 */
  padding: 10px; /* 可根据需要调整内边距 */
  /* 根据导航栏的高度进行调整 */
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
}

.movie-item h3,
.movie-item p {
  color: white;
}
.profile-header {
  display: flex;
  align-items: center;
}

.profile-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1px; /* 根据需求调整左右间距 */
}

.profile-identity {
  display: flex;
  flex-direction: column;
}
.profile-name {
  font-size: 23px;
  color: #FFFFFF;
  font-weight: normal;
  margin-left: 40px;
  margin-top: 15px;
}
.movie-item img {
  width: 500px; /* 调整图片宽度以适应布局 */
  height: auto;
  margin-bottom: 10px;
}
.profile-avatar {
  width: 130px; /* 根据需求调整头像宽度 */
  height: 130px; /* 根据需求调整头像高度 */
  border-radius: 50%; /* 使图像变为圆形 */
  object-fit: cover; /* 保证图片填满整个区域且不失真 */
  display: block; /* 使其作为一个块级元素显示 */
  margin-left: 20px;

}
.nav-item-settings {
  display: inline-block;
  text-decoration: none;
  color: #FFFFFF;
  margin-left: 100px; /* 根据需要调整间距 */
  cursor: pointer;
  font-size: 30px;

  /* hover 和 active 状态样式 */
  &hover,
  &.router-link-active {
    color: gold !important;
  }

}
h3 {
  /* 设置文本样式 */
  color: #FFFFFF;
}
.white-line1 {
  margin-top: 10px; /* 增加此行代码，以适应导航栏高度 */
  width: 100%;
  height: 1px;
  background-color: #FFFFFF;
  margin-bottom: 8px; /* 为白线与主内容之间添加间距 */
  border-top: 1px solid #BBBBBB; /* 设置顶部边框为1像素宽的实线，颜色为#BBBBBB */
  border-bottom: 1px solid #BBBBBB; /* 设置顶部边框为1像素宽的实线，颜色为#BBBBBB */
}
.white-line2 {
  margin-top: 10px; /* 增加此行代码，以适应导航栏高度 */
  width: 100%;
  height: 1px;
  background-color: #FFFFFF;
  margin-top: 22px; /* 为白线与主内容之间添加间距 */
  border-top: 1px solid #BBBBBB; /* 设置顶部边框为1像素宽的实线，颜色为#BBBBBB */
  border-bottom: 1px solid #BBBBBB; /* 设置顶部边框为1像素宽的实线，颜色为#BBBBBB */
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: normal;
  margin-top: 5px;
}
.tag {
  display: inline-block;
  background-color: orange;
  color: black;
  padding: 0.5em 2.5em;
  border-radius: 15px; /* 圆角大小，可根据需要调整 */
  margin-right: 0.5em;
  margin-bottom: 1em;
}

.nav-item-plus {
  display: inline-block;
  text-decoration: none;
  color: #FFFFFF;
  margin-left: 6px; /* 根据需要调整间距 */
  cursor: pointer;
  font-size: 35px;
}

.posts-popover {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start; /* 需要居中对齐 */
  gap: 10px; /* 为按钮之间添加间距 */
  margin: 5px; /* 根据需要调整外边距 */
}

/* 添加这部分来控制每个按钮的宽度，确保每行两个 */
.posts-popover > div {
  flex: 0 0 calc(60% - 5px); /* 每个按钮占50%减去gap的一半，以适应间距 */
  max-width: calc(30% - 5px); /* 防止在某些情况下宽度超出 */
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  background-color: #333333;
  border: none;
  color: white;
  padding: 0.5em 1em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 30px;
  cursor: pointer;
  margin-right: 0.5em;
}

.button:hover {
  background-color: #333333;
}

.movies2-item {
  display: flex;
  align-items: center;
}

.movies2-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative; /* 为伪元素定位做准备 */
}

.movies2-info::after {
  content: "";
  display: block;
  position: absolute;
  right: 0;
  bottom: 70px;
  left: 0;
}

.rate {
  margin-left: 50px;
}

.movies2-item img {
  width: 152px; /* 调整图片宽度以适应布局 */
  height: 222px;
  margin-bottom: 10px;
  border-radius: 10px; /* 任意圆角大小 */
  margin-left: 10px;
}

.movies2-title {
  color: #FFFFFF;
  margin-left: 50px;
  font-size: 30px;
}

.movies2-description {
  color: #FFFFFF;
  margin-left: 50px;
  font-size: 14px;
}

</style>


