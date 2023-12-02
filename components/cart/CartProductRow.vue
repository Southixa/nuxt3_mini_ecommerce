<template>
    <tr v-bind:class="(countProductId(productId) == 0) ? 'opacity-25' : 'opacity-100'">
        <td class="flex lg:flex-row lg:items-center flex-col lg:gap-6 gap-2 py-5">
            <div class="w-[80px] h-[80px] rounded-2xl" :class="bgColor">
                <img :src="imgUrl" class="w-full h-full object-cover object-center" alt="product" />
            </div>
            <div>
                <h4 class="font-medium">{{ name }}</h4>
            </div>
        </td>
        <td class="sm:table-cell hidden">{{ formatNumber(price) }}</td>
        <td class="flex sm:table-cell">
            <button class="bg-gray-200 px-1 rounded" @click="remove"><Icon name="ic:round-minus" color="" class="text-gray-700" size="16px"/></button>
            <span class="w-8 h-8 inline-block text-center">{{ countProductId(productId) }}</span>
            <button class="bg-gray-200 px-1 rounded" @click="addToCart"><Icon name="ic:round-plus" color="" class="text-gray-700" size="16px"/></button>
        </td>
        <td>{{ formatNumber(countProductId(productId) * price) }} <span class="font-medium">Kips</span></td>
        <td>
            <button class="px-1 py-1 rounded hover:bg-gray-50" @click="removeAll" ><Icon name="ph:x-bold" color="" class="text-gray-400" size="24px"/></button>
        </td>
    </tr>
</template>


<script setup lang="ts">

const { cart } = useCart();

const prop = defineProps({
    productId: String,
    bgColor: String,
    imgUrl: String,
    name: String,
    price: Number,
    fromPrice: Number
})

const emit = defineEmits(["EmitAddToCart", "EmitRemove", "EmitRemoveAll"])

function addToCart(){
    emit("EmitAddToCart", prop)
}

function remove() {
    emit("EmitRemove", prop)
}

function removeAll() {
    emit("EmitRemoveAll", prop)
}

function formatNumber(number: number) {
    return (number + "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

function countProductId(productId: String) {
    const count = cart.value.filter(element => element['productId'] == productId);
    if(count == undefined){
        return 0;
    } else {
        return count.length;
    }
}

</script>