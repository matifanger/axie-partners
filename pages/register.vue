<template>
<div>
    <v-app-bar flat><Navbar-only-logo /></v-app-bar>
    <v-row align="center" justify="center" class="fill-height">
        <v-col cols="12" align="center">
          <h1 class="text-center mt-10 mb-3">Register to <span class="gradient">AxiePartners</span></h1>
          <h3 class="text-center" style="color:#34495E;">Be a scholar or be a manager, we will connect one to each other</h3>
          <v-alert class="mt-4 mb-n3" width="450" border="left" dense text v-if="$store.state.errorMessage != '' "  type="error">{{$store.state.errorMessage}}</v-alert>
        </v-col>
      <v-col xs="11" sm="6" md="4" align="center">
        <v-card elevation="5" max-width="450px">
          <v-form ref="form" v-model="validForm" lazy-validation>
            <h3 class="mx-5 pt-5 text-left">Name</h3>
            <v-text-field required  :rules="rules.name" placeholder="Eg. Mark Doe" dense class="mx-5" style="font-size:1.2em;" v-model="userForm.name" outlined></v-text-field>
            <h3 class="mx-5 text-left">E-Mail Address</h3>
            <v-text-field required  :rules="rules.email" placeholder="your@email.com" dense class="mx-5" style="font-size:1.2em;" v-model="userForm.email" outlined></v-text-field>
            <h3 class="mx-5 text-left">Password</h3>
            <v-text-field required  :rules="rules.password" placeholder="Especify a password" type="password" dense style="font-size:1.2em;" v-model="userForm.password" class="mx-5" outlined></v-text-field>
            <h3 class="mx-5 text-left">Confirm Password</h3>
            <v-text-field required  :rules="rules.passwordConfirm" placeholder="Confirm your password" type="password" dense style="font-size:1.2em;" v-model="userForm.passwordConfirm" class="mx-5" outlined></v-text-field>
            <v-checkbox required 
            :rules="rules.termOfUse"
              class="mx-5 mt-n3"
              v-model="userForm.termOfUse">
      <template v-slot:label>
        <div>
          I agree with the
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a style="text-decoration: none"
                target="_blank"
                href="/terms-of-use"
                @click.stop
                v-on="on"
              >
                Terms of use.
              </a>
            </template>
            Opens in new window
          </v-tooltip>
        </div>
      </template>
            </v-checkbox>
            <v-checkbox
              class="mx-5 mt-n3"
              v-model="userForm.weeklyAlerts"
              label="Send me weekly scholarships alerts and other AxiePartners related emails."
            >
            </v-checkbox>
            <recaptcha />
            <v-card-actions class="justify-center">
              <v-btn
                :disabled='!deactivate'
                v-on:click="registerUser( userForm )"
                color="#f75679"
                class="white--text mb-5"
                width="95%"
                style="font-size: 1.4em; font-weight: 300"
                large>Let's start <v-icon>mdi-arrow-right</v-icon></v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import NavbarOnlyLogo from "~/components/Navbar-only-logo.vue";
export default {
  components: { NavbarOnlyLogo },
  layout: "empty",
  data() {
    return {
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        userForm: { name: '', email: '', password: '', passwordConfirm: '', termOfUse: false, weeklyAlerts: false },
        validForm: false,
        rules: {  name: [v => (v.length >= 1) || 'Your name is required.'],
        email: [v => (this.reg.test(v)) || 'Your email must be valid.'],
        password: [v => (v.length >= 8) || 'Your password must have 8 caracters or more.'],
        passwordConfirm: [v => (v == this.userForm.password) || 'Your passwords not match.'],
        termOfUse: [v => (v == true) || ''],
        },
        
        errorMessage: "",
    };
  },
    computed: {
    deactivate() {
      return this.userForm.name.length >= 1 && this.reg.test(this.userForm.email) && 
      this.userForm.password.length >= 8 &&
       this.userForm.password == this.userForm.passwordConfirm &&
       this.userForm.termOfUse == true
    }
    },
  methods: { 
    ...mapActions(['registerUser']),
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100;400&family=Open+Sans:wght@300&display=swap');
</style>