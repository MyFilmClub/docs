<template>
  <div class="container">
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="搜索" />
      <button @click="clearSearchHistory">清除搜索历史</button>
    </div>
    <div class="search-history">
      <h3>搜索历史</h3>
      <ul>
        <li v-for="(item, index) in searchHistory" :key="index">
          <span class="remove" @click="removeItem(index)">X</span>
          <span class="search-term">{{ item }}</span>
        </li>
      </ul>
    </div>
    <div class="hot-search">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="(item, index) in hotSearches" :key="index">
          <span class="search-term">{{ item }}</span>
        </li>
      </ul>
    </div>
    <div class="keyboard">
      <div class="row">
        <div class="key" v-for="(key, index) in keyboard" :key="index"
             @click="appendKey(key)">
          {{ key }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  data() {
    return {
      searchQuery: '',
      searchHistory: ['喜剧', '飞驰人生2', '热门话题'],
      hotSearches: ['贺岁档', '欢乐', '能出没'],
      keyboard: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        ['ABC', 'space', 'return'],
      ],
    }
  },
  methods: {
    clearSearchHistory() {
      this.searchHistory = [];
    },
    removeItem(index) {
      this.searchHistory.splice(index, 1);
    },
    appendKey(key) {
      if (key === 'space') {
        this.searchQuery += ' ';
      } else if (key === 'return') {
        console.log('Search query:', this.searchQuery);
      } else {
        this.searchQuery += key;
      }
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  background-color: #333333;
}

.search-bar {
  display: flex;
  align-items: center;
  padding: 10px;
}

.search-bar input {
  flex-grow: 1;
  padding: 5px;
  border: none;
  outline: none;
  font-size: 16px;
}

.clear-button {
  margin-left: auto;
  padding: 5px 10px;
  background-color: #4CAF50;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.search-history {
  margin-top: 10px;
  padding: 10px;
}

.search-history h3 {
  margin-bottom: 10px;
}

.search-history ul {
  list-style-type: none;
  padding: 0;
}

.search-history li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.remove {
  margin-right: 10px;
  cursor: pointer;
}

.search-term {
  font-size: 16px;
  color: #4CAF50;
}

.hot-search {
  margin-top: 10px;
  padding: 10px;
}

.hot-search h3 {
  margin-bottom: 10px;
}

.hot-search ul {
  list-style-type: none;
  padding: 0;
}

.hot-search li {
  font-size: 16px;
  color: #4CAF50;
}

.keyboard {
  margin-top: 10px;
  padding: 10px;
}

.keyboard .row {
  display: flex;
  flex-wrap: wrap;
}

.key {
  width: 80px;
  height: 80px;
  background-color: #4CAF50;
  color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
