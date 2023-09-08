<template>
  <div class="account-creation container">
    <form @submit.prevent="onSubmit">
      <p>Steem Account Creation</p>
      <div class="form-section">
        <label>Username</label>
        <input type="text" v-model="form.username">
      </div>
      <div class="form-section passwords">
        <div class="form-section">
          <label>Password</label>
          <input type="password" v-model="form.password">
        </div>
        <div class="form-section">
          <label>Confirm Password</label>
          <input type="password" v-model="form.confirm_password">
        </div>
        <p v-if="!validPasswords">Passwords don't match!</p>
        <button>Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "../api";
const dsteem = require("dsteem");
let opts = {};
//connect to production server
opts.addressPrefix = "STM";
opts.chainId =
  "0000000000000000000000000000000000000000000000000000000000000000";
//connect to server which is connected to the network/production
const client = new dsteem.Client("https://api.steemit.com");

export default {
  name: "AccountCreation",
  props: {
    user: {}
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        confirm_password: ""
      },
      keys: {
        ownerKey: "",
        activeKey: "",
        memoKey: "",
        postingKey: ""
      },
      validPasswords: true
    };
  },
  created() {
    this.form.username = this.$route.params.user.username;
  },
  methods: {
    async onSubmit() {
      // verify passwords match
      if (this.verifyPassword()) {
        console.log("Passwords DONT match");
        this.validPasswords = false;
      } else {
        this.validPasswords = true;
      }

      if (this.validPasswords) {
        let keys = this.generatePrivateKeys(
          this.form.username,
          this.form.password
        );
        let creator = await api.getCreator();
        let op = this.generateCreateOp(keys, creator.creatorAccount, this.form.username);
        // this.broadcastCreateOp(op, creator.creatorKey);
      }
    },
    // returns true when passwords don't match
    verifyPassword() {
      return !(this.form.password === this.form.confirm_password);
    },
    generateCreateOp(keys, creator, newUsername) {
      let op = [
        "account_create",
        {
          fee: '',
          creator: creator,
          new_account_name: newUsername,
          owner: keys.ownerAuth,
          active: keys.activeAuth,
          posting: keys.postingAuth,
          memo_key: keys.memoKey,
          json_metadata: ""
        }
      ];
      console.log('op', JSON.stringify(op, null, 2))
      return op
    },
    broadcastCreateOp(op, privateKey) {
      client.broadcast.sendOperations([op], privateKey).then(
        function(result) {
          console.log(result)
        },
        function(error) {
          console.error(error);
        }
      );
    },
    generatePrivateKeys(username, password) {
      let publicKeys = {},
        privateKeys = {};
      publicKeys.ownerKey = dsteem.PrivateKey.fromLogin(
        username,
        password,
        "owner"
      );
      publicKeys.activeKey = dsteem.PrivateKey.fromLogin(
        username,
        password,
        "active"
      );
      publicKeys.postingKey = dsteem.PrivateKey.fromLogin(
        username,
        password,
        "posting"
      );
      publicKeys.memoKey = dsteem.PrivateKey.fromLogin(
        username,
        password,
        "memo"
      ).createPublic(opts.addressPrefix);

      privateKeys.ownerAuth = {
        weight_threshold: 1,
        account_auths: [],
        key_auths: [[publicKeys.ownerKey.createPublic(opts.addressPrefix), 1]]
      };
      privateKeys.activeAuth = {
        weight_threshold: 1,
        account_auths: [],
        key_auths: [[publicKeys.activeKey.createPublic(opts.addressPrefix), 1]]
      };
      privateKeys.postingAuth = {
        weight_threshold: 1,
        account_auths: [],
        key_auths: [[publicKeys.postingKey.createPublic(opts.addressPrefix), 1]]
      };
      return { ...privateKeys, ...publicKeys };
    }
  }
};
</script>

<style>
</style>
