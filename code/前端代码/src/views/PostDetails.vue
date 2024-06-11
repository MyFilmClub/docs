<template>
    <div id="postdetails" :style="{ backgroundColor:'#333333' }">
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
            <div class="grey-content-container" :style="{ backgroundColor: '#6C6C6C' }">
                <div v="posts" :key="posts.pid">
                    <div class="posts-info">
                        <img :src="posts.avaurl" alt="头像" class="posts-avatar">
                        <span class="posts-username">{{ posts.username }}</span>
<!--                        <div>-->
<!--                            <el-popover-->
<!--                                    placement="bottom"-->
<!--                                    trigger="click"-->
<!--                                    width="7px"-->
<!--                            >-->
<!--                                <div class="posts-popover">-->
<!--                                    <el-button class="posts-button" type="primary" icon="el-icon-edit-outline">-->
<!--                                        编辑帖子-->
<!--                                    </el-button>-->
<!--                                    <el-button class="posts-button" type="primary" icon="el-icon-delete">删除帖子-->
<!--                                    </el-button>-->
<!--                                </div>-->
<!--                                <el-icon slot="reference" class="el-icon-circle-plus-outline"></el-icon>-->
<!--                            </el-popover>-->
<!--                        </div>-->
                    </div>
                    <el-rate
                            v-model="posts.value"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}"
                            class="posts-rate">
                    </el-rate>
                    <h1 class="posts-title">{{ posts.ptitle }}</h1>
                    <p class="posts-details">{{ posts.pcontent }}</p>
                    <img :src="posts.picurl" class="posts-img">
<!--                    <p class="posts-details">{{ posts.description2 }}</p>-->
<!--                    <img :src="imageUrl2" class="posts-img">-->
<!--                    <p class="posts-details">{{ posts.description3 }}</p>-->
<!--                    <img :src="imageUrl3" class="posts-img">-->
                </div>
                <div class="icon d-flex justify-content-between align-items-center">
                    <!-- 浏览数 -->
                    <div class="view-count">
                        <img :src="viewdurl" class="like-img mr-2">{{ posts.seenum }}
                    </div>

                    <!-- 点赞数 -->
                    <div class="like-count">
                        <i
                                size="small"
                                :type="liked ? 'danger' : 'primary'"
                                @click="toggleLike"
                        >
                            <img :src="likedurl" class="like-img" v-if="liked">
                            <img :src="likeurl" class="like-img" v-else>
                            {{ posts.likenum }}
                        </i>
                    </div>

                    <!-- 收藏数 -->
                    <div class="collection-count">
                        <i
                                size="small"
                                :type="favorited ? 'danger' : 'primary'"
                                @click="toggleFavorite"
                        >
                            <img :src="colectedurl" class="like-img" v-if="favorited">
                            <img :src="collecturl" class="like-img" v-else>
                            {{ posts.collectnum }}
                        </i>
                    </div>
                </div>
                <div class="post_comments-info">
                    <div>
                        <img :src="posts.avaurl" :alt="posts.username" class="comment-self-avatar"/>
                    </div>
                    <!-- 框 -->
                    <form>
                        <input
                                class="input-container"
                                type="text"
                                placeholder="请输入..."
                        />
                    </form>
                </div>

                <div v-for="comment in post_comments" :key="comment.cid">
                    <div class="comment-grey-content-container" :style="{ backgroundColor: '#6C6C6C' }">
                        <div class="post_comments-info">
                                          <img :src="comment.avaurl" alt="头像" class="post_comments-avatar">
                            <div>
                                                <span class="post_comments-username">{{comment.username}}</span>
                                <p class="post_comments-comment">{{ comment.ccontent }}</p>
                                <div class="icon d-flex justify-content-between align-items-center">
