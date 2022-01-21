<template>
  <v-container fill-height fluid class="pa-0 mt-0 fill-height" style="height: 100vh;font-family: 'Open Sans', sans-serif;">
    <v-row align="center" justify="center">
      <v-col cols="12" xs="11" sm="6" md="4">
        <v-card elevation="5" align="center">
          <div class="pa-8">
          <v-icon size="80" color="success" >mdi-email</v-icon>
          <h1 class="text-center my-10">Please verify your email</h1>
          <p>You're almost there! We sent an email to <strong>{{this.$fireModule.auth().currentUser.email}}</strong></p>
          <p>Just click on the link in that email to complete your signup.
            If you don't see it, you may need to <strong>check your spam folder</strong>.
          </p>

          <p>still can't find the email?</p>
          
            <v-card-actions class="justify-center">
              <v-btn
                v-on:click="sendEmailVerification()"
                color="#f75679"
                class="white--text mb-3"
                width="40%"
                style="font-size: 1em; font-weight: bold;"
                large>Resend email<v-icon>mdi-arrow-right</v-icon></v-btn>
            </v-card-actions>
            <p>Need help? Contact Us</p>
            </div>
        </v-card>
      </v-col>
    </v-row>
</v-container>
</template>

<script>
    export default {
      layout: 'navbarStatic',
        data() {
            return {
            }
        },
        watch: {
          check() {
            this.$fireModule.auth().currentUser.emailVerified
        }},
        methods: {
          sendEmailVerification() {
            this.$fireModule.auth().currentUser.sendEmailVerification()
            .then(() => {
              console.log('success')
            });
          }
        }
    }
</script>

<style>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>