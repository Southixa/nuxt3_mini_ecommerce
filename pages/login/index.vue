<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <section class="w-full max-w-sm mx-auto flex flex-col space-y-2">
      <h1 class="text-xl">Login</h1>
      <n-input v-model:value="frm.email" type="text" placeholder="Email" />
      <n-input
        v-model:value="frm.password"
        @keyup.enter="handleLogin()"
        type="password"
        placeholder="Password"
      />
      <n-button :loading="loading" type="primary" @click="handleLogin()">
        Login
      </n-button>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",
});

const frm = ref({
  email: "example.com",
  password: "",
});

const notification = useNotification();

const loading = ref(false);

const sessionCookie = useCookie('sessionCookie');
const token = useCookie('token');

async function handleLogin() {
  try {
    const config = useRuntimeConfig()
    loading.value = true;
    const req: any = await $fetch(config.public.authApi + '/signin/email-password', {
        method: 'POST',
        body: frm.value
    })

    const { session } = req
    sessionCookie.value = session
    token.value = session.accessToken


    notification.success({
        title: 'Authentication success',
        description: 'You are now Login!',
        duration: 3000
    })

    navigateTo('/')
    loading.value = false;
    console.log(req);
  } catch (error) {
    notification.error({
        title: 'Authentication failed!',
        description: 'Email or password not correct!',
        duration: 3000
    })
    console.log(error);
    loading.value = false;
  }
}
</script>

<style scoped></style>