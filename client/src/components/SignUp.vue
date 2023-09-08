<template>
  <div class="signup-container">
    <form @submit.prevent="onSubmit">
      <div class="form-section">
        <label>UFL Email</label>
        <input type="email" v-model="form.email" />
        <p v-if="!validEmail">Email isn't a valid email!</p>
      </div>
      <div class="form-section" v-if="!form.hasSteemAccount">
        <label>Username</label>
        <input type="text" v-model="form.username" />
        <p v-if="!validUsername">Username is taken!</p>
      </div>
      <div class="form-section" v-else>
        <label>Username</label>
        <input type="text" v-model="form.username" readonly />
        <p v-if="!validUsername">Username is taken!</p>
      </div>
      <button>Submit</button>
    </form>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const dsteem = require("dsteem");
// dsteem requires this module to be included here for some reason
const regeneratorRuntime = require("regenerator-runtime");

export default {
  name: "SignUp",
  data() {
    return {
      form: {
        email: "",
        username: "",
        hasSteemAccount: false
      },
      client: {},
      validUsername: true,
      validEmail: true
    };
  },
  created() {
    // One good node to use. You can find a good list at https://developers.steem.io/quickstart/#quickstart-steemd-nodes
    this.client = new dsteem.Client("https://api.steemit.com");

    // check if there's a user in local storage
    let existingUser = this.getUser.name;

    if (existingUser) {
      this.form.username = existingUser;
      this.form.hasSteemAccount = true;
    }
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  methods: {
    async onSubmit() {
      // Verify username availabiliyu
      if (
        (await this.verifyUsername(this.form.username)) === false &&
        this.getUser.name === ""
      ) {
        console.log("Username is TAKEN");
        this.validUsername = false;
      } else {
        this.validUsername = true;
      }
      // verify email is a UFL one
      if (this.verifyEmail()) {
        console.log("Email is not UFL!");
        this.validEmail = false;
      }
       else {
        this.validEmail = true;
      }
      // do something with valid form
      if (this.validEmail && this.validUsername) {
        console.log("VALID SUBMISSION!");
        this.$router.push({
          name: "EmailVerification",
          params: {
            user: this.form
          }
        });
      }
    },
    // returns true when username is UNavailable
    async verifyUsername(username) {
      // search for username and if response is more than an empty array, account is available
      let response = await this.client.database.getAccounts([username]);
      if (response.length == 0) return true;
      return false;
    },
    // returns true if domains match
    verifyEmail() {
      var domain = "@ufl.edu";
      return !this.form.email.endsWith(domain);
    }
  }
};
</script>

<style scoped>
.signup-container {
  position: fixed;

  top: calc((372 / 1920) * 100vh);
  height: calc(100vh * (1270 / 1920));
  /* bottom: calc(100vh * (249 / 1920)); */

  width: 100%;

  z-index: -1;

  overflow-y: scroll;
}
</style>
