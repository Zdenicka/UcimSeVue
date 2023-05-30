app.component('product-display', {
    props: {
        premium: {
            type: Boolean, 
            requiered: true
        }
    },

	template: 
	/*html*/
	`<div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <!-- v-bind propojuje přímo s mainem -->
                <img  :class="{'out-of-stock-img': !inStock}" v-bind:src="image">
            </div>
            <div class="product-info">
                <!-- dvojití ptáčci volají pro hodnotu do mainu -->
                <h1>{{ title }}</h1>
                <!-- klasická výroková logika - tady pro zobrazení skladovosti -->
                <p v-if= "inStock > 10" >In Stock</p>
                <p v-else-if="inStock <= 10 && inStock > 0">Almost Sold Out</p>
                <p v-else>Out of Stock</p>

                <p>Shipping: {{shipping}}</p>
                <!-- v-show - viditelnost na základě booleanu -->
                <p v-show="onSale">pokus s viditelností</p>
                <!-- dvojtečka před prováděcím příkazem - zkratka pro v-bind -->
                <a :href="url">Odkaz na hezké barvy</a>
                <!-- key - specifický klíč pro danou položku seznamu-->
                <div class="color-circle"
                    v-for="(variant, index) in variants"
                    :key="variant.id"
                    @mouseover="updateVariant(index)"
                    :style="{ backgroundColor: variant.color }"></div>
                <!-- ptáčkový závorky u :style, protože jde o JS objekt, pak do něj vkládám
                CSS vlastnost "backgroundColor" tu můžu napsat i bez velblouda s pomlčkou,
                ale pak ji musím uzavřít do rovných apostrofů 'background-color'
                variant.color tam pak vloží název základní barvy předdefinový v CSS,
                protože tak ji mám zadanou v datech v mainu ve variants
                můžu mít tu definici style i v objektu v datech v mainu a jen ji volat,
                nebo ji můžu definovat přímo za rovnítkem-->
                <product-details :details = "details"></product-details>
                <ul>
                    <li v-for="(size, index) in sizes" :key="index">{{ size }}</li>
                </ul>
                <!--v-on => pro nějakou akci, click je celkem logicky kliknutí -->
                <!-- na třídy se ještě podívej - hledej Multiple Class Names a Ternary Operators-->
                <button class="button"
                        :class="{disabledButton: !inStock }"
                        v-on:click="addToCart"
                        :disabled="!inStock">
                    Add to Cart
                </button>
                <!-- v-on: můžu zkrátit na @ 
                <button class="button" @click="RemoveFromCart">Remove Item</button>
                -->
            </div>
        </div>
    </div>`,

    data() {
        return {
            product: 'Sock',
            popis: 'Tohle jsou fusky. Dávaj se na nohy. Budou se ti líbit. Hned si je kup',
            selectedVariant: 0,
            url: 'https://www.littlegreenecz.cz/?fbclid=IwAR0Zzf85bMuxO6HuVhedU-7VkSVd0vK6k2jSe62Nfg0I66RcjKwchbu3kPE',
            inventory: 10,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { color: 'green', id: 258, image: './assets/images/socks_green.jpg', quantity: -10 },
                { color: 'blue', id: 2184, image: './assets/images/socks_blue.jpg', quantity: 5},
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            brand: 'Vue Mastery',
            /* jen pro mě - pro visibility*/
            onSale: true
        }
    },

    methods: {
        addToCart() {
            // $emit předává funkcionalitu nadřazenému komponentu - musí být propojené do místa, kde volám onu nadřazenou komponentu
            //do košíku předávám id zboží ze kterého kliknu na přidat do košíku
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        /*
        RemoveFromCart() {
            this.$emit('remove-from-cart')
        },
        */
        updateVariant(index) {
            this.selectedVariant = index
        }
    },

    /* co přesně je computed si musím ještě dohledat, napřed jsem to chápala jen jako spojení, ale zjevně je to složitější.
    překlad znamená vypočítaný */
    computed: {
        /* spojuje dvoje data do jednoho textu - to se bude hodit pak při práci s databází*/
        title() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' is on Sale'
            }
            else{
                return this.brand + ' ' + this.product
            }
        },

        image() {
            return this.variants[this.selectedVariant].image
        },

        /* tak tady musím někde zjistit, na jakym základě to funguje - vrací množství jednotlivých položek, ale nevidím nikde 
        definici toho, kdy inStock je true a kdy false (chtěla jsem napsat, že přelom je nula, ale záporná čísla ukazují true, 
            asi vlastnost JS, na kterou jsem zapomněla - ok, potvrzuju, vlastnost JS - nula je vždy false) */
        inStock() {
            if (this.variants[this.selectedVariant].quantity > 0) {
                return this.variants[this.selectedVariant].quantity
            }
            else
                return 0
        },

        shipping () {
            if (this.premium) {
                return 'Free'
            }
            return 150
        }
    }


})