<!--                                    <div class="comment-like-icon">-->
<!--                                        <i-->
<!--                                                size="small"-->
<!--                                                :type="Commentliked ? 'danger' : 'primary'"-->
<!--                                                @click="toggleLikeComment"-->
<!--                                        >-->
<!--                                            <img :src="likedurl" class="post_comments-like-icon" v-if="Commentliked">-->
<!--                                            <img :src="likeurl" class="post_comments-like-icon" v-else>-->
<!--                                            {{ comment.likenum }}-->
<!--                                        </i>-->
<!--                                    </div>-->
<!--                                    <div class="comment-dislike-icon">-->
<!--                                        <i-->
<!--                                                size="small"-->
<!--                                                :type="disliked ? 'danger' : 'primary'"-->
<!--                                                @click="toggleDisLike"-->
<!--                                        >-->
<!--                                            <img :src="dislikedurl" class="post_comments-dislike-icon" v-if="disliked">-->
<!--                                            <img :src="dislikeurl" class="post_comments-dislike-icon" v-else>-->
<!--                                            {{ comment.dislikenum }}-->
<!--                                        </i>-->
<!--                                    </div>-->
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
            // searchQuery: '',
            //添加头像和用户名属性
            userAvatar: require('./AAA.png'), // 使用require导入头像资源
            userDisplayName: 'USER', // 用户显示名称
            liked: false,
            favorited: false,
            disliked: false,
            Commentliked: false,
            likeurl: require('./likes.png'),
            likedurl: require('./liked.png'),
            viewdurl: require('./viewd.png'),
            dislikeurl: require('./dislike.png'),
            dislikedurl: require('./disliked.png'),
            collecturl: require('./collect.png'),
            colectedurl: require('./collected.png'),
            imageUrl1: require('./img1.png'),
            imageUrl2: require('./img2.png'),
            imageUrl3: require('./img3.png'),
            avatar: null,
            username: null,
            posts:{},
            post_comments: [],
            uuid: 4,
        }
    },
    methods: {
        // onSubmit() {
        //     this.$router.push({path: '/search', query: {q: this.searchQuery}});
        //     this.searchQuery = '';
        // },
        // redirectToSearch() {
        //     this.$router.push('/searchline');
        // },
        async toggleLike() {
            this.liked = !this.liked;
            if (this.liked) {
                this.posts.likes++;
            } else {
                this.posts.likes--;
            }
          try {
            // 构建对象
            const likeData = {
              uid: 4, // 用户ID
              pid: this.$route.query.id2, // 帖子ID
            };
            console.log(likeData.uid);
            console.log(likeData.pid);
            // const uid = this.uuid;
            // const pid = this.$route.query.id2;
            // console.log(uid);
            // console.log(pid);
            // 发送POST请求到接口
            const response = await axios.post(this.$VUE_API_URL + '/postlike', likeData, {
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' } // 设置Content-Type
            });

            if (response.status === 200) {
              console.log('点赞成功');
              alert('点赞成功');
            } else {
              console.error('收藏失败');
              alert('点赞失败，请重试');
            }
          } catch (error) {
            console.error('请求错误:', error);
            alert('发生错误，请检查网络或稍后重试');
          }
        },
        async toggleFavorite() {
            this.favorited = !this.favorited;
            if (this.favorited) {
                this.posts.collections++;
            } else {
                this.posts.collections--;
            }
            try {
                // 构建收藏对象
                const collectData = {
                  uid: 4, // 用户ID
                  pid: this.$route.query.id2, // 帖子ID
                };
                console.log(collectData.uid);
                console.log(collectData.pid);
                // 发送POST请求到收藏接口
                const response = await axios.post(this.$VUE_API_URL+'/collect', collectData);

                if (response.status === 200) {
                  console.log('收藏成功');
                  alert('收藏成功');
                } else {
                  console.error('收藏失败');
                  alert('收藏失败，请重试');
                }
            } catch (error) {
              console.error('请求错误:', error);
              alert('发生错误，请检查网络或稍后重试');
            }
        },
        toggleLikeComment() {
            this.Commentliked = !this.Commentliked;
            if (this.Commentliked) {
                this.comment.like++;
            } else {
                this.comment.like--;
            }
        },
        toggleDisLike() {
            this.disliked = !this.disliked;
            if (this.disliked) {
                this.comment.dislike++;
            } else {
                this.comment.dislike--;
            }
        },

        userInput: '',
        async loadPost() {
            try {
                // 发送GET请求到'/api/post'以获取所有帖子
                const response = await axios.get(this.$VUE_API_URL + '/post_detail/' + this.$route.query.id2);
                // 将返回的评论数据赋值给this.film_posts
                this.posts = response.data.data;
            } catch (error) {
                // 如果发生错误，打印错误信息
                console.error('Error loading post:', error);
            }
        },
        // 异步加载所有帖子评论
        async loadComments() {
            try {
                // 发送GET请求到'/api/film_posts'以获取所有评论
                const response = await axios.get(this.$VUE_API_URL + '/post_comments/' + this.$route.query.id2);
                // 将返回的评论数据赋值给this.film_posts
                this.post_comments = response.data.data;
            } catch (error) {
                // 如果发生错误，打印错误信息
                console.error('Error loading post_comments:', error);
            }
        },
    },
    // 当组件被挂载到DOM中后调用
    mounted() {

        // 加载帖子信息
        this.loadPost();
        // 加载评论
        this.loadComments();
    }
}
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

