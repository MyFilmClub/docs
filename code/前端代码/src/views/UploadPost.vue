<template>
  <div class="review-form">
    <header class="review-header">
      <router-link :to="{ name: 'moviedetail', params: { id: post.movieid } }"  class="nav-item-back">
        <i class="el-icon-arrow-left"></i>
      </router-link>
      <img :src="post.imgurl" :key="post.id" class="header-img">
      <h2 class="h2">写影评：{{post.movie}}</h2>
      <button class="submit-button" @click="submitReview">发布</button>
    </header>

    <div class="rating-section">
      <span>点击星星评分</span>
    </div>
    <el-rate
        class="rate"
        v-model="value"
        show-text
        :texts="texts">
    </el-rate>

    <input type="text" class="title-input" v-model="title" placeholder="标题">
    <div class="separator-line"></div>

    <input type="text" class="detail-input" v-model="content" placeholder="内容">
    <input type="file" ref="fileInput" @change="onFileChange" style="display:none">
    <img v-if="post.previewurl" :src="post.previewurl" alt="Selected Image">
    <div class="separator-line2"></div>
    <i class="el-icon-picture" @click="uploadPic"></i>
  </div>
</template>

<script>

import axios from "axios";
export default {
  data() {
    return {
      value: null,
      texts: ['1', '2', '3', '4', '5'],
      currentRating: 0,
      title: '',
      content: '',
      post: {
        id: '1',
        movieid: this.$route.query.fid,
        movie: '蜘蛛侠纵横宇宙',
        imgurl: '', // 电影海报
        postimageUrl: '', // 用户上传的图片
        previewurl : ''
      }
    };
  },
  async created() {
    try {
      const responseMovies1 = await axios.get(this.$VUE_API_URL+'/film/' + this.post.movieid);

      // 将获取到的数据赋值给对应的data属性
      this.post.imgurl = responseMovies1.data.data.picurl;
      this.post.movie = responseMovies1.data.data.fname;
    } catch (error) {
      console.error('获取电影数据时出错:', error);
      // 可以在这里处理错误，例如显示错误消息给用户
    }
  },

  methods: {
    convertToXML(reviewData) {
      let xmlString = '<review>';
      for (let key in reviewData) {
        xmlString += `<${key}>${reviewData[key]}</${key}>`;
      }
      xmlString += '</review>';
      return xmlString;
    },
    // 当文件选择发生变化时触发
    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) {
        this.post.postimageUrl = '';
        return;
      }
      // 这里仅作为演示，实际应用中你可能需要将文件上传到服务器
      // 然后用返回的URL更新this.imageUrl
      this.previewImage(file);
    },
    // 预览图片
    previewImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.post.previewurl = e.target.result;
        console.log(this.post.previewurl);
      };
      reader.readAsDataURL(file);
    },
    uploadPic(){
      this.$refs.fileInput.click();
    },

    async submitReview() {
      // 确保收集的数据完整
      if ( !this.content === null || this.value === null) {
        alert('请填写完整信息后再提交！');
        return;
      }

      try {
        // 转换数据为XML格式
        const reviewDataXML = this.convertToXML({
          value: this.value,
          ptitle: this.title,
          pcontent: this.content,
          uid: 4,
          fid: this.$route.query.fid,
          // picurl: 'http://10.61.29.218/static/'+ 4 + this.$route.query.fid + this.post.id
          picurl : this.post.previewurl
        });

        // 使用Axios调用后端接口，发送XML数据
        const response = await axios.post(this.$VUE_API_URL+'/uploadpost', reviewDataXML, {
          headers: {
            'Content-Type': 'application/xml', // 更新为XML类型
          },
        });

        if (response.status === 200 || response.status === 201) {
          // 显示用户友好提示
          this.$message.success('评论提交成功！');
          console.log(this.title);
          console.log(this.content);
          console.log(this.value);

          // 成功处理逻辑，清空表单
          this.title = '';
          this.content = '';
          this.value = null;
          this.post.postimageUrl = null;
          await this.$router.push('/moviedetail/' + this.$route.query.fid);
        } else {
          console.error('服务器返回了非预期的状态码:', response.status);
          this.$message.error('评论提交失败，请稍后重试！');
        }
      } catch (error) {
        console.error('提交评论时出错:', error);
        this.$message.error('网络错误，评论提交失败！');
        // 可以根据错误类型细化处理逻辑
      }
    },
  },
};
</script>
<style scoped>
.review-form {
  max-width: 600px;
  margin: auto;
}

.review-header {
  display: flex;

  align-items: center;
  padding: 1rem;
  background-color: #333333;
}
.nav-item-back {
  color: #FFFFFF;
  font-size: 20px;
}
.header-img {
  border-radius: 11px;
  width: 35px;
  height: 60px;
  margin-left: 60px;
}
.submit-button {
  background-color: #E99D42;
  border-radius: 4px;
  width: 80px;
  height: 30px;
  margin-right: 10px;
  margin-top: 8px;
}
.separator-line {
  margin-top: 70px; /* 增加此行代码，以适应导航栏高度 */
  width: 100%;
  height: 1px;
  justify-content: space-between;
  align-items: center;
  background-color: #BBBBBB;
  border-top: 1px solid #BBBBBB; /* 设置顶部边框为1像素宽的实线，颜色为#BBBBBB */
  border-bottom: 1px solid #BBBBBB; /* 设置顶部边框为1像素宽的实线，颜色为#BBBBBB */
  margin-bottom: 5px; /* 为线与主内容之间添加间距 */
}
.h2 {
  margin-left: 30px;
  margin-right: 60px;
  color: #FFFFFF;
  font-size: 20px;
}
.rate {
  margin-left: 20px;
}
.rating-section {
  margin-bottom: 20px;
  color: #BEBEBE;
  font-size: 20px;
  margin-top: 40px;
  margin-left: 20px;
}
.title-input {
  margin-top: 20px;
  margin-left: 20px;
  background-color: transparent; /* 设置背景颜色为透明 */
  border: none; /* 移除边框 */
  outline: none; /* 移除轮廓，避免在聚焦时显示边框 */
  color: white; /* 文本颜色，这里假设你希望文本是白色 */
  color: #9A9A9A;
  font-size: 24px;
}

/* 当输入框聚焦时，可以自定义显示效果 */
.title-input:focus {
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5); /* 示例：在聚焦时显示白色半透明边框阴影 */
}
.detail-input {
  margin-top: 20px;
  margin-left: 20px;
  background-color: transparent; /* 设置背景颜色为透明 */
  border: none; /* 移除边框 */
  outline: none; /* 移除轮廓，避免在聚焦时显示边框 */
  color: white; /* 文本颜色，这里假设你希望文本是白色 */
  color: #9A9A9A;
  font-size: 22px;
}

/* 当输入框聚焦时，可以自定义显示效果 */
.detail-input:focus {
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5); /* 示例：在聚焦时显示白色半透明边框阴影 */
}

.separator-line2 {
  margin-top: 500px; /* 增加此行代码，以适应导航栏高度 */
  width: 100%;
  height: 1px;
  justify-content: space-between;
  align-items: center;
  background-color: #BBBBBB;
  border-top: 1px solid #BBBBBB; /* 设置顶部边框为1像素宽的实线，颜色为#BBBBBB */
  border-bottom: 1px solid #BBBBBB; /* 设置顶部边框为1像素宽的实线，颜色为#BBBBBB */
  margin-bottom: 5px; /* 为线与主内容之间添加间距 */
}

.el-icon-picture {
  margin-top: 10px;
  font-size: 35px;
  margin-left: 20px;
  color: #9A9A9A;
}
</style>
