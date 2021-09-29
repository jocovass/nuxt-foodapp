<template>
  <main class="container restaurant">
    <header>
      <h1>Restaurants</h1>
    </header>
    <AppRestaurantInfo />
  </main>
</template>

<script>
import AppRestaurantInfo from '@/components/AppRestaurantInfo.vue'

export default {
  components: {
    AppRestaurantInfo,
  },
}
</script>

<style lang="scss" scoped>
header {
  padding: 20px 200px;
  margin-top: 50px;
}
</style>
