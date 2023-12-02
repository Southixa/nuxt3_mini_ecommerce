<template>
    <nav class="sticky top-0 bg-white">
        <div class="max-w-screen-xl min-h-[80px] mx-auto flex sm:justify-between items-center flex-wrap px-4 justify-center p-4 gap-4 sm:gap-0 sm:p-0">
            <div class="w-20 h-20">
                <NuxtLink to="/">
                    <img src="/logo/logo.png" class="w-full h-full object-cover" />
                </NuxtLink>
            </div>
            <div>
                <ul class="flex gap-2 flex-wrap text-gray-700 justify-center sm:justify-start">
                    <li><NuxtLink to="/" class="px-4 py-2 rounded-md font-bold hover:text-blue-700">Login</NuxtLink></li>
                    <li><NuxtLink to="/" class="px-4 py-2 rounded-md font-bold hover:text-blue-700">Register</NuxtLink></li>
                    <li><NuxtLink to="/products/" class="px-4 py-2 rounded-md font-bold hover:text-blue-700">Products</NuxtLink></li>
                    <li><NuxtLink to="/" class="px-4 py-2 rounded-md font-bold hover:text-blue-700">Help</NuxtLink></li>
                </ul>
            </div>
            <div>
                <ul class="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <li>
                        <NuxtLink to="/" class="px-3 py-2 rounded-md">
                            <Icon name="iconamoon:profile" color="" class="text-gray-700 hover:text-blue-700" size="24px"/>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/" class="px-3 py-2 rounded-md hover:text-blue-700">
                            <Icon name="iconamoon:heart" color="" class="text-gray-700 hover:text-blue-700" size="24px" />
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/cart/" class="relative px-3 py-2 rounded-md hover:text-blue-700">
                            <span v-if="cart.length != 0" class="w-4 h-4 bg-red-400 inline-block rounded-full text-white absolute text-[12px] font-light right-[7px] top-[1px] flex justify-center items-center">{{ cart.length }}</span>
                            <Icon name="fluent:cart-24-regular" color="" class="text-gray-700 hover:text-blue-700" size="24px" />
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
</style>

<script setup>

const { cart } = useCart();

</script>