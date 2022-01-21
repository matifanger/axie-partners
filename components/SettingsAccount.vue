<template>
    <v-card class="pa-5" v-if="this.$store.state.userDB" outlined>

    <h3 class="title">Account</h3>
    <span class="subtitle">See and change sensitive content.</span>

    <v-card outlined class="pa-3 my-5">

        <h4 class="mb-4 title">Manage Password</h4>
        <div class="ma-5">
        <span>Current Password</span>
        <v-text-field class="mb-n4" type="password" width="100%" outlined dense></v-text-field>
        <span>New Password</span>
        <v-text-field class="mb-n4" type="password" width="100%" outlined dense></v-text-field>
        <span>Repeat New Password</span>
        <v-text-field class="mb-n4" type="password" width="100%" outlined dense></v-text-field>
        </div>


        <v-divider class="mb-4" />


        <h4 class="mb-4 title">Manage Email</h4>
        <div class="ma-5">
        <span>Current Email</span>
        <v-text-field class="mb-n4" disabled v-model="this.$store.state.userDB.email" width="100%" outlined dense></v-text-field>
        <span>New Email</span>
        <v-text-field class="mb-n4" width="100%" outlined dense></v-text-field>
        <span>Repeat New Email</span>
        <v-text-field class="mb-n4" width="100%" outlined dense></v-text-field>
        </div>







    </v-card>
            
            
    </v-card>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        mounted() {
            
            const user = this.$fireModule.auth().currentUser;

            console.log(user)


            console.log(this.$fireModule.auth())
        },
    }
</script>

<style lang="scss" scoped>

</style>