<template>
  <nav>
    <ul>
      <li>
        <nuxt-link exact to="/">
          <AppLogo />
        </nuxt-link>
      </li>
      <li><nuxt-link exact to="/restaurants">Restaurants</nuxt-link></li>
    </ul>
    <nuxt-link to="/cart">
      <div v-if="cartTotalItem > 0" class="smallnum">{{ cartTotalItem }}</div>
      Cart
    </nuxt-link>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import AppLogo from '@/components/AppLogo.vue'
export default {
  components: {
    AppLogo,
  },
  computed: {
    ...mapGetters(['cartTotalItem']),
  },
}
</script>

<style lang="scss" scoped></style>
