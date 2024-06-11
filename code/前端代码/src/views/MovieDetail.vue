<template>
    <div id="moviedetail" :style="{ backgroundColor : '#333333' }">
        <!-- 固定在顶部的导航栏 -->
        <header class="navbar">
            <nav style="color: white;">
                <router-link to="/home" class="nav-item active">首页</router-link>
                <router-link to="/movie-search" class="nav-item">电影检索</router-link>
                <router-link to="/profile" class="nav-item">个人主页</router-link>
            </nav>
            <!-- 头像区域 -->
            <div class="avatar-container">
                <img :src="userAvatar" :alt="userDisplayName" class="avatar rounded-circle"/>
            </div>

            <!-- 搜索框 -->
<!--            <form>-->
<!--                <input-->
<!--                        type="text"-->
<!--                        placeholder="搜索电影..."-->
<!--                        readonly-->
<!--                        @click="redirectToSearch"-->
<!--                />-->
<!--            </form>-->
        </header>
        <!-- 红线分隔符 -->
        <div class="separator-line"></div>
        <div class="content global-scroll">
            <div v="movie" class="movies-item">
                <div class="movies-info">
                    <img :src="movie.picurl" alt="电影海报" class="movies-item">
                    <div>
                        <h3 class="movies-title">{{ movie.fname }}</h3>
                        <el-rate
                                v-model="movie.rank"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}"
                                class="movies-rate">
                        </el-rate>
                        <div class="movies-details">
                            <p>导演：{{ movie.director }}</p>
                            <p>编剧：{{ movie.scriptwriter }}</p>
                            <p>主演：{{ movie.actor }}</p>
                            <p>类型：{{ movie.type }}</p>
                            <p>制片国家/地区：{{ movie.area }}</p>
                            <p>语言：{{ movie.language }}</p>
                            <p>上映日期：{{ movie.date }}</p>
                            <p>片长：{{ movie.flength }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <p class="movies-description">电影简介：</p>
            <p class="movies-description">{{ movie.info }}</p>


            <div v-for="film_post in film_posts" :key="film_post.pid">
                <div class="post-grey-content-container" :style="{ backgroundColor: '#6C6C6C' }">
                    <div @click="gethistory(film_post)">
                        <div class="film_posts-info">
                            <img :src="film_post.avaurl" alt="头像" class="film_posts-avatar">
                            <el-rate
                                    v-model="film_post.value"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{value}"
                                    class="film_posts-rate">
                            </el-rate>
                            <div class="film_posts-details">
                                <h3 class="film_posts-title">{{ film_post.ptitle }}</h3>
                            </div>
                        </div>
                        <p class="film_posts-content">{{ film_post.pcontent }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="post-button-container">
            <button class="post-button" @click="goToUploadPost">
                <i class="el-icon-notebook-1"></i> 我要发帖
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    components: {},
    data() {
        return {
            showPostForm: false,
            newFilm_postContent: '',
            userAvatar: require('./AAA.png'), // 使用require导入头像资源
            userDisplayName: 'USER', // 用户显示名称
            movie: {},
            film_posts: [],
        };
    },
    methods: {
        // onSubmit() {
        //     this.$router.push({path: '/search', query: {q: this.searchQuery}});
        //     // 清空查询字段
        //     this.searchQuery = '';
        // },
        // 重定向到搜索界面
        // redirectToSearch() {
        //     this.$router.push('/searchline');
        // },

        async gethistory(film_post) {
          try {
              // 构建收藏对象
              const historyData = {
                uid: 4, // 用户ID
                pid: film_post.pid, // 帖子ID
              };
              console.log(historyData.uid);
              console.log(historyData.pid);
              // 发送POST请求到收藏接口
              const response = await axios.post(this.$VUE_API_URL+'/addHistoryPost', historyData);

                if (response.status === 200) {
                  await this.$router.push({name: 'postdetails', query: {id1: film_post.fid, id2: film_post.pid}});
                }
            } catch (error) {
              console.error('请求错误:', error);
              alert('发生错误，请检查网络或稍后重试');
            }
        },

        // 导航到上传帖子的页面
        goToUploadPost() {
            console.log(this.movie.fid)
            this.$router.push({
                path: '/uploadpost/',
                query: { fid: this.movie.fid}, // 假设movie是当前组件data中的一个对象，包含fid属性
            });
        },
        // 异步加载指定ID的电影详情
        async loadMovie() {
            try {
                // 发送GET请求到'/api/movies/{id}'，其中'{id}'是当前电影的ID
                const response = await axios.get(this.$VUE_API_URL + '/film/' + this.$route.params.id);
                // 将返回的电影数据赋值给this.movie
                this.movie = response.data.data;
                console.log(response.data);
            } catch (error) {
                // 如果发生错误，打印错误信息
                console.error('Error loading movie:', error);
            }
        },
        // 异步加载所有帖子
        async loadFilm_posts() {
            try {
                // 发送GET请求到'/api/film_posts'以获取所有评论
                const response = await axios.get(this.$VUE_API_URL + '/film_post/'+ this.$route.params.id);
                // 将返回的评论数据赋值给this.film_posts
                this.film_posts = response.data.data;
                console.log(this.film_posts[2])
            } catch (error) {
                // 如果发生错误，打印错误信息
                console.error('Error loading film_posts:', error);
            }
        },
    },
// 当组件被挂载到DOM中后调用
    mounted() {
        // 加载电影详情
        this.loadMovie();
        // 加载评论
        this.loadFilm_posts();
    }
};
</script>

<style scoped>
.global-scroll {
//height: 100vh; //overflow-y: auto;
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
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
}

.movies-item {
    display: flex;
    align-items: center;
}

.movies-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative; /* 为伪元素定位做准备 */
}

