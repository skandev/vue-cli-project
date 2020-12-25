<template>
    <div class="col-md-3">
        <button type="button" class="btn btn-default btn-lg btn-block" @click="sendToCaddy">
            <b>{{ product_name }}</b> <br> {{ product_cost }} €
        </button>
    </div>
</template>

<script>
    export default {
        name: 'Caddy',
        props: {
            product_name: {
                type: String,
                Default: 'Product ##',
                required: true
            },
            product_cost: {
                type: Number
            },
            qty: {
                default: 1
            }
        },
        methods: {
            sendToCaddy() {
                this.$emit('send-product-to-caddy', {
                    product: this.product_name,
                    cost: this.product_cost
                })
            }
        }
    }
</script>
