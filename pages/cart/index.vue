<template>
    <div class="max-w-screen-xl mx-auto mt-8 mb-16">
        <div class="flex flex-wrap justify-center lg:justify-between">
            <div class="grow p-8">
                <h3 class="text-3xl font-bold text-gray-700 mb-8 mt-6">Shopping Cart</h3>
                <div class="w-full min-h-[100px]" v-if="cart.length > 0" >
                    <table class="w-full text-gray-700">
                        <tr class="border border-b-gray-200 border-t-white border-r-white border-l-white font-bold">
                            <td class="py-4">Product</td>
                            <td class="sm:table-cell hidden">Price</td>
                            <td class="sm:table-cell hidden">Quantity</td>
                            <td>Total Price</td>
                            <td></td>
                        </tr>

                        
                        <template v-for="item in uniqueProduct" :key="item.index">
                            <CartProductRow
                                :productId="item.productId"
                                :bgColor="item.bgColor"
                                :imgUrl="item.imgUrl"
                                :name="item.name"
                                :price="item.price"
                                :fromPrice="item.fromPrice"
                                @EmitAddToCart="addToCart"
                                @EmitRemove="remove"
                                @EmitRemoveAll="removeAll"
                            />
                        </template>
                        
                    </table>

                    <hr class="mb-8">
                </div>


                <div v-else class="w-full min-h-[200px] flex justify-center flex-col items-center">
                    <img src="/noti/empty_box.png" class="w-24 h-24 object-cover object-center">
                    <p class="text-gray-400">No Product Selected</p>
                </div>

            </div>
            <div class="w-[450px] h-[600px] flex lg:justify-end justify-center mt-8">
                <div class="w-10/12 h-full bg-gray-50 rounded-lg p-8 flex flex-col justify-between">
                    <div>
                        <h3 class="text-3xl font-bold text-gray-700 mb-8">Payment Info</h3>
                        <hr>
                        <div class="w-full flex justify-between my-6 text-[15px] text-gray-500">
                            <p>Total:</p>
                            <p>{{ formatNumber(totalPrice()) }}</p>
                        </div>
                        <div class="w-full flex justify-between my-6 text-[15px] text-gray-500">
                            <p>Tax 0:</p>
                            <p>0</p>
                        </div>
                        <div class="w-full flex justify-between my-6 text-[15px] text-gray-500">
                            <p>discount 0%:</p>
                            <p>0</p>
                        </div>
                        <hr>
                        <div class="w-full flex justify-between my-4 items-center">
                            <p class=" text-[15px] text-gray-700 font-semibold">Total:</p>
                            <p class=" text-[24px] text-gray-700 font-bold">{{ formatNumber(totalPrice()) }} <span class="text-gray-700 font-light">Kips</span></p>
                        </div>
                    </div>


                    <NuxtLink>
                        <button class="w-full bg-blue-500 rounded-full p-2 text-white font-medium hover:bg-blue-700 disabled:bg-gray-300" :disabled="cart.length == 0">Check Out</button>
                    </NuxtLink>


                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const { cart } = useCart();

let uniqueProduct = getUniqueProduct();

function getUniqueProduct () {
    let uniqueId = [];
    let product = []
    for(let i = 0; i < cart.value.length; i++){
        if(uniqueId.includes(cart.value[i].productId)){

        } else {
            uniqueId.push(cart.value[i].productId)
            product.push(cart.value[i])
        }
    }
    return product
}

function addToCart(item) {
    cart.value.push(item)
}

function remove(item) {
    const cartIndex = cart.value.findIndex(element => element.productId == item.productId)
    if(cartIndex != undefined){
        cart.value = cart.value.filter((element, index) => index != cartIndex)
    }
}

function removeAll(item){
    cart.value = cart.value.filter((element) =>  element.productId != item.productId);
}

function totalPrice(){
    return cart.value.reduce((total, current) => total + current.price, 0)
}

function formatNumber(number) {
    return (number + "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}



</script>