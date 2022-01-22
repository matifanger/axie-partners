<template>
  <v-container
    fill-height
    fluid
    class="pa-0 mt-0"
    v-if="userProfileFound"
  >
    <v-row justify="center" class="mt-16 pt-10">
      <!-- Main profile -->
      <v-col cols="11" xs="12" sm="7" md="5">
        <v-card class="mx-auto" outlined tile>
          <v-img
            height="200"
            :src="data.profile.banner"
            alt="Banner"
          ></v-img>
          <v-row>
            <v-list-item style="margin: 2.5%; position: absolute; top: 4em">
              <v-list-item-avatar size="170">
                <v-img aspect-ratio="16/9" position="center 10%"
                  :src="data.profile.photo"
                  alt="Profile"
                />
              </v-list-item-avatar>
            </v-list-item>
            <v-card
              width="100%"
              color="transparent"
              class="d-flex justify-space-between"
              style="margin: 2.5%; margin-top: 5em"
              flat
            >
              <v-list-item class="mt-n1">
                <v-list-item-content>
                  <v-list-item-title class="title" 
                    >{{data.user.name}} {{data.user.lastname}}
                    </v-list-item-title>
                  <v-list-item-subtitle
                    >{{data.profile.headline}}</v-list-item-subtitle
                  >
                                    <v-list-item-subtitle
                    ><strong>{{data.profile.followers.ammount}}</strong>  followers</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="mt-n1" align="end">
                <v-list-item-content>
                  <v-list-item-title class="title">
                    <v-btn rounded elevation="0" color="primary"><v-icon>mdi-plus</v-icon>&nbsp; Follow </v-btn>
                    <v-btn rounded elevation="0" color="accent"><v-icon>mdi-chat</v-icon>&nbsp; Chat </v-btn>
                    </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-row>
        </v-card>

        <!-- START SCHOLARSHIP CARD -->
        <v-card v-if="data.profile.scholarship.applications" dark class="mx-auto mt-4 scholarshipApplicationGradient">
          <div style="margin: 2.5%" class="py-5">
            <div class="d-flex justify-space-between align-center">
              <div class="justify-center onFireGif title">SCHOLARSHIP OPEN</div>
              <v-btn color="success" elevation="15">APPLY NOW!</v-btn>
            </div>
             <p class="mt-3 body-1 mb-n1">
              This user has started a new scholarship application
            </p>
          </div>
        </v-card>
        <!-- END SCHOLARSHIP CARD -->

        <!-- START GIVEAWAY SCHOLARSHIP CARD -->
        <v-card v-if="data.profile.scholarship.giveaways" dark class="mx-auto mt-4 scholarshipGiveawayGradient">
          <div style="margin: 2.5%" class="py-5">
            <div class="d-flex justify-space-between align-center">
              <div class="justify-center title onFireGif">SCHOLARSHIP GIVEAWAY</div>
              <v-btn color="success" elevation="15">CHECK IN</v-btn>
            </div>
             <p class="mt-3 body-1 mb-n1">
              This user has started a new scholarship giveaway <br/>
              The winner will be randomly selected
            </p>
          </div>
        </v-card>
        <!-- END GIVEAWAY SCHOLARSHIP CARD -->

        <!-- START ABOUT ME  -->
        <v-card class="mx-auto mt-4" outlined tile>
          <div style="margin: 2.5%">
            <p class="title">About me</p>
            <p class="overline mt-n5" v-if="data.user">
              {{ data.user.age ? '| ' + (new Date().getYear() - new Date(data.user.age).getYear()) + ' years | ' : '' }} 
              {{ data.user.gender ? data.user.gender + ' | ' : '' }} 
              {{ data.user.civil ? data.user.civil + ' | ' : '' }} 
              {{ data.user.country ? data.user.country + ' | ' : '' }} 

              <v-template v-if="data.user.languages">
              <span v-for="(item,index) in data.user.languages" :key="index"> {{item + ' | '}} </span> 
              </v-template>
              {{ data.user.occupation ? data.user.occupation + ' | ' : '' }} 
            </p>
            <v-divider class="mb-4 mt-n5"></v-divider>
            <p>
              {{data.profile.aboutme}}
            </p>
          </div>
        </v-card>
        <!-- END ABOUT ME -->

        <!-- | START COMMENTS | -->
        <v-card class="mx-auto mt-4" outlined tile>
          <!-- START COMMENTS HEADER -->
          <v-card width="100%" flat color="#fafafa">
            <p class="title" style="padding: 2.5% 2.5% 0 2.5%">Comments ({{data.profile.comments.ammount}})</p>
            <v-divider></v-divider>
          </v-card>
          <!-- END COMMENTS HEADER -->
          <!-- START TYPE A COMMENT SECTION -->
          <v-card flat style="padding: 2.5% 2.5% 0 2.5%">
            <div class="d-flex">
              <v-avatar size="2.7em" class="mr-2" v-if="this.$store.state.userDB">
                <img
                  alt="Avatar"
                  :src="this.$store.state.userDB.profile.photo"
                />
              </v-avatar>
              <v-textarea
                :rules="[
                  (v) =>
                    (v || '').length <= 300 ||
                    'Description must be 300 characters or less',
                ]"
                rows="5"
                row-height="15"
                name="input-7-1"
                filled
                outlined
                v-model="message.text"
                placeholder="Type a comment"
                :messages="messageTextMaxLength"
                auto-grow
              ></v-textarea>
            </div>
            <div align="end" class="mb-5 mt-n4">
              <v-btn elevation="0" color="info" v-on:click="sendMessage">Comment</v-btn>
            </div>
          </v-card>
          <!-- END TYPE A COMMENT SECTION -->

          <v-divider></v-divider>

          <!-- START COMMENTS SECTION -->

          <v-card v-for="(comment,key) in data.profile.comments.data" :key="key" flat style="padding: 2.5% 2.5% 0 2.5%">
            <div class="d-flex">
              <div>
                <v-avatar size="2.7em" class="mr-2">
                  <v-img alt="Avatar" :src="comments[key]" />
                </v-avatar>
              </div>

              <div class="ml-n4 mt-n4">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6">
                      {{comment.name}} <span>{{comment.date}}</span>
                    </v-list-item-title>
                    <p>
                      {{comment.text}} 
                    </p>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </div>
            <!-- APLICAR V-IF PARA SABER SI EL ELEMENTO ES EL ULTIMO Y VER SI MOSTRAR O NO EL DIVIDER -->

            <v-divider class="pb-5" v-if="!data.profile.comments.data"></v-divider>

            <v-card v-if="!data.profile.comments.data" flat class="mb-5 text-center align-center">
              <v-icon large>mdi-message</v-icon>
             <v-card-title class="justify-center">No Comments Yet</v-card-title>
             <v-card-subtitle>Be the first to share what you think!</v-card-subtitle>
              </v-card>
              
          </v-card>
          <!-- END COMMENTS SECTION -->
        </v-card>
        <!-- | END COMMENTS | -->
      </v-col>

      <!-- START LATERAL NAVBAR -->
      <!-- <v-col cols="11" xs="4" sm="3" md="2">
        <v-card class="stickySidebar" ></v-card>
      </v-col> -->
      <!-- END LATERAL NAVBAR -->
    </v-row>

    <Footer />
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  // layout: "navbarStatic",
  data() {
    return {
      message: {text: '', date: '' },
      userProfileFound: null,
      errorFound: '',
      data: '',
      comments: [],
    };
  },
  computed: {
    messageTextMaxLength() {
      return this.message.text.length.toString();
    },

  },
  methods: {
      getCommentUserPhoto() {
      this.data.profile.comments.data.forEach((value) => {

      this.$fire.firestore.collection("users").where("userid", "==", value.userid)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
             console.log('User profile not found')
            // return this.userProfileFound = false // Set profile not found
          }
          querySnapshot.forEach((doc) => {
            let data = doc.data()
            this.comments.push(data.profile.photo)
          });
          // return this.userProfileFound = true
        })
        .catch(function(error) {
          // return this.userProfileFound = false  // Set profile not found
        });

      }) 
        
        
    },
    sendMessage() {
      return 'hola'
    },
  },
  mounted() {
      this.$fire.firestore.collection("users").where("userid", "==", this.$route.params.profile)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            // ! console.log('User profile not found')
            return this.userProfileFound = false // Set profile not found
          }
          querySnapshot.forEach((doc) => {
            // ! console.log(doc.id, " => ", doc.data());
            this.data = doc.data()
          });
          this.userProfileFound = true

          this.getCommentUserPhoto()
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
          //this.userProfileFound = false  // Set profile not found
        });
    },
};
</script>

<style lang="scss" scoped>
.contain {
  font-family: 'Roboto', sans-serif;
  letter-spacing: 0.5px;
}

.onFireGif {
  /* Color & Background */
  background-image: url("https://cdn.raidforums.com/s/csc.gif");
  background-position: 50% 50%;
  background-repeat: repeat;
}

.scholarshipApplicationGradient {
  background: linear-gradient(to right, #8e2de2, #4a00e0);
}

.scholarshipGiveawayGradient {
  background: linear-gradient(to right, #f12711, #f5af19);
}

.stickySidebar {
  position: fixed;
  max-height: calc(100vh - var(--offset) * 2);
}
</style>

// https://demonforums.net/images/sparkles.gif
// https://cdn.raidforums.com/s/csc.gif