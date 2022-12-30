<template>
  <div id="login">
    <div class="alert" type="error" v-if="alert">{{ alert }}</div>
    <p><Logo /></p>
    <div class="card">
      <form @submit.prevent="login()">
        <div>Username</div>
        <input v-model="loginForm.username" />
        <label class="error">{{ error.username }}&nbsp;</label>
        <div>Password</div>
        <input v-model="loginForm.password" type="password" />
        <label class="error">{{ error.password }}&nbsp;</label>
        <div>
          <input
            type="submit"
            :value="loading ? `Signing In...` : `Sign In`"
            :disabled="loading"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";
import loginService from "../services/login-service";

export default {
  components: {
    Logo,
  },
  data: () => ({
    valid: false,
    error: {},
    alert: "",
    loading: false,
    loginForm: {
      username: "",
      password: "",
    },
  }),
  watch: {
    loginForm: {
      deep: true,
      handler(val) {
        this.alert = "";
        this.error = {
          username: !this.loginForm.username ? "*required" : "",
          password: !this.loginForm.password ? "*required" : "",
        };
        this.error = {
          ...this.error,
          username: !val.username ? this.error.username : "",
          password: !val.password ? this.error.password : "",
        };
      },
    },
  },
  methods: {
    async login() {
      if (this.error.username || this.error.password) {
        return;
      }
      this.loading = true;
      const authObj = {
        username: this.loginForm.username,
        password: this.loginForm.password,
      };

      const result = await loginService.login(authObj);
      setTimeout(() => {
        this.loading = false;

        if (result?.isError && result?.status === 400) {
          return (this.error = {
            ...result?.data?.validator,
          });
        }

        if (result?.isError && result?.status === 401) {
          return (this.alert = result?.data?.message);
        }

        if (result?.isLogin) {
          localStorage.setItem("token", result.token);
          this.$router.push("/");
        }
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  text-align: left;
  position: relative;
}

input {
  width: 92%;
}

input[type="submit"] {
  width: 100%;
}
</style>
