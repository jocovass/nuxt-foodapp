<template>
  <main class="container">
    <section
      class="image"
      :style="`background: rgba(0,0,0,0) url(/${currentItem.img}) no-repeat scroll center center;`"
    ></section>
    <section class="details">
      <h1>{{ currentItem.item }}</h1>
      <h3>Price: {{ priceFormating(currentItem.price) }}</h3>
      <div class="quantity">
        <input v-model="amount" type="number" min="1" />
        <button class="primary" @click="addToCart">
          Add to Cart - {{ priceFormating(totalPrice) }}
        </button>
      </div>
      <fieldset>
        <legend>
          <h3>Add Ons</h3>
        </legend>
        <div v-for="addon in currentItem.addOns" :key="addon">
          <input
            :id="addon"
            v-model="selectedAddons"
            type="checkbox"
            :name="addon"
            :value="addon"
          />
          <label :for="addon">{{ addon }}</label>
        </div>
      </fieldset>

      <AppToast v-if="submited">
        Order Submitted <br />
        Check out more <nuxt-link to="/restaurants">restaurants</nuxt-link>
      </AppToast>
    </section>
    <section class="options">
      <h3>Description</h3>
      <p>{{ currentItem.description }}</p>
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import AppToast from '@/components/AppToast.vue'

export default {
  components: { AppToast },
  data() {
    return {
      id: this.$route.params.id,
      selectedAddons: [],
      amount: 1,
      submited: false,
    }
  },
  computed: {
    ...mapState(['fooddata']),
    totalPrice() {
      return (this.currentItem.price * this.amount).toFixed(2)
    },
    currentItem() {
      let result

      for (let i = 0; i < this.fooddata.length; i++) {
        for (let y = 0; y < this.fooddata[i].menu.length; y++) {
          if (this.fooddata[i].menu[y].id === this.id) {
            result = this.fooddata[i].menu[y]
          }
        }
      }
      return result
    },
  },
  methods: {
    addToCart() {
      const formOutput = {
        item: this.currentItem.item,
        count: this.amount,
        addons: this.selectedAddons,
        totalPrice: this.totalPrice,
      };

      this.submited = true;

      this.$store.commit('addToCart', formOutput);
    },
    priceFormating(item) {
      return `$${item}`
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1000px;
  margin: 100px auto;
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-template-rows: 400px 1fr;
  grid-column-gap: 60px;
  grid-row-gap: 60px;
  line-height: 2;
}
.iamge {
  grid-area: 1/1/2/2;
  background-size: cover;
}
.details {
  grid-area: 1/2/2/3;
  position: relative;
}
</style>
