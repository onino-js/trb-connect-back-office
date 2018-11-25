<template>
  <div class="container">
    <el-card class="card">
    <img alt="Vue logo" src="./../assets/logo.png">
    <el-form :model="cred" :rules="rules" class="login-form" ref="cred" label-position="top">
      <el-form-item label="Adresse mail:" prop="email" label-width="300px">
      <el-input class="login-input" type="email" v-model="cred.email"  clearable/>
      </el-form-item>
       <el-form-item label="Mot de passe:" prop="password" label-width="300px">
      <el-input class="login-input" type="password" v-model="cred.password" clearable/>
       </el-form-item>
      <el-button type="primary" cless="login-button" @click="submitForm('cred')">LOGIN</el-button>
    </el-form>
    </el-card>
  </div>
</template>

<script>
import { loginRules } from "./../services/rules.service";

export default {
  name: "Login",
  data() {
    return {
      rules: loginRules,
      cred: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    email: {
      get() {
        return this.$store.state.login.email;
      },
      set(newValue) {
        this.$store.state.login.email = newValue;
      },
    },
    password: {
      get() {
        return this.$store.state.login.password;
      },
      set(newValue) {
        this.$store.state.login.password = newValue;
      },
    },
  },
  methods: {
    submitForm(formName) {
      const callback = msg => this.$message(msg);
      this.$refs[formName].validate(valid => {
        const callback = msg => this.$message(msg);
        if (valid) {
          this.$store.dispatch("loginRequest", {
            callback: callback,
            cred: this.cred,
          });
          console.log("vamid!!");
        } else {
          callback({
            type: "error",
            message: "Mauvaises entrées",
          });
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card {
  width: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
img {
  width: 200px;
  margin-bottom: 50px;
  margin-top: 30px;
  /* border: 1px solid blue; */
}
.login-form {
  width: 300px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  /* border: 1px solid red; */
}
.login-input {
  width: 300px;
}
</style>
