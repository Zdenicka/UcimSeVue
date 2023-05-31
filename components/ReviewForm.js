app.component('review-form', {
    template:
    /*html*/
    `<form class="review-form" @submit.prevent="onSubmit">
      <h3>Leave a review</h3>
      <label for="name" >Name:</label>
      <!-- v-model propojuje proměnnou do dat a funguje obousměrně-->
      <input id="name" v-model="name">
  
      <label for="review" >Review:</label>      
      <textarea id="review" v-model="review" ></textarea>
  
      <label for="rating">Rating:</label>
      <!-- v-model.number říká, že ta propojená věc je číslo-->
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>

      <label for="recommend">Would you recommend this product?</label>
      <select id="recommend" v-model="recommend">
        <option>yes</option>
        <option>no</option>
        </select>
  
      <input class="button" type="submit" value="Submit">
    </form>`,

    data() {
      return {
        name: '',
        review: '',
        rating: null,
        recommend: null
      }
    },

    methods: {
        onSubmit() {
            if (this.name ==='' || this.review ==='' || this.rating === null || this.recommend === null) {
                alert('Review is incomplete. Please fill up every field.')
                return
            }

            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
                recommend: this.recommend
            }
            //review-submitted posílá ven, productReview je nesená informace
            this.$emit('review-submitted', productReview)
            //tohle po odeslání dat z formuláře formulář vymaže
            this.name= '',
            this.review= '',
            this.rating= null,
            this.recommend= null
        }

    }
  })