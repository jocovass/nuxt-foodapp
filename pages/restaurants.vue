<template>
  <main class="container restaurant">
    <header class="restaurantheading">
      <h1>Restaurants</h1>

      <AppSelect @change="selectedRestaurant = $event" />
      <pre>{{ $data }}</pre>
    </header>
    <AppRestaurantInfo :datasource="filteredRestaurants" />
  </main>
</template>

<script>
import { mapState } from 'vuex'
import AppRestaurantInfo from '@/components/AppRestaurantInfo.vue'
import AppSelect from '@/components/AppSelect.vue'

export default {
  components: {
    AppRestaurantInfo,
    AppSelect,
  },
  data() {
    return {
      selectedRestaurant: '',
    }
  },
  computed: {
    ...mapState(['fooddata']),
    filteredRestaurants() {
      if (this.selectedRestaurant) {
        return this.fooddata.filter((el) => {
          const name = el.name.toLowerCase()
          return name.includes(this.selectedRestaurant)
        })
      }
      return this.fooddata
    },
  },
}
</script>

<style lang="scss" scoped></style>
