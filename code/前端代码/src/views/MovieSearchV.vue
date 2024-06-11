<!-- Home.vue -->
<template>
  <div id="movie-search" :style="{ backgroundColor: '#333333' }">
    <!-- 固定在顶部的导航栏 -->
    <header class="navbar">
      <nav style="color: white;">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/moviesearchv" class="nav-item active">电影检索</router-link>
        <router-link to="/login" class="nav-item">个人主页</router-link>
      </nav>

<!--      &lt;!&ndash; 搜索框 &ndash;&gt;-->
<!--      <form @submit.prevent="onSubmit">-->
<!--        <input type="text" v-model="searchQuery" placeholder="搜索电影...">-->
<!--      </form>-->
    </header>

    <!-- 主内容区域，从导航栏下方开始，并允许滚动 -->
    <!-- 红线分隔符 -->
    <div class="separator-line"></div>
    <div class="content global-scroll">
      <div v-for="movie in movies" :key="movie.id" class="movie-item">
        <img :src="movie.posterUrl" alt="电影海报">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.description }}</p>
        <!-- 其他电影详情元素... -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // searchQuery: '',
      // 模拟电影数据，包含图片URL
      movies: [
        {
          id: 1,
          title: '电影标题1',
          description: '这是电影描述1...',
          posterUrl: require('@/views/AAA.png') // 使用require导入图片资源
        },
        {
          id: 2,
          title: '电影标题2',
          description: '这是电影描述2...',
          posterUrl: require('@/views/AAA.png') // 使用require导入图片资源
        },
        {
          id: 3,
          title: '电影标题3',
          description: '这是电影描述2...',
          posterUrl: require('@/views/AAA.png') // 使用require导入图片资源
        },
        {
          id: 4,
          title: '电影标题4',
          description: '这是电影描述2...',
          posterUrl: require('@/views/AAA.png') // 使用require导入图片资源
        },
        {
          id: 5,
          title: '电影标题5',
          description: '这是电影描述2...',
          posterUrl: require('@/views/AAA.png') // 使用require导入图片资源
        },
        {
          id: 6,
          title: '电影标题6',
          description: '这是电影描述2...',
          posterUrl: require('@/views/AAA.png') // 使用require导入图片资源
        },
        {
          id: 7,
          title: '电影标题7',
          description: '这是电影描述2...',
          posterUrl: require('@/views/AAA.png') // 使用require导入图片资源
        },

        // 添加更多包含posterUrl属性的电影...
      ],
    };
  },
  methods: {
    // onSubmit() {
    //   this.$router.push({ path: '/search', query: { q: this.searchQuery } });
    //   this.searchQuery = '';
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
  color: white !important; /* 使用!important以覆盖可能存在的其他样式优先级 */
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
</style>
