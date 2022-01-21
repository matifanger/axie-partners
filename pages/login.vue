<template>
  <div>
    <v-app-bar flat><Navbar-only-logo /></v-app-bar>
    <v-row align="center" justify="center" class="fill-height">
      <v-col xs="11" sm="6" md="4" align="center">
          <h1 class="text-center my-10">Sign in to <span class="gradient">AxiePartners</span></h1>
          <v-alert class="" width="450" border="left" dense text v-if="$store.state.errorMessage != '' "  type="error">{{$store.state.errorMessage}}</v-alert>
       
        <v-card elevation="5" max-width="450px">
          <v-form ref="form" v-model="validForm" lazy-validation>
            <h3 class="mx-5 pt-5 text-left">E-Mail Address</h3>
            <v-text-field dense class="mx-5" style="font-size:1.2em;" v-model="userForm.email" outlined></v-text-field>
            <h3 class="mx-5 text-left">Password</h3>
            <v-text-field type="password" dense style="font-size:1.2em;" v-model="userForm.password" class="mx-5" outlined></v-text-field>
            <v-checkbox
            style="font-weight: bold;"
              class="mx-5 mt-n3"
              v-model="userForm.rememberMeCheckBox"
              label="Remember me"
            ></v-checkbox>
            <v-card-actions class="justify-center">
              <v-btn
                v-on:click="loginUser( userForm )"
                color="#f75679"
                class="white--text"
                width="95%"
                style="font-size: 1.2em;"
                large> Sign in <v-icon>mdi-arrow-right</v-icon></v-btn>
            </v-card-actions>
            <p style="font-size: 14px; color:black;" class="ml-5 mt-1 text-left">
              Forgot your password?
              <NuxtLink to="/password/reset" style="text-decoration:none">Reset it here.</NuxtLink>
            </p>
            <v-divider class="mx-2 my-4" style="opacity:0.5"></v-divider>
            <h2 class="mx-5 text-left">Don't have an account?</h2>
            <p class="mx-5 text-left" style="color: #34495E;" >Either you are a manager or scholar, what are you waiting for?</p>
            <v-card-actions class="justify-center py-5">
              <v-btn to="/register" color="#536eec" width="95%" style="font-size: 1em;" class="white--text justify-space-between">Register now!<v-icon>mdi-arrow-right</v-icon></v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row></div
  >
</template>

<script>
import { mapActions } from 'vuex';
import NavbarOnlyLogo from "~/components/Navbar-only-logo.vue";
export default {
  components: { NavbarOnlyLogo },
  layout: "empty",
  data() {
    return {
      userForm: {email: 'caca@outlook.com', password: 'asd', rememberMeCheckBox: false},
      validForm: false,
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions(['loginUser']),
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100;400&family=Open+Sans:wght@300&display=swap');
</style>