/*灰色框*/
.grey-content-container {
    border-radius: 24px; /* 任意圆角大小 */
    padding: 20px; /* 可根据需要调整内边距 */
    /* 根据导航栏的高度进行调整 */
    margin: 20px 20px;
    border-width: 1px;
    border-style: solid;
    border-color: #BBBBBB;
}

.posts-info {
    display: flex;
    flex-direction: row;
    position: relative; /* 为伪元素定位做准备 */
}

.posts-info::after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    bottom: 70px;
    left: 0;
}

.posts-avatar {
    width: 50px; /* 根据需求调整头像宽度 */
    height: 50px; /* 根据需求调整头像高度 */
    border-radius: 50%; /* 使图像变为圆形 */
    object-fit: cover; /* 保证图片填满整个区域且不失真 */
    display: block; /* 使其作为一个块级元素显示 */
    margin-left: 7px;
}

.posts-rate {
    margin-left: 15px;
    margin-top: 10px;
}

.posts-username {
    color: #FFFFFF;
    font-size: 18px;
    margin-top: 13px;
    margin-left: 10px;
}

.el-icon-circle-plus-outline {
    margin-left: 300px;
    font-size: 30px;
    color: #FFFFFF;
}

/* 改变弹出框背景色 */
.el-popover {
    background-color: #333333 !important;
}

/* 让按钮纵向排列 */
.posts-popover {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px; /* 为按钮之间添加间距 */
}

.posts-button {
    background: #333333;
    font-size: 18px;
}

.posts-title {
    margin-left: 15px;
    margin-top: 10px;
    color: #FFFFFF;
    font-size: 20px;
}

.posts-details {
    margin-left: 15px;
    margin-top: 10px;
    color: #FFFFFF;
    font-size: 16px;
    line-height: 1.7;
}

.posts-img {
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 15px;
    max-width: 90%; /* 修改宽度为父组件的90% */
    height: auto;   /* 自动调整高度以保持原始纵横比 */
}

.icon {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.like-img {
    width: 50px;
    height: 50px;
}

.comment-self-avatar {
    margin-left: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}


.input-container {
    margin-top: 8px;
    width: 440px;
    height: 40px;
}

.comment-grey-content-container {
    border-radius: 24px; /* 任意圆角大小 */
    padding: 20px; /* 可根据需要调整内边距 */
    /* 根据导航栏的高度进行调整 */
    margin: 20px 20px;
    border-width: 1px;
    border-style: solid;
    border-color: #BBBBBB;
}

.post_comments-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative; /* 为伪元素定位做准备 */
}

.post_comments-info::after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    bottom: 70px;
    left: 0;
}

.post_comments-avatar {
    width: 50px; /* 根据需求调整头像宽度 */
    height: 50px; /* 根据需求调整头像高度 */
    border-radius: 50%; /* 使图像变为圆形 */
    object-fit: cover; /* 保证图片填满整个区域且不失真 */
    display: block; /* 使其作为一个块级元素显示 */
    margin-left: 1px;
}

.post_comments-username {
    color: #FFFFFF;
    font-size: 18px;
    margin-top: 13px;
    margin-left: 5px;
}

.post_comments-comment {
    color: #FFFFFF;
    font-size: 16px;
    margin-top: 4px;
    margin-left: 2px;
}

.post_comments-like-icon {
    margin-top: 20px;
    margin-left: 250px;
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
}

.post_comments-dislike-icon {
    margin-top: 20px;
    margin-left: 0px;
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
}

</style>
