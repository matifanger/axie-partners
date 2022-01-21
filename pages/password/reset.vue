<template>
  <v-div class="pa-0 ma-0" style="height: 100vh">
    <v-app-bar flat><Navbar-only-logo /></v-app-bar>
    <v-row align="center" justify="center" class="fill-height">
      <v-col xs="11" sm="6" md="4" align="center">
          <h1 class="text-center my-10">Reset password</h1>
        <v-card elevation="5" max-width="450px">
          <h3 class="mx-5 pt-5 text-left">E-Mail Address</h3>
          <v-form v-on:submit.prevent="sendPasswordResetEmail(email)">
            <v-text-field placeholder="your@email.com" dense class="mx-5" style="font-size:1.2em;" v-model="email" outlined></v-text-field>
            <v-card-actions class="justify-center">
              <v-btn
                v-on:click="sendPasswordResetEmail(email)"
                color="#f75679"
                class="white--text mb-3"
                width="95%"
                style="font-size: 1em; font-weight: bold;"
                large> Send reset link <v-icon>mdi-arrow-right</v-icon></v-btn>
            </v-card-actions>
            </v-form>
            <div class="pb-2">
            <v-alert width="90%" border="left" dense text v-if="success"  type="success">{{success}}</v-alert>
            <v-alert width="90%" border="left" dense text v-else-if="error.message"  type="error">{{error.message}}</v-alert>
            </div>
        </v-card>
      </v-col>
    </v-row>
</v-div>
</template>

<script>
    export default {
  layout: "empty",
        data() {
            return {
              email: '',
              success: '',
              error: {code: '', message: ''}
            }
        },
        methods: {
          sendPasswordResetEmail(email) {
            this.$fireModule.auth().sendPasswordResetEmail(email)
              .then(() => {
                // Password reset email sent!
                // ..
                this.success = 'The email was sended succesfully.';
                this.error.code = '';
                this.error.message = '';
              })
              .catch((error) => {
                this.success = '',
                this.error.code = error.code;
                this.error.message = error.message;
                // ..
              });
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>