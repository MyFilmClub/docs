<template>
  <div class="star-rating">
    <span v-for="i in maxRating" :key="i">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path :fill="i <= rating ? '#ffd700' : '#ebebeb'" d="M12 .5l-6.92 11.84h-.84v4.66h4.16l-1.08 6.48h-3.08v4.66h4.84l6.92-11.84h.84v-4.66h-4.16l1.08-6.48h3.08v-4.66h-4.84z"/>
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    maxRating: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.star-rating svg {
  fill: #ebebeb;
  cursor: pointer;
}

.star-rating svg:hover,
.star-rating svg:focus {
  fill: #ffd700;
}
</style>
