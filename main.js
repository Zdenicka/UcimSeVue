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
        },
        
        removeItem(id) {
            let index = this.cart.indexOf(id);
            if (index != -1 ) 
                this.cart.splice(index, 1)
        }

    },

})
