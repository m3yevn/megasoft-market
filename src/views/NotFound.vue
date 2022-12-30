<template>
  <div class="not-found-wrapper">
    <p class="status-code">404</p>
    <p class="status-subtitle">Page Not Found</p>
    <p class="status-action">
      Click <router-link to="/">here</router-link> to go back to home page.
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.not-found-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;

  .status-code {
    font-size: 100px;
    color: var(--primary-color);
  }

  .status-subtitle {
    font-size: 32px;
    color: var(--secondary-color);
  }

  .status-action {
    font-size: 16px;
    margin-top: 32px;
  }
}
</style>
