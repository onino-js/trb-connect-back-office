<template>
<el-dialog
  title="Nouvel l'utilisateur"
  :visible.sync="displayCreateUser"
  :before-close="handleClose"
  width="500px"
  >
<div class="user-form-container">
  <el-form :model="user" :rules="rules" ref="user" class="user-form" label-width="150px">
    <el-form-item prop="lastName"  class="user-form-item" label="Nom de famille:">
      <el-input 
      class="user-input"
      v-model="user.lastName"></el-input>
    </el-form-item>
    <el-form-item prop="firstName"  class="user-form-item" label="Prénom:">
      <el-input 
      class="user-input"
      v-model="user.firstName"></el-input>
    </el-form-item>
    <el-form-item prop="email"  class="user-form-item" label="email:">
      <el-input 
      class="user-input"
      v-model="user.email"></el-input>
    </el-form-item>
    <el-form-item prop="password"  class="user-form-item" label="Mot de passe:">
      <el-input type="password"  v-model="user.password" class="user-input"> </el-input>
    </el-form-item>
      <el-button type="primary" v-on:click="handleClose()">ANNULER</el-button>
      <el-button type="primary" @click="submitForm('user')">ENREGISTRER</el-button>
      <el-button type="primary" @click="resetForm('user')">RAFRAICHIR</el-button>
  </el-form>
  <div>
  </div>
</div>
</el-dialog>
</template>

<script>
import { userRules } from "./../../services/rules.service";
const CreateUser = {
  name: "CreateUser",
  props: {
    show: Boolean,
  },
  data: function() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        sites: [],
      },
      rules: userRules,
    };
  },
  methods: {
    handleClose() {
      this.$store.commit("setDisplayCreateUser", false);
      this.$message({
        type: "info",
        message: "Opération annulée",
      });
    },
    submitForm(formName) {
      const callback = msg => this.$message(msg);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("createUser", {
            user: this.user,
            callback: callback,
          });
          this.$store.commit("setDisplayCreateUser", false);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    createUser() {},
  },
  computed: {
    displayCreateUser: {
      get() {
        return this.$store.state.ui.displayCreateUser;
      },
    },
  },
};
export default CreateUser;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-dialog {
  width: 500px;
}
.user-form-container {
  margin: auto;
  /* border: 1px solid green; */
}
.user-form {
  /* border: 1px solid red; */
  width: 500px;
  margin: auto;
}
.user-form-item {
  max-width: 400px;
}
</style>
