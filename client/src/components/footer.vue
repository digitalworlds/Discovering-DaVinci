<template>
  <div class="footer-container" :class="[getFooterBackgroundClass]">
    <div class="footer-background" :class="[getFooterBackgroundClass]"></div>
    <div class="close-btn-wrapper">
      <button id="close-btn" @click="$router.push('/Play')"></button>
    </div>
    <div class="router-wrapper" :class="[getRouterWrapperClass]">
      <div
        class="inventory-routes"
        v-if="currRoute === '/Inventory' || currRoute === '/Inventions'"
      >
        <div class="router-btn-group router-btn-group--left">
          <button
            :disabled="section_title === 'Inventions'"
            class="router-btn"
            id="inventions-route-btn"
            @click="$router.push('/Inventions')"
          ></button>
        </div>
        <div class="router-btn-group router-btn-group--right">
          <button
            :disabled="section_title === 'Inventory'"
            class="router-btn"
            id="inventory-route-btn"
            @click="$router.push('/Inventory')"
          ></button>
        </div>
      </div>
      <div class="objectives-routes" v-if="currRoute.match(/\/Objectives\/\w+/g)">
        <div class="router-btn-group router-btn-group--left">
          <button
            :disabled="section_title === 'Daily'"
            class="router-btn"
            id="daily-route-btn"
            @click="routeTo('Daily')"
          ></button>
          <button
            :disabled="section_title === 'Weekly'"
            class="router-btn"
            id="weekly-route-btn"
            @click="routeTo('Weekly')"
          ></button>
        </div>
        <div class="router-btn-group router-btn-group--right">
          <button
            :disabled="section_title === 'Challenges'"
            class="router-btn"
            id="challenges-route-btn"
            @click="routeTo('Challenges')"
          ></button>
          <div class="router-btn router-btn--hidden"></div>
        </div>
      </div>
      <div class="codex-routes" v-if="currRoute.match(/\/Codex\/\w+/g)">
        <div class="router-btn-group router-btn-group--left">
          <button
            :disabled="section_title === 'Player Stats'"
            class="router-btn"
            id="playerstats-route-btn"
            @click="routeTo('PlayerStats')"
          ></button>
          <button
            :disabled="section_title === 'Ledger'"
            class="router-btn"
            id="ledger-route-btn"
            @click="routeTo('Ledger')"
          ></button>
        </div>
        <div class="router-btn-group router-btn-group--right">
          <button
            :disabled="section_title === 'FAQ'"
            class="router-btn"
            id="faq-route-btn"
            @click="routeTo('FAQ')"
          ></button>
          <button
            :disabled="section_title === 'Credits'"
            class="router-btn"
            id="credits-route-btn"
            @click="routeTo('Credits')"
          ></button>
        </div>
      </div>
      <div class="social-routes" v-if="currRoute.match(/\/Social\/\w+/g)">
        <div class="router-btn-group router-btn-group--left">
          <button
            :disabled="section_title === 'Collect'"
            class="router-btn"
            id="scan-route-btn"
            @click="routeTo('Collect')"
          ></button>
          <button
            :disabled="section_title === 'Give'"
            class="router-btn"
            id="give-route-btn"
            @click="routeTo('Give')"
          ></button>
        </div>
        <div class="router-btn-group router-btn-group--right">
          <button
            :disabled="section_title === 'Share'"
            class="router-btn"
            id="share-route-btn"
            @click="routeTo('Share')"
          ></button>
          <button class="router-btn router-btn--hidden"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    currRoute: "",
    section_title: ""
  },
  created() {
  },
  computed: {
    getFooterBackgroundClass() {
      let footerClass = "footer-background--";

      return this.appendClassAdjective(footerClass);
    },
    getRouterWrapperClass() {
      let routerClass = "router-wrapper--";

      return this.appendClassAdjective(routerClass);
    }
  },
  methods: {
    appendClassAdjective(class_name) {
      if (
        this.currRoute.includes("/Inventory") ||
        this.currRoute.includes("/Inventions")
      )
        class_name += "short";
      else if (
        this.currRoute.includes("/Objectives") ||
        this.currRoute.includes("/Codex")
      )
        class_name += "tall";

      return class_name;
    },
    routeTo(newRoute) {
      let parentRoute = this.currRoute.split("/")[1];
      let newPath = `/${parentRoute}/${newRoute}`;

      this.$router.push(newPath);
    }
  }
};
</script>

