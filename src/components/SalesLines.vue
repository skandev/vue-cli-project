<template>
    <tr :key="product">
        <td class="col-md-7 left">{{ product }}</td>
        <td class="col-md-2 right">{{ qty }} </td>
        <td class="col-md-3 right">{{ cost }} €</td>
    </tr>
</template>
<script>
    export default {
        props: {
            product: {
                type: String,
                required: true
            },
            cost: {
                type: Number,
                required: true
            },
            qty: {
                type: Number,
                default: 1
            }
        }
    }
</script>
