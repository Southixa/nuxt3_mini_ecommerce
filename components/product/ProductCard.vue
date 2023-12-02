<template>
    <div class="w-full lg:w-1/4 md:w-1/2 px-4 py-6">
        <div class="hover:shadow-xl rounded-2xl overflow-hidden">
            <div class="w-full h-[600px] md:h-[300px] rounded-2xl" :class="bgColor">
                <img :src="imgUrl" class="w-full h-full object-cover object-center" alt="product" />
            </div>
            <div class="w-full min-h-[160px] mt-4 p-4">
                <h3 class="font-bold text-xl text-gray-700">{{ name }}</h3>
                <div class="flex my-2 gap-4">
                    <p class="text-red-500 font-medium text-lg">{{ formatNumber(price) }} Kips</p>
                    <p class="text-gray-500 line-through text-lg">{{ formatNumber(fromPrice) }} Kips</p>
                </div>
                <div class="mt-5" v-if="countProductId(productId) == 0">
                    <NuxtLink>
                        <button class="w-full bg-blue-500 rounded-full p-2 text-white font-medium hover:bg-blue-700" @click="addToCart">Buy Now</button>
                    </NuxtLink>
                </div>
                <div class="mt-5 flex justify-between w-full items-center" v-else>
                    <NuxtLink class="w-full">
                        <button class="w-full bg-blue-500 rounded-full p-2 text-white font-medium hover:bg-blue-700 flex justify-center gap-1 items-center" @click="addToCart">
                            <Icon name="ic:round-plus" color="" class="text-white" size="24px"/>
                            Add
                        </button>
                    </NuxtLink>
                    <p class="text-gray-700 font-semibold mx-3">{{ countProductId(productId) }}</p>
                    <NuxtLink class="w-full">
                        <button class="w-full bg-red-500 rounded-full p-2 text-white font-medium hover:bg-red-700 flex justify-center gap-1 items-center" @click="remove">
                            <Icon name="ic:round-minus" color="" class="text-white" size="24px"/>
                            Remove
                        </button>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
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

const emit = defineEmits(["EmitAddToCart", "EmitRemove"])

function addToCart(){
    emit("EmitAddToCart", prop)
}

function remove() {
    emit("EmitRemove", prop)
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