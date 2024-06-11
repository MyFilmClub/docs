<!-- Home.vue -->
<template>
  <div id="home" :style="{ backgroundColor: '#333333' }">
    <!-- 固定在顶部的导航栏 -->
    <header class="navbar">
      <nav style="color: white;">
        <router-link to="/home" class="nav-item active">首页</router-link>
        <router-link to="/movie-search" class="nav-item">电影检索</router-link>
        <router-link to="/profile" class="nav-item">个人主页</router-link>
      </nav>
      <!-- 头像区域 -->
      <div class="avatar-container">
        <img :src="userAvatar" :alt="userDisplayName" class="avatar rounded-circle" />
      </div>

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

    <!-- 主内容区域，从导航栏下方开始，并允许滚动 -->
    <!-- 红线分隔符 -->
    <div class="separator-line"></div>
    <div class="content global-scroll">
      <p class="little_title">院线热映</p>
      <!-- 在.v-for循环中 -->

      <div class="movies1-container">
        <div v-for="movie in movies1" :key="movie.fid" class="movies1-item">
          <router-link :to="{ name: 'moviedetail', params: { id: movie.fid } }" tag="div">
            <img :src="movie.picurl" alt="电影海报">
            <h3>{{ movie.fname }}</h3>
            <!-- 其他电影详情元素... -->
          </router-link>
        </div>
      </div>

    <!--红线分割院线热映和推荐-->
      <div class="separator-line2"></div>


      <div class="recommend-movies">
        <p class="little_title">推荐</p>
        <div v-for="movie in movies2" :key="movie.fid" class="movies2-item">
          <div class="movies2-info">
            <router-link :to="{ name: 'moviedetail', params: { id: movie.fid } }">
              <img :src="movie.picurl" alt="电影海报" class="movies2-item">
            </router-link>
            <div class="movies2-details">
              <router-link :to="{ name: 'moviedetail', params: { id: movie.fid } }" tag="div">
                <h3 class="movies2-title">{{ movie.fname }}</h3>
                <el-rate
                    v-model="movie.rank"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                    class="rate">
                </el-rate>
                <p class="movies2-description">导演：{{movie.director }}</p>
                <p class="movies2-description">编辑：{{ movie.scriptwriter }}</p>
                <p class="movies2-description">主演：{{ movie.actor }}</p>
                <p class="movies2-description">类型：{{ movie.type }}</p>
                <!-- 其他电影详情元素... -->
              </router-link>
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
      // searchQuery: '',
      //模拟电影数据，包含图片URL
      movies0: [
        {
          id : 10,
          title: '电影标题10',
          posterUrl: require('@/views/spider.png') // 使用require导入图片资源
        },
        {
          id : 11,
          title: '电影标题10',
          posterUrl: require('@/views/spider.png') // 使用require导入图片资源
        },
        {
          id : 12,
          title: '电影标题10',
          posterUrl: require('@/views/spider.png') // 使用require导入图片资源
        },
        {
          id : 13,
          title: '电影标题10',
          posterUrl: require('@/views/1.png') // 使用require导入图片资源
        },
        {
          id : 14,
          title: '电影标题10',
          posterUrl: require('@/views/1.png') // 使用require导入图片资源
        },
        {
          id : 15,
          title: '电影标题10',
          posterUrl: require('@/views/1.png') // 使用require导入图片资源
        },
        {
          id : 16,
          title: '电影标题10',
          posterUrl: require('@/views/1.png') // 使用require导入图片资源
        },
        {
          id : 17,
          title: '电影标题10',
          posterUrl: require('@/views/1.png') // 使用require导入图片资源
        },
        {
          id : 18,
          title: '电影标题10',
          posterUrl: require('@/views/1.png') // 使用require导入图片资源
        },
        {
          id : 19,
          title: '电影标题10',
          posterUrl: require('@/views/1.png') // 使用require导入图片资源
        },
      ],
      movies00: [
        {
          id: 1,
          title: '电影标题1',
          value: 4,
          description: '导演: 罗伯·莱纳     ' +
              '编剧: 罗伯·莱纳 / 安德鲁·沙因曼 / 文德琳·范·德拉安南主演: 玛德琳·卡罗尔 / 卡兰·麦克奥利菲 / 瑞贝卡·德·莫妮 ...' +
              '类型: 剧情 / 喜剧 / 爱情',
          posterUrl: require('@/views/1.png') // 使用require导入图片资源
        },
        {
          id: 2,
          title: '电影标题2',
          value: 3,
          description: '这是电影描述2...',
          posterUrl: require('@/views/spider.png') // 使用require导入图片资源
        },
        {
          id: 3,
          title: '电影标题3',
          value: 4,
          description: '这是电影描述2...',
          posterUrl: require('@/views/1.png') // 使用require导入图片资源
        },
        {
          id: 4,
          title: '电影标题4',
          value: 4,
          description: '这是电影描述2...',
          posterUrl: require('@/views/1.png') // 使用require导入图片资源
        },
        {
          id: 5,
          title: '电影标题5',
          value: 4,
          description: '这是电影描述2...',
          posterUrl: require('@/views/1.png') // 使用require导入图片资源
        },
        {
          id: 6,
          title: '电影标题6',
          value: 5,
          description: '这是电影描述2...',
          posterUrl: require('@/views/1.png') // 使用require导入图片资源
        },
        {
          id: 7,
          title: '电影标题7',
          value: 4,
          description: '这是电影描述2...',
          posterUrl: require('@/views/AAA.png') // 使用require导入图片资源
        },

        // 添加更多包含posterUrl属性的电影...
      ],
      movies1: [],
      movies2: [],
      //添加头像和用户名属性
      userAvatar: require('./AAA.png'), // 使用require导入头像资源
      userDisplayName: 'USER', // 用户显示名称
    };
  },
  async created() {
    try {
      // 假设你有两个不同的接口分别用于获取院线热映和推荐电影数据
      const responseMovies1 = await axios.get(this.$VUE_API_URL+'/filmall');
      const responseMovies2 = await axios.get(this.$VUE_API_URL+'/filmall');

      // 将获取到的数据赋值给对应的data属性
      this.movies1 = responseMovies1.data.data;
      this.movies2 = responseMovies2.data.data;
    } catch (error) {
      console.error('获取电影数据时出错:', error);
      // 可以在这里处理错误，例如显示错误消息给用户
    }
  },
  methods: {
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
.little_title {
  color: #FFFFFF;
  font-size: 34px;
  font-weight: bold;
  margin-top: 6px;
  margin-bottom: 30px;
  margin-left: 10px;
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

.separator-line2 {
  margin-top: 70px; /* 增加此行代码，以适应导航栏高度 */
  width: 100%;
  height: 3px;
  background-color: #C20C0C;
  border-top: 1px solid #C20C0C; /* 设置顶部边框为1像素宽的实线，颜色为#BBBBBB */
  border-bottom: 1px solid #C20C0C; /* 设置顶部边框为1像素宽的实线，颜色为#BBBBBB */
  margin-bottom: 5px; /* 为红线与主内容之间添加间距 */
}


.content {
  min-height: calc(100ch - 100px); /* 根据实际情况调整高度 */
  overflow-y: auto;
}

.movies1-container::-webkit-scrollbar {
  width: auto; /* 隐藏滚动条宽度 */
  height: auto; /* 隐藏滚动条高度，对于垂直滚动条 */
}
.movies1-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar; /* 对于IE和Edge，使用自动隐藏滚动条 */
  scrollbar-width: thin; /* 对于Firefox，使用细滚动条样式，而非none */
  -webkit-scrollbar-width: 8px; /* 对于Webkit内核（Chrome, Safari等）显示滚动条 */
  -webkit-scrollbar-track-color: rgba(0, 0, 0, 0.1); /* 设置滚动条轨道颜色 */
  -webkit-scrollbar-thumb-color: rgba(0, 0, 0, 0.5); /* 设置滚动条滑块颜色 */
  overflow-y: hidden;
}

.movies1-item {
  flex: 0 0 auto; /* 设置为弹性项目，并允许自动调整宽度 */
  margin-right: 15px; /* 可根据需要添加间距 */
}

.movies1-item h3,
.movies1-item p {
  color: white;
  margin-left: 60px;
}
.movies1-item img {
  width: 178px; /* 调整图片宽度以适应布局 */
  height: 285px;
  margin-bottom: 10px;
  border-radius: 10px; /* 任意圆角大小 */
  margin-left: 30px;
}

.recommend-movies {
  display: flex;
  flex-direction: column;
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
  height: 4px;
  width: 10000px;
  background-color: #BBBBBB;
}

.rate {
  margin-left: 50px;
}

.movies2-item img {
  width: 285px; /* 调整图片宽度以适应布局 */
  height: 429px;
  margin-bottom: 100px;
  border-radius: 10px; /* 任意圆角大小 */
  margin-left: 60px;
}

.movies2-title {
  color: #FFFFFF;
  margin-left: 50px;
  font-size: 30px;
}

.movies2-description {
  color: #FFFFFF;
  margin-left: 50px;
  font-size: 20px;
}

.avatar-container {
  position: absolute;
  top: 10px;
  right: 10px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