.movies-info::after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    bottom: 70px;
    left: 0;
}

.movies-rate {
    margin-left: 10px;
}

.movies-item img {
    width: 152px; /* 调整图片宽度以适应布局 */
    height: 222px;
    margin-bottom: 20px;
    border-radius: 10px; /* 任意圆角大小 */
    margin-left: 10px;
    margin-top: 10px;
}

.movies-title {
    color: #FFFFFF;
    margin-left: 10px;
    font-size: 20px;
    font-weight: normal;
    margin-top: 10px;
}

.movies-details {
    margin-top: 10px;
    margin-left: 10px;
    color: #CECECE;
    font-size: 14px;
}

.movies-description {
    color: #CECECE;
    margin-left: 20px;
    font-size: 14px;
    margin-bottom: 5px;
}

/*灰色框*/
.post-grey-content-container {
    border-radius: 24px; /* 任意圆角大小 */
    padding: 10px; /* 可根据需要调整内边距 */
    /* 根据导航栏的高度进行调整 */
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 17px;
    margin-bottom: 30px;
}

.film_posts-avatar {
    width: 50px; /* 根据需求调整头像宽度 */
    height: 50px; /* 根据需求调整头像高度 */
    border-radius: 50%; /* 使图像变为圆形 */
    object-fit: cover; /* 保证图片填满整个区域且不失真 */
    display: block; /* 使其作为一个块级元素显示 */
    margin-left: 7px;

}

.film_posts-info {
    display: flex;
    flex-direction: row;
    position: relative; /* 为伪元素定位做准备 */
}

.film_posts-info::after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    bottom: 70px;
    left: 0;
}

.film_posts-rate {
    margin-left: 15px;
    margin-top: 10px;
}

.film_posts-title {
    margin-left: 15px;
    margin-top: 10px;
    color: #FFFFFF;
    font-size: 18px;
}

.film_posts-content {
    color: #FFFFFF;
    font-size: 16px;
    margin: 5px 14px 10px;
}


.post-button-container {
    position: fixed;
    bottom: 20px; /* 这个值可以根据需要调整，用来设定距离底部的距离 */
    left: 50%; /* 将按钮水平居中 */
    transform: translateX(-50%); /* 使用transform来偏移，使其真正居中 */
    z-index: 100; /* 确保按钮始终在所有内容之上显示 */
}

.post-button {
    background-color: #951D1D;
    border-radius: 23px;
    border: 1px solid #BBBBBB;
    width: 400px;
    height: 50px;
    color: white;
    cursor: pointer;
    font-size: 20px; /* 可按需调整字体大小 */
    font-weight: bold;
    line-height: normal;
    padding: 10px 20px; /* 可按需调整内边距以改变按钮尺寸 */
    text-align: center;
    transition: all 0.3s ease; /* 添加过渡效果使按钮交互更平滑 */
}
</style>
