<template>
  <div class="scrollable-container">
    <div class="row">
      <div class="column">
        <img src="https://example.com/image.jpg" alt="Spider-Man: Across the Spider-Verse" />
      </div>
      <div class="column">
        <h1>小辣不喝水</h1>
        <p>5.0分</p>
        <p>打算去看第二遍!</p>
        <p>本以为《蜘蛛侠：平行宇宙》已经是绝，没想到续作更是令人惊喜。是天花板，是艺术，它拔高了整个超级英雄电影类别的艺术水准。诸多不同的蜘蛛侠造型都是漫画艺术家们使用了不同的媒介来进行创作，他们的描绘方式都带一点自己的独特性。有些人使用记号笔，有些人使用油画刷，有些人使用钢笔……</p>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <ul>
          <li v-for="(item, index) in movies" :key="index">
            <strong>{{ item.title }}</strong>: {{ item.description }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieDetails',
  data() {
    return {
      movies: [
        {
          title: 'Spider-Man: Across the Spider-Verse',
          description: 'A young man named Miguel OHara gains spider-like abilities after a genetic experiment goes wrong.',
          imageUrl: 'https://example.com/image.jpg',
        },
        // Add more movies as needed.
      ],
    }
  },
}
</script>

<style>
.scrollable-container {
  overflow-y: scroll;
  height: calc(100vh - 64px); /* Adjust this value based on your desired scrolling behavior. */
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.column {
  flex-basis: 100%;
  box-sizing: border-box;
  padding: 10px;
}

/* Add other styles as needed. */
</style>
