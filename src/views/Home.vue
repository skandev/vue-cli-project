<template>
  <div id="app" class="app">
    <section>
      <div class="col-md-4">
          <div class="row">
            <div class="panel panel-default">
              <div class="panel-heading"><h3>Sals</h3></div>
              <div class="panel-body">
                <table class="table table-hover">
                  <thead>
                  <th class="left">Product</th>
                  <th class="right">Qty</th>
                  <th class="right">Cost</th>
                  </thead>
                  <tbody>
                  <SalesLines
                          v-for="item in rowData"
                          :product="item.product"
                          :cost="item.cost"
                          :qty="item.qty"
                          :key="item.product"
                  />
                  </tbody>

                </table>
              </div>
              <div class="panel-footer">
                <h2 class="right">Total : {{ shopping_cart_display }} </h2>
              </div>
          </div>
          <div class="row">
            <Discount
                    @apply-discount="applyDiscountValue"
                    @cancel-discount="cancelDiscount"
            />
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="panel panel-default">
          <div class="panel-heading"><h3>Products</h3></div>
          <div class="panel-body">
            <Caddy
                    v-for="product in products"
                    :product_name="product.product_name"
                    :product_cost="product.product_cost"
                    :key="product.product_name"
                    @send-product-to-caddy="saveToCaddy"
            />
          </div>
        </div>

      </div>
    </section>
    <hr>
    <aside class="shopping-cart">
      <h2>Shopping cart : {{ totalProducts }} products</h2>
    </aside>

    <footer class="footer">
      <p>{{ copyRight }}</p>
    </footer>
  </div>
</template>

<script>
  import Caddy from "../components/Caddy";
  import SalesLines from "../components/SalesLines";
  import Discount from "../components/Discount";
  import {mapState, mapGetters} from 'vuex';
  export default {
    name: "Home",
    components: {
      Caddy,
      SalesLines,
      Discount
    },

    data() {
      return {
        shoppingCart: 0,
        shopping_cart_display: '0.00',
        totalProducts: 0,
        old_shopping_cart:0,
        applied_discount: false,
        rowData:[],
        products: [
          {
            product_name: 'Pizza Napoletana',
            product_cost: 6.00
          },
          {
            product_name: 'Pizza Chiken',
            product_cost: 21.80
          },
          {
            product_name: 'Pizza Pepperoni',
            product_cost: 21.80
          },
          {
            product_name: 'Pizza Orientale',
            product_cost: 19.80
          },
          {
            product_name: 'Multi mix',
            product_cost: 17.80
          },
          {
            product_name: 'Pizza Margherita',
            product_cost: 13.80
          },
          {
            product_name: 'Pizza Samouraï',
            product_cost: 12.79
          },
        ]
      }
    },
    computed: {
      ...mapState({
        resto_name: 'restaurantName'
      }),
      ...mapGetters(['copyRight']),
    },
    methods: {
      findObjectIndex(myArray, value) {
        return myArray.findIndex((obj => obj.product == value));
      },
      updateProductQty(myArray, objIndex) {
        if (!myArray[objIndex].qty) {
          myArray[objIndex].qty = 1;
        }
        myArray[objIndex].qty += 1;
      },
      saveToCaddy(payload) {
        let my_object = {
          product:payload.product,
          cost:payload.cost,
          qty:payload.qty
        };
        const product_index = this.findObjectIndex(this.rowData, payload.product);
        if (product_index >= 0) {
          // product already exist
          this.updateProductQty(this.rowData, product_index)
        } else {
          // first add of a product
          this.rowData.push(my_object)
          console.log(this.rowData)
        }
        this.shoppingCart =  payload.cost + this.shoppingCart
        this.calculateShoppingCartDisplay()
        this.changeCount(1)
      },
      calculateShoppingCartDisplay() {
        this.shopping_cart_display = this.toMoneyFormat(this.shoppingCart)
      },
      toMoneyFormat(number) {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(number);
      },
      increateCount() {
        this.totalProducts += 1;
      },
      decreateCount() {
        this.totalProducts += 1;
      },
      changeCount(amount) {
        if (amount < 0) {
          this.increateCount()
        } else {
          this.decreateCount()
        }
      },
      applyDiscountValue(payload) {
        if (this.old_shopping_cart === 0) {
          this.old_shopping_cart = this.shoppingCart
        }
        this.shoppingCart = this.shoppingCart - ((this.shoppingCart * payload.discount) / 100)
        this.calculateShoppingCartDisplay()
        this.applied_discount = true
        this.$store.commit('ENABLE_CANCEL_DISCOUNT')
      },
      cancelDiscount() {
        if (this.applied_discount) {
          this.shoppingCart = this.old_shopping_cart
          this.calculateShoppingCartDisplay()
          this.$store.commit('ENABLE_CANCEL_DISCOUNT')
        }
      }
    }
  }
</script>

<style lang="scss">
  .description {
    max-width: 960px;
    font-size: 1.2rem;
    margin: 0 auto;
  }
  .footer {
    font-style: italic;
    text-align: center;
  }
  .menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .shopping-cart {
    position: absolute;
    right: 30px;
    top: 0;
  }
  .right {
    text-align: right;
    margin-right: 1em;
  }
  .left {
    text-align: left;
    margin-left: 1em;
  }
</style>
