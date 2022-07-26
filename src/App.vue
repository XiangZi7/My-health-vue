<script setup lang="ts">
import router from './router';

const store = useStore();
onBeforeMount(() => {
  themecolor()
})
onMounted(() => {
  pd()
})
const pd = () => {
  const usertoken = ref(JSON.parse(localStorage.getItem("usertoken")))
  const adintoken = ref(JSON.parse(localStorage.getItem("admintoken")))
  if (usertoken.value != null) {
    router.push("/stuped")
  }
  if (adintoken.value != null) {
    router.push("/")
  }
}

const themecolor = () => {
  document.querySelector("body").setAttribute("style", `background-color:${store.getters.showColor};transition: 0.7s;`);
}
</script>

<template>
  <router-view></router-view>

</template>

<style>
.vue-live2d{
  position: fixed !important;
  right: 0;
  bottom: 0;
}
body {
  background-color: #ecf0f3;
  color: var(--theme-color);
}
</style>
