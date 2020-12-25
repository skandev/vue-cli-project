<template>
    <div>
        <form class="form-inline right">
            <div class="form-group">
                <div class="row">
                    <div class="col-md-12">
                        <label for="exampleInputName2"> Discount % </label>
                        <input type="number" name="discount" id="discount" class="form-control input-lg" v-model="discount">
                    </div>
                </div>
                <div class="row">
                    <hr>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <button type="button" class="btn btn-primary btn-lg btn-block" @click="applyDiscount"> Apply </button>
                    </div>

                    <div class="col-md-6">
                        <div v-if="cancelDiscountDisable === 'disabled'">
                            <button type="button" class="btn btn-danger btn-lg btn-block" @click="cancelDiscount" disabled >
                                Cancel
                            </button>
                        </div>
                        <div v-else>
                            <button type="button" class="btn btn-danger btn-lg btn-block" @click="cancelDiscount" >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
        name: 'Discount',
        data() {
          return {
              discount : 0
          }
        },
        methods: {
            applyDiscount() {
                this.$emit('apply-discount', {
                    discount: this.discount
                })
            },
            cancelDiscount() {
                this.$emit('cancel-discount')
            }
        },
        computed: {
            ...mapState({
                cancelDiscountDisable: 'cancelDiscountDisable'
            })
        }
    }
</script>
