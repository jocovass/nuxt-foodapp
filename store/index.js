import { v4 as uuidv4 } from 'uuid'

export const state = () => ({
  fooddata: [],
  cart: [],
})

export const getters = {
  cartTotalSum: (state) => {
    if (!state.cart.length) return 0

    return state.cart.reduce((acc, next) => {
      return acc + +next.totalPrice
    }, 0)
  },
  cartTotalItem(state) {
    return state.cart.reduce((acc, next) => +next.count + acc, 0)
  },
}

export const mutations = {
  updateFoodData(state, data) {
    state.fooddata = data
  },

  addToCart(state, formData) {
    formData.id = uuidv4()
    state.cart.push(formData)
  },
}

export const actions = {
  async getFoodData({ state, commit }) {
    if (state.fooddata.length) return
    try {
      await fetch(
        'https://dva9vm8f1h.execute-api.us-east-2.amazonaws.com/production/restaurants',
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.AWS_API_KEY,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          commit('updateFoodData', data)
        })
      // commit('updateValue', )
    } catch (err) {
      console.log(err)
    }
  },
}
