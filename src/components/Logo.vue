<template>
  <router-link to="/">
    <span class="logo"
      ><span class="initial">M</span>ega<span class="initial">S</span>oft</span
    >
  </router-link>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.logo {
  padding: 8px;
  color: var(--secondary-color);
  font-weight: bolder;
  font-size: 32px;
  cursor: pointer;
}

.initial {
  color: var(--primary-color);
  font-weight: bold;
  font-size: 33px;
}

a {
  text-decoration: unset;
}
</style>
