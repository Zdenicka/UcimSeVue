const app = Vue.createApp({
    data() {
        return {
            //košík je tady definovaný jako pole
            cart: [],
            premium: true
        }
    },


    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
        /*
        remoFromCart() {
            if (this.cart > 0) 
                this.cart -= 1
        }
        */

    },

})
