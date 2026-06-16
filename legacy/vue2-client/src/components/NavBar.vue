<template>
  <div class="navbar">
    <Logo />
    <strong>{{ type }}</strong>
    <div class="actions">
      <button @click="logOut">Sign Out</button>
    </div>
  </div>
</template>

<script>
import loginService from "@/services/login-service";
import Logo from "./Logo.vue";
export default {
  components: { Logo },
  props: {
    type: String,
  },
  name: "Navbar",
  methods: {
    logOut: loginService.logout,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 8px 0px;
  position: relative;

  .actions {
    position: absolute;
    right: 12px;
  }
}
</style>
