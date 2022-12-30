<template>
  <div>
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  components: { NavBar },
};
</script>

<style lang="scss">
.promotion-banners {
  display: flex;
  padding: 16px;
}

.promotion-banner {
  display: flex;
  flex-direction: column;
  padding: 0px;
  width: 450px;
  box-shadow: unset;

  .promotion-banner-title {
    font-size: 24px;
    color: whitesmoke;
    background: var(--secondary-color);
    min-height: 50px;
    padding: 16px;
    border-radius: 8px 8px 0px 0px;
  }

  .promotion-banner-body {
    font-size: 18px;
    color: var(--secondary-color);
    background: whitesmoke;
    line-height: 24px;
    padding: 16px;
  }

  .promotion-banner-footer {
    font-size: 18px;
    color: var(--secondary-color);
    background: var(--primary-color);
    border-radius: 0px 0px 8px 8px;
    padding: 16px;
    text-decoration: underline;
    cursor: pointer;
  }

  .promotion-banner-footer:hover {
    color: black;
  }
}

.promotion-terms {
  img {
    height: 400px;
    width: inherit;
  }
}
</style>