<style scoped>
/* Global Styles */
/* button:hover {
	animation: bounce 0.5s;
} */

button:focus {
  outline: 0;
}

/* Animations */
@keyframes bounce {
  0%,
  20%,
  60%,
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  40% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
    transform: scaleX(1.2) scaleY(1.2);
  }

  /* 80% {
		-webkit-transform: translateY(-5px);
		transform: translateY(-5px);
	} */
}

/* Footer Background Styles */

.footer-container {
  z-index: 2;
  position: relative;
  bottom: 0;

  height: calc(var(--inner-height) * (280 / 1920));
  width: 100%;

  /* overflow: hidden; */
  box-shadow: 0px 0px 40px 34px black;
}

.footer-background {
  background: url(../assets/Footer.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  /* box-shadow: 0px -20px 50px 10px black; */

  position: relative;
  bottom: 0;
  left: 0;

  width: 100%;
}

.footer-background--short {
  height: calc(var(--inner-height) * (200 / 1920));
}

.footer-background--tall {
  height: calc(var(--inner-height) * (280 / 1920));
}

/* Router Styles */

.router-wrapper {
  position: absolute;
  bottom: 0;

  width: 100%;
  height: calc(var(--inner-height) * (249 / 1920));
}

.router-wrapper--short {
  height: calc(var(--inner-height) * (174 / 1920));
}

.router-wrapper--tall {
  height: calc(var(--inner-height) * (249 / 1920));
}

.router-btn-group {
  position: absolute;
  width: 39%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.router-btn-group--left {
  left: 0;
}

.router-btn-group--right {
  right: 0;
}

/* Router Button Styles */

.router-btn {
  margin: 0 auto;
  display: inline-block;
  background: url(../assets/btn_Footer_Base_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  border-radius: 13%;
  border-width: 0;

  width: 80%;
  height: calc(100% * (800 / 1080));
}

.router-btn--hidden {
  background: none;
}

/* INVENTIONS BUTTON */
#inventions-route-btn {
  background: url(../assets/btn_FooterInventory_Inventions_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#inventions-route-btn:active {
  background: url(../assets/btn_FooterInventory_Inventions_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#inventions-route-btn:disabled {
  background: url(../assets/btn_FooterInventory_Inventions_Disabled.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* INVENTORY BUTTON */
#inventory-route-btn {
  background: url(../assets/btn_FooterInventory_Inventory_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#inventory-route-btn:active {
  background: url(../assets/btn_FooterInventory_Inventory_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#inventory-route-btn:disabled {
  background: url(../assets/btn_FooterInventory_Inventory_Disabled.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* PLAYER STATS BUTTON */
#playerstats-route-btn {
  background: url(../assets/btn_FooterCodex_PlayerStats_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#playerstats-route-btn:active {
  background: url(../assets/btn_FooterCodex_PlayerStats_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#playerstats-route-btn:disabled,
#playerstats-route-btn[disabled] {
  background: url(../assets/btn_FooterCodex_PlayerStats_Disabled.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* LEGDER BUTTON */
#ledger-route-btn {
  background: url(../assets/btn_FooterCodex_Ledger_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#ledger-route-btn:active {
  background: url(../assets/btn_FooterCodex_Ledger_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#ledger-route-btn:disabled,
#ledger-route-btn[disabled] {
  background: url(../assets/btn_FooterCodex_Ledger_Disabled.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* FAQ BUTTON */
#faq-route-btn {
  background: url(../assets/btn_FooterCodex_FAQ_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#faq-route-btn:active {
  background: url(../assets/btn_FooterCodex_FAQ_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#faq-route-btn:disabled,
#faq-route-btn[disabled] {
  background: url(../assets/btn_FooterCodex_FAQ_Disabled.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* CREDITS BUTTON */
#credits-route-btn {
  background: url(../assets/btn_FooterCodex_Credits_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#credits-route-btn:active {
  background: url(../assets/btn_FooterCodex_Credits_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#credits-route-btn:disabled,
#credits-route-btn[disabled] {
  background: url(../assets/btn_FooterCodex_Credits_Disabled.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* DAILY BUTTON */

#daily-route-btn {
  background: url(../assets/btn_FooterObjective_Daily_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#daily-route-btn:active {
  background: url(../assets/btn_FooterObjective_Daily_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#daily-route-btn:disabled,
#daily-route-btn[disabled] {
  background: url(../assets/btn_FooterObjective_Daily_Disabled.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* WEEKLY BUTTON */
#weekly-route-btn {
  background: url(../assets/btn_FooterObjective_Weekly_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#weekly-route-btn:active {
  background: url(../assets/btn_FooterObjective_Weekly_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#weekly-route-btn:disabled,
#weekly-route-btn[disabled] {
  background: url(../assets/btn_FooterObjective_Weekly_Disabled.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* CHALLENGES BUTTON */
#challenges-route-btn {
  background: url(../assets/btn_FooterObjective_Challenges_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#challenges-route-btn:active {
  background: url(../assets/btn_FooterObjective_Challenges_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#challenges-route-btn:disabled,
#challenges-route-btn[disabled] {
  background: url(../assets/btn_FooterObjective_Challenges_Disabled.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* SCAN BUTTON */
#scan-route-btn {
  background: url(../assets/btn_FooterSocial_Scan_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#scan-route-btn:active {
  background: url(../assets/btn_FooterSocial_Scan_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#scan-route-btn:disabled,
#scan-route-btn[disabled] {
  background: url(../assets/btn_FooterSocial_Scan_Disabled.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* SHARE BUTTON */
#share-route-btn {
  background: url(../assets/btn_FooterSocial_QRCode_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#share-route-btn:active {
  background: url(../assets/btn_FooterSocial_QRCode_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#share-route-btn:disabled,
#share-route-btn[disabled] {
  background: url(../assets/btn_FooterSocial_QRCode_Disabled.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* GIVE BUTTON */
#give-route-btn {
  background: url(../assets/btn_FooterSocial_Give_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#give-route-btn:active {
  background: url(../assets/btn_FooterSocial_Give_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

#give-route-btn:disabled,
#give-route-btn[disabled] {
  background: url(../assets/btn_FooterSocial_Give_Disabled.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/* Close Button Styles */

.close-btn-wrapper {
  position: absolute;
  bottom: 0px;
  text-align: center;
  width: calc(100vw * (240 / 1080));
  height: calc(var(--inner-height) * (350 / 1920));
  left: calc(100vw * ((540 - 120) / 1080));

  z-index: 2;
  overflow-y: hidden;
  /* clip-path: inset(0 0 calc(var(--inner-height) * (10 / 1920)) 0); */
}

#close-btn {
  background: url(../assets/btn_FooterBack_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  bottom: -35px;
  left: 0;
  border: 0;

  /* max-height: 119px; */

  height: calc(var(--inner-height) * (350 / 1920));
  width: calc(100vw * (240 / 1080));
  display: inline-block;
}

#close-btn:active {
  background: url(../assets/btn_FooterBack_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  border: 0;

  height: calc(var(--inner-height) * (350 / 1920));
  width: calc(100vw * (240 / 1080));
  display: inline-block;
}

@media screen and (min-device-width: 526px) {
  #close-btn {
    height: 143.016px;
    width: 119px;
  }
  #close-btn:active {
    height: 143.016px;
    width: 119px;
  }
  .close-btn-wrapper {
    width: 173.703px;
    height: 146.016;
    left: 207.667px;
  }
}
</style>