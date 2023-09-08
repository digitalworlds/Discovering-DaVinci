<template>
  <div class="faq-container">
    <div class="header-text">FAQ-General</div>
    <div class="faq-wrapper">
      <faq-entry>
        <template v-slot:question>What is a blockchain?</template>
        <template
          v-slot:answer
        >A blockchain is a record of all transactions made through a cryptocurrency. Every time the record updates, a new “block” of updates are added to the chain of existing blocks (hence, the name).</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>What is a cryptocurrency?</template>
        <template
          v-slot:answer
        >Cryptocurrency is an entirely digital form of currency. It uses strong cryptography in order to keep assets and transactions secure. A well-known example would be Bitcoin.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>What is STEEM?</template>
        <template
          v-slot:answer
        >STEEM is both a cryptocurrency and a blockchain, similar to Bitcoin. As a cryptocurrency, it can be accumulated in a digital wallet, transferred between wallet-holders, and used for purchases, just like traditional currency.</template>
      </faq-entry>
      <faq-entry :useBigHeader="true">
        <template v-slot:question>How does Discover implement blockchain and STEEM?</template>
        <template
          v-slot:answer
        >Discover uses the STEEM blockchain to keep track of transactions between players. A STEEM wallet is necessary to access the game, and keys to the STEEM wallet are used to verify and authorize all transactions. This works to introduce players to the concept of cryptocurrencies and blockchains in a tangible format.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>What are keys? Which key do I use to play this game?</template>
        <template
          v-slot:answer
        >Keys are essentially passwords used to access functions of your account. You will receive four keys when you create your account: owner, active, posting, and memo. You will need the “active” key to access the game. Because these keys are long and difficult to memorize, you may also create a shorter keychain password that you can use to log-in.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>Where else can I use my STEEM account?</template>
        <template
          v-slot:answer
        >As a social blockchain that can also be used on a variety of platforms including Steemit, eSteem, Steem Monsters, and Dtube. Users will be rewarded for sharing and engaging in content on these platforms.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>Where can I learn more about STEEM?</template>
        <template v-slot:answer>
          <a href="https://steemit.com/faq.html">https://steemit.com/faq.html</a>
          <br />
          <a href="https://steem.com/faq/">https://steem.com/faq/</a>
        </template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>What do I do if I lost my password/keys?</template>
        <template
          v-slot:answer
        >Since passwords/keys are unique to users there is no way to recover them if they are lost. It is heavily encouraged that as soon as users obtain a password/key that they save and backup them up somewhere safe. Keeping an offline copy such as on a flash drive or paper is recommended in case of data loss due to computer complications occur.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>What do I do if my password/keys are stolen?</template>
        <template
          v-slot:answer
        >If your keys are somehow obtained by a third-party, that party has full access to your account and all of the funds inside of it. If this is the case, it is recommended that you change your password/keys immediately. To ensure this does not happen, do not enter your keys on any third-party website.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>How do I use the AR features of this game?</template>
        <template
          v-slot:answer
        >The AR features are available when claiming Trivia Cards from other users. In the Social menu, it will ask you to open up the camera, which can be used to scan other player’s QR codes, which will show their “Infinite” invention piece.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>Where can I get help if I didn’t see my answer here?</template>
        <template v-slot:answer>Feel free to email us at discoverteam@ufl.edu</template>
      </faq-entry>
    </div>
    <div class="header-text">FAQ-Game Specific</div>
    <div class="faq-wrapper" style="padding-bottom: 20%">
      <faq-entry>
        <template v-slot:question>What are Invention Pieces and how do I collect them?</template>
        <template
          v-slot:answer
        >In Discover da Vinci, pieces of da Vinci’s legendary Inventions can be collected by answering trivia questions or by scanning other player’s QR codes. If you collect one of each of the three Invention pieces belonging to a specific Invention you may build the Invention they belong to, creating a Completed Invention.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>What can I do with Completed Inventions?</template>
        <template
          v-slot:answer
        >Completed Inventions are used as raffle entries in order to win prizes! Each completed invention is an entry into its own special raffle.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>How do I know what raffle I am entering?</template>
        <template
          v-slot:answer
        >Each completed Invention is associated with its own raffle. This information can be found in the pull-down menus that can be found on the menu screen.</template>
      </faq-entry>
      <faq-entry :useBigHeader="true">
        <template v-slot:question>Can I share Completed Inventions and coins with other players?</template>
        <template v-slot:answer>No, only Invention pieces can be shared with other players.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>What is a QR code scanner? How do I use it?</template>
        <template
          v-slot:answer
        >QR (Quick Response) codes are used to quickly take information from a piece of media and put it into your cell phone. To do so, simply go to the Social menu and under the scan option, your phone’s camera will scan the QR code for you!</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>How will I receive my prizes?</template>
        <template
          v-slot:answer
        >The raffle drawing will be held on Wednesday, February 5th, 2020. If you win anything, Digital Worlds will contact you once the raffle drawing is finished.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>What are coins and what can I do with them?</template>
        <template
          v-slot:answer
        >Coins are a resource in Discover da Vinci and are used when drawing trivia cards, as well as to facilitate trading between players. Players are automatically gifted 3,000 coins every day at 3:00 AM EST with a limit of 15,000 that cannot be exceeded.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>How do coins relate to STEEM?</template>
        <template
          v-slot:answer
        >The Steem blockchain runs on Steem Power, which is a limited resource that you have and regenerates daily, similar to coins.</template>
      </faq-entry>
      <faq-entry :useBigHeader="true">
        <template
          v-slot:question
        >What are the daily/weekly objectives and what will I receive from completing them?</template>
        <template
          v-slot:answer
        >Daily and weekly objectives are provided to players in order to receive one of three different award options. Each objective has its own criteria that must be met to complete, progress made toward these objectives can be found within the specific objective. Progress made on daily/weekly objectives are periodically reset.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>When do daily/weekly objectives reset?</template>
        <template
          v-slot:answer
        >Both Daily and Weekly objectives have reset timers with daily objectives resetting every day at 3:00 AM EST, and weekly objectives every Thursday at 3:00 AM EST. When a reset occurs the player’s progress or completed status returns to its original state. This allows players to redo objectives multiple times to regain the listed rewards.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>What are Challenges?</template>
        <template
          v-slot:answer
        >Challenges are tiered achievements that can be completed throughout the game’s entire duration. Each Challenge has multiple tiers associated with it and completing higher tiers of a Challenge grants greater rewards. Progress made towards any Challenge objective doesn’t reset.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>How do I share Invention pieces with other players?</template>
        <template v-slot:answer>You can trade Invention pieces by accessing the social menu.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>How many trivia questions can I answer per day?</template>
        <template
          v-slot:answer
        >As long as you have enough coins, you can continue drawing trivia questions to answer. Drawing a card from the deck costs 100 coins, and using a card from your collection costs 75 coins.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>How many Inventions can I build?</template>
        <template
          v-slot:answer
        >There are five different Inventions. You can build each Invention multiple times over. The more times you complete a specific Invention, the more entries you get into the drawing for the prize tied to that Invention.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>What are the prizes being offered?</template>
        <template v-slot:answer>
          There are five prizes, each corresponding to a specific Invention. Prizes include:
          <ul>
            <li style="display:list-item">Board Game Horde</li>
            <li style="display:list-item">Gator Gear Haul</li>
            <li style="display:list-item">AirPods by Apple</li>
            <li style="display:list-item">Gaming Mouse & Mat</li>
            <li style="display:list-item">Nintendo Switch</li>
          </ul>
        </template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>When will prizes be drawn?</template>
        <template
          v-slot:answer
        >Prizes will be drawn on Wednesday, February 5th, 2020, during the Twitch event.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>Can I purchase extra coins?</template>
        <template v-slot:answer>No, coins cannot be purchased.</template>
      </faq-entry>
      <faq-entry>
        <template v-slot:question>Do coins recharge?</template>
        <template
          v-slot:answer
        >You will receive 3000 coins each day. However, your total amount of coins will never exceed the cap at 15,000.</template>
      </faq-entry>
    </div>
  </div>
</template>

<script>
import FaqEntry from "./faq-entry";
const bodyScrollLock = require("body-scroll-lock");

export default {
  name: "FaqView",
  components: {
    FaqEntry
  },
  mounted() {
    bodyScrollLock.disableBodyScroll(this.$el);
  },
  methods: {
    test() {
      console.log("test");
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: MyriadPro-Regular;
  src: url(../../assets/MYRIADPRO-REGULAR.woff);
}

@font-face {
  font-family: MyriadPro-Bold;
  src: url(../../assets/MYRIADPRO-SEMIBOLD.woff);
}

.faq-container {
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;

  height: calc(var(--inner-height) * (1270 / 1920));
  width: 100%;

  overflow-y: scroll;
}

.header-text {
  font-family: "Babas-Regular";
  font-size: calc(100vw * (65 / 1080));
  margin: 12px 0 0 24px;
}

.faq-wrapper {
  width: 93%;
  margin: 0 auto;
}

@media screen and (min-device-width: 536px) {
  .header-text {
    font-family: "Babas-Regular";
    font-size: calc(536px * (65 / 1080));
    margin: 12px 0 0 24px;
  }
}
</style>
