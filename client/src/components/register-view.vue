<template>
  <div class="register-container">
    <p class="welcome-text">
      <b>Looks like you already have an active Steem account!</b>
      Enter your Steem
      <b>username</b> and
      <b>active ufl.edu</b>
      <b>email</b> below to continue!
    </p>
    <div class="form-wrapper">
      <form class="form" @submit.prevent="onSubmit">
        <div class="form-section">
          <div class="form-section--username">
            <input class="form-input" type="text" v-model="form.username" readonly />
            <p v-if="!validUsername">Username is taken!</p>
          </div>
          <div class="form-section--email">
            <input class="form-input" type="email" v-model="form.email" placeholder="@ufl.edu" />
            <p v-if="!validEmail">Email isn't a valid email!</p>
          </div>
        </div>
        <div class="form-section">
          <div class="btn-wrapper">
            <button class="register-btn"></button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const dsteem = require("dsteem");
// dsteem requires this module to be included here for some reason
const regeneratorRuntime = require("regenerator-runtime");
export default {
  name: "RegisterView",
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
      this.form.hasSteemAccount = 1;
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
      } else {
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
.register-container {
  position: relative;
  top: 0;

  background: url(../assets/BG.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  width: 100%;
  height: var(--inner-height);
}

.welcome-text {
  position: absolute;
  top: calc(var(--inner-height) * (500 / 1920));
  right: 0;
  left: 0;

  text-align: center;

  padding: 0 10vw;

  /* font-family: "Babas-Regular"; */
  font-size: 0.9em;
}

.form-wrapper {
  position: absolute;
  top: calc(var(--inner-height) * (850 / 1920));
  bottom: calc(var(--inner-height) * (675 / 1920));
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
}

.form-section {
  margin: 15px 0;
}

.form-section--username {
  margin-bottom: 10px;
}

/* .form-section--email {
} */

.form-input {
  text-align: center;
  width: calc(100vw * (600 / 1080));
  height: calc(100vw * (40 / 1080));
}

.form {
  margin: 0 auto;
}

.btn-wrapper {
  display: flex;
}

.register-btn {
  border: none;

  height: calc(var(--inner-height) * (100 / 1920));
  width: calc(100vw * (350 / 1080));

  background: url(../assets/btn_Register_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  margin: 0 auto;
}
.register-btn:active {
  outline: none;
}

@media screen and (min-device-width: 536px) {
  .register-btn {
    width: calc(536px * (350 / 1080));
  }
  .form-input {
    width: calc(536px * (600 / 1080));
    height: calc(536px * (40 / 1080));
  }
}
</style>