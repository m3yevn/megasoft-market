<template>
  <div>
    <NavBar type="ADMIN" />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  components: { NavBar },
};
</script>

<style lang="scss"></style>
