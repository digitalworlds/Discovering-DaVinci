<template>
  <div class="ledger-entry">
    <picture>
      <img class="header-img" src="../../assets/PNG/LedgerHeader.png" type="image/png" />
    </picture>
    <ul class="header-text">
      <li class="action-text">{{getAction}}</li>
      <li class="username-text">{{getName}}</li>
      <li class="date-text">{{getDate}}</li>
    </ul>
    <div class="description-text">{{getDescription}}</div>
    <readable-receipt :receipt="this.transaction.receipt" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ReadableReceipt from "./readable-receipt";
export default {
  name: "LedgerEntry",
  components: {
    ReadableReceipt
  },
  props: {
    transaction: {}
  },
  computed: {
    ...mapGetters(["getUser"]),
    getAction() {
      let action = "";

      if (this.transaction) {
        let rawAction = this.transaction.action;

        if (rawAction === "give") rawAction += "n";

        action += rawAction;

        if (this.transaction.from_id === this.getUser.name)
          action += action == "given" ? " to" : " by";
        else if (this.transaction.to_id === this.getUser.name)
          action += " from";

        return action;
      }
    },
    getName() {
      let name = "- ";

      if (this.transaction) {
        if (this.transaction.from_id === this.getUser.name)
          name += this.transaction.to_id;
        else if (this.transaction.to_id === this.getUser.name)
          name += this.transaction.from_id;

        return name;
      }
    },
    getDate() {
      let date = new Date(this.transaction.createdAt);
      // https://stackoverflow.com/questions/11591854/format-date-to-mm-dd-yyyy-in-javascript
      return (
        (date.getMonth() > 8
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "/" +
        (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
        "/" +
        date.getFullYear()
      );
    },
    getDescription() {
      let description = "";

      if (this.getAction === "claimed from")
        description = `You claimed a Random Trivia Card from ${this.getName}.`;
      else if (this.getAction === "claimed by")
        description = `${this.getName} claimed a Random Trivia Card from you.`;
      else if (this.getAction === "given from")
        description = `You received the following Invention Pieces from ${this.getName}:`;
      else if (this.getAction === "given to")
        description = `You gave the following Invention Pieces to ${this.getName}:`;

      return description;
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: MyriadPro-Regular;
  src: url(../../assets/MYRIADPRO-REGULAR.woff);
}

.ledger-entry {
  position: relative;
}

.header-img {
  width: 100%;
}

ul.header-text {
  list-style: none;
  margin: auto;
  padding: 0;
  position: absolute;
  top: calc(100vw * (15 / 1080));
  left: 0;
  right: 0;
  width: calc(100vw * (971 / 1080));
  height: calc(100vw * (58 / 1080));
}

ul li {
  display: inline-block;
}

ul li.action-text {
  font-family: "Babas-Regular";
  font-size: calc(100vw * (45 / 1080));
  float: left;
}

ul li.username-text {
  font-family: "MyriadPro-Regular";
  font-size: calc(100vw * (40 / 1080));

  float: left;
  position: relative;
  top: calc(100vw * (10 / 1080));

  margin-left: calc(100vw * (10 / 1080));
}

ul li.date-text {
  font-family: "MyriadPro-Regular";
  font-size: calc(100vw * (40 / 1080));

  float: right;
  position: relative;
  top: calc(100vw * (10 / 1080));
}

div.description-text {
  font-family: "MyriadPro-Regular";
  font-size: calc(100vw * (40 / 1080));
  width: calc(100vw * (971 / 1080));
  margin: auto;
}

@media screen and (min-device-width: 536px) {
  ul.header-text {
    top: calc(536px * (15 / 1080));
    width: calc(536px * (971 / 1080));
    height: calc(536px * (58 / 1080));
  }
  ul li.action-text {
    font-size: calc(536px * (45 / 1080));
  }
  ul li.username-text {
    font-size: calc(536px * (40 / 1080));
    top: calc(536px * (10 / 1080));
    margin-left: calc(536px * (10 / 1080));
  }

  ul li.date-text {
    font-size: calc(536px * (40 / 1080));
    top: calc(536px * (10 / 1080));
  }
  div.description-text {
    font-family: "MyriadPro-Regular";
    font-size: calc(536px * (40 / 1080));
    width: calc(536px * (971 / 1080));
  }
}
</style>