<template>
    <div style="margin-top:8em">
    <h1 class="text-center" style="margin-bottom:1em">What you would like to do?</h1>
    <v-row justify="center" align="center" class="mx-1">
    <v-col  sm="5" md="3">

<v-hover v-slot="{ hover }">
<v-card outlined min-height="500" dark class="d-flex flex-column mx-auto mt-4 scholarshipApplicationGradient text-center" :elevation="`${hover ? '8' : '0'}`">
          <div style="margin: 2.5%" class="py-5">
            <div class="justify-space-between align-center">
            <div class="justify-center onFireGif title">SCHOLARSHIP APPLICATION</div>
            <div class="mt-5 body-1 text-left pl-5">
            <p>
            · Create a new scholarship application
            </p>
            <p>
            · Filter users as your needs
            </p>
            <p>
            · Chat with the candidates
            </p>
            <p>
            · Up to 1000 users
            </p>
            <p>
            · Show a badge in your profile
            </p>
            </div>
            </div>
            </div>
            <v-spacer></v-spacer>
            <v-divider class="mt-6 mb-7"></v-divider>
            <v-card-actions class="justify-center">
            <v-btn class="mb-5" to="/post/scholarship-application" color="success" elevation="15">CREATE NOW!</v-btn>
            </v-card-actions>
</v-card>
</v-hover>

</v-col>

<v-col  sm="5" md="3" class="flex">

<v-hover v-slot="{ hover }">
<v-card outlined min-height="500" dark class="d-flex flex-column mx-auto mt-4 scholarshipGiveawayGradient text-center" :elevation="`${hover ? '8' : '0'}`">
          <div style="margin: 2.5%" class="py-5">
            <div class="justify-space-between align-center">
              <div class="justify-center onFireGif title">SCHOLARSHIP APPLICATION</div>
              <div class="mt-5 body-1 text-left pl-5">
            <p>
            · Create a new scholarship giveaway
            </p>
            <p>
            · Setup a timer
            </p>
            <p>
            · Automatically pick a random user
            </p>
            <p>
            · Up to 2000 users
            </p>
            <p>
            · Show a badge in your profile
            </p>
            </div>

            </div>
          </div>
          <v-spacer></v-spacer>
            <v-divider class="mt-6 mb-7"></v-divider>
            <v-card-actions class="justify-center">
              <v-btn class="mb-5" to="/post/scholarship-giveaway" color="success" elevation="15">CREATE NOW!</v-btn>
            </v-card-actions>
</v-card>
</v-hover>



    </v-col>


    </v-row>




    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            createScholarship(data) {
                if (data == 'scholarship') {
                    return true
                }
                else if (data == 'giveaway') {

                }
            },
        }
    }
</script>

<style lang="scss" scoped>
.scholarshipApplicationGradient {
  background: linear-gradient(to right, #8e2de2, #4a00e0);
}

.scholarshipGiveawayGradient {
  background: linear-gradient(to right, #f12711, #f5af19);
}


.onFireGif {
  /* Color & Background */
  background-image: url("https://cdn.raidforums.com/s/csc.gif");
  background-position: 50% 50%;
  background-repeat: repeat;
}
</style>