app.component('product-details', {

    props: {
        details: {
            type: Array,
            requiered: true
        }
    },

    template: 
	/*html*/
        `<div class="product-info">
            <!-- v-for => jako foreach pro list -->
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
        </div>`
        ,
})