app.component('review-list',{
    props:{
        reviews:{
            type: Array,
            requiered: true
        }
    },

    template:
        /*html*/
        `
        <div class="review-container">
            <h3>Reviews:</h3>
                <ul>
                    <li v-for="(review, index) in reviews" :key="index">
                    {{review.name}} gave this {{review.rating}} stars
                    <br/>
                    "{{review.review}}"
                    <br/>
                    {{review.name}} would recommend this product: {{review.recommend}}
                    </li>
                </ul>
        </div>
        `



})