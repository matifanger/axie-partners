<template>
    <div>

    </div>
</template>

<script>
    export default {
        data() {
        return {
            userProfileFound: null,
        }
    },
      mounted() {

      const refDb = this.$fire.firestore.collection("users")
      
      refDb.child("profile/scholarship/applications/id")

      .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            console.log('User profile not found')
            return this.userProfileFound = false // Set profile not found
          }
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
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
    }
</script>

<style lang="scss" scoped>

</style>