<script setup lang='ts'>

function testError() {
        throw new Error('[testError]: test error');
}

</script>




<template>
    <!-- <div class="h-screen flex justify-center pt-[300px] text-[16px] text-gray-400">
        <button @click="testError" >testError</button>
    </div> -->
    <n-button>Default</n-button>
    <n-button type="tertiary">
      Tertiary
    </n-button>
</template>