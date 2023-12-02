<template>
    <div>
        <AppHero />

        <div class="w-full mt-4">
            <div class="max-w-screen-xl mx-auto flex flex-wrap">

                <ProductCard v-for="(item, index) in productsData"
                    :key="index"
                    :productId="item.productId"
                    :bgColor="item.bgColor"
                    :imgUrl="item.imgUrl"
                    :name="item.name"
                    :price="item.price"
                    :fromPrice="item.fromPrice"
                    @EmitAddToCart="addToCart"
                    @EmitRemove="remove"
                />

            </div>

            
        </div>

    </div>
</template>

<script setup>

const { cart } = useCart();

const orderList = ref([]);

const productsData = [
    {productId: "p01", bgColor: "bg-green-300", imgUrl: "/products/shoes_1.png", name: "Nike air", price: 900000, fromPrice: 980000},
    {productId: "p02", bgColor: "bg-yellow-300", imgUrl: "/products/shoes_1.png", name: "Nike Air Force 1", price: 899000, fromPrice: 900000},
    {productId: "p03", bgColor: "bg-red-300", imgUrl: "/products/shoes_1.png", name: "Nike Air Max", price: 799000, fromPrice: 1000000},
    {productId: "p04", bgColor: "bg-purple-300", imgUrl: "/products/shoes_1.png", name: "Nike Cortez", price: 1200000, fromPrice: 1400000},
    {productId: "p05", bgColor: "bg-orange-300", imgUrl: "/products/shoes_1.png", name: "Air Jordan", price: 900000, fromPrice: 980000},
]


function addToCart(item) {
    cart.value.push(item)
}

function remove(item) {
    const cartIndex = cart.value.findIndex(element => element.productId == item.productId)
    if(cartIndex != undefined){
        cart.value = cart.value.filter((element, index) => index != cartIndex)
    }
}

</script>
