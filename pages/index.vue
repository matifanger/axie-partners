<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-img class="scholarImage"
        height="50vh"
        position="50% 5%"
        src="gallery/find-a-scholarship.jpg"
      >
        <v-col
          justify="center"
          align="center"
          flat
          color="transparent"
          class="centered"
        >
          <div>
            <h1 class="white--text" style=" font-family: 'Montserrat', sans-serif; font-size: 4vh">
              Hire expert's <span class="gradient">Axie Infinity</span> players &
              get hired
            </h1>
            <h3 class="white--text font-weight-light" style="font-size: 2.4vh">
              Sign up and post a scholarship or create your scholar profile.
              <br />
              We will find offers / candidates for you!
            </h3>
          </div>
          <v-card-actions class="mt-4 justify-center">
            <v-btn class="text-none" large color="primary"
              >Create a scholar profile</v-btn
            >
            <v-btn class="text-none" large color="success"
              >Be a manager</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-img>

      <v-row class="justify-center mt-1">
        <v-col xs="12" sm="10" md="6">
          <div v-if="jobsLoaded" class="d-flex flex-column mb-6">
            <v-text-field
              class="mb-3"
              @keyup.enter="getQuery"
              @click:append="getQuery"
              v-model="searchQuery"
              :loading="loadingSearch"
              clearable
              append-icon="mdi-magnify"
              clear-icon="mdi-close-circle-outline"
              outlined
              dense
              label="Keywords, location, job type..."
              placeholder="Keywords, location, job type..."
              hide-details="auto"
            ></v-text-field>
            <template v-if="usersFound == true">
              <v-hover v-for="(item, i) in data" :key="i" v-slot="{ hover }">
                <v-card
                  class="mb-2 ml-1"
                  :color="`${hover ? 'rgb(238, 240, 241)' : 'rgb(255,255,255)'}`"
                  :style="styleObject"
                  flat
                  tile
                  outlined
                >
                  <v-row>
                    <v-col cols="1">
                      <v-avatar class="ml-3 mt-3 rounded-circle" color="grey" size="50">
                        <v-img 
                          :src="item.profile.photo"
                        ></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col cols="11">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="text-h6 textdark--text mb-1">
                            {{ item.user.name }}
                          </v-list-item-title>
                          <v-list-item-subtitle class="mb-2">
                            <v-icon small>mdi-map-marker</v-icon>Buenos Aires – Argentina
                            </v-list-item-subtitle>
                          <p style="line-height: 1.5">
                            Do you have the ability to explain complex
                            technical concepts in an easy-to-understand way? Are
                            you energized by developing a personal brand and
                            creating educational content that
                            c.
                            </p>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-card>
              </v-hover>
            </template>
          </div>
        </v-col>
        <!-- <v-col cols="1">
      ads
    </v-col> -->
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      usersFound: false,
      jobsLoaded: true,
      data: [],
      loadingSearch: false,
      searchQuery: "",
      styleObject: { border: "1px solid rgba(220,220,220, .9)" },
    };
  },
  methods: {
    getQuery() {},
  },
  created() {
    // axios.get("https://pokeapi.co/api/v2/pokemon/?limit=100").then((res) => {
    //   this.data = res.data;
    // });


          this.$fire.firestore.collection("users")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            // ! console.log('User profile not found')
            return this.usersFound = false // Set profile not found
          }
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            this.data.push(doc.data())
          });
          this.usersFound = true
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
          //this.userProfileFound = false  // Set profile not found
        });





  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;600;800&family=Open+Sans:wght@300&display=swap");

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.scholarImage::before {
    content: '';
    display: block;
    position: absolute;
    background-color: #000;
    opacity: 0.5;
    width: 100%;
    height: 100%;
}

.gradient {
  background: linear-gradient(to right, #b8007a, #ff6a00);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>