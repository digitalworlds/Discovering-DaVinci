<template>
  <div class="invention-card" ref="inventionCard">
    <div class="header-img-shadow"></div>
    <picture>
      <img class="header-img" :src="getHeaderImage" type="image/png" />
    </picture>
    <div class="header-text">{{getInventionName}}</div>
    <div class="invention-dropdown" ref="inventionDropdown">
      <div class="invention-dropdown-wrapper">
        <div class="dropdown-footer-wrapper">
          <div class="dropdown-text-wrapper">
            <div
              class="dropdown-text--title"
              v-if="isUnlocked && !isOpen"
            >{{"Click to learn more about the " + getInventionName}}</div>
            <div
              class="dropdown-text--title"
              v-else-if="!isOpen"
            >Collect more invention pieces to unlock</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isUnlocked && !isOpen" class="dropdown-toggle" @click="toggleDropdown()"></div>
    <div class="dropdown-btn-wrapper">
      <button
        ref="dropdownBtn"
        class="dropdown-btn"
        :class="{'dropdown-btn--open': !isOpen, 'dropdown-btn--close': isOpen}"
        :disabled="!isUnlocked"
        @click="toggleDropdown()"
      ></button>
    </div>
    <carousel
      v-if="isOpen"
      class="carousel"
      ref="carousel"
      :per-page="1"
      :paginationMargin="0"
      :mouseDrag="false"
      :touchDrag="false"
    >
      <slide>
        <div class="slide-wrapper">
          <div class="slide-header">{{"LEONARDO DA VINCI'S " + getInventionName}}</div>
          <div v-if="getInventionName === 'ORNITHOPTER'">
            <img
              class="slide-image"
              src="https://grabcad.com/library/leonardo-da-vinci-s-ornithopter-1"
            />
            <p
              class="slide-text"
            >An ornithopter is an aircraft meant to imitate the way in which birds and bats fly by flapping their wings to generate thrust and momentum. The word ornithopter is derived from the Greek words ornithos and pteron, which mean bird and wing respectively. ­While some modern ornithopters are built to the scale of the creatures they are based on, Leonardo da Vinci’s original design was a heavier manned ornithopter that was powered by the strength of the pilot.</p>
          </div>
          <div v-else-if="getInventionName === 'AERIAL SCREW'">
            <img
              class="slide-image"
              src="http://www.leonardodavincisinventions.com/wp-content/uploads/2012/02/leonardo-da-vinci-helicopter.jpg"
            />
            <p
              class="slide-text"
            >Leonardo da Vinci’s aerial screw was a rotor in the shape of a helix and is believed to be the predecessor to the modern-day helicopter as it was designed to compress air to obtain flight in a similar manner. Leonardo’s idea to make a flying machine in the shape of a screw came from his careful observation of nature, specifically the maple seed that goes into a spin when it falls through the air, as well as his extensive knowledge of mechanics and geometry.</p>
          </div>
          <div v-else-if="getInventionName === 'ROBOTIC KNIGHT'">
            <img
              class="slide-image"
              src="https://upload.wikimedia.org/wikipedia/commons/4/45/Leonardo-Robot3.jpg"
            />
            <p
              class="slide-text"
            >Leonardo da Vinci’s robotic knight was an automaton based on the anatomical structure of a human, designed around 1495 and is considered to be the first humanoid robot. The robotic knight was clad in German-Italian medieval armor and was filled with gears and wheels that were connected to an elaborate pulley and cable system, which rendered it capable of standing, sitting, independently maneuvering its arms and raising its visor, it even had an anatomically correct jaw.</p>
          </div>
          <div v-else-if="getInventionName === 'PRINTING PRESS'">
            <img
              class="slide-image"
              src="https://images.fineartamerica.com/images-medium-large-5/leonardo-printing-press-granger.jpg"
            />
            <p
              class="slide-text"
            >Leonardo did not invent the printing press (that honor is generally attributed to Johannes Gutenburg). However, he did make some major improvements to Gutenburg's original model. While Gutenburg's press needed multiple people to operate, Leonardo's required only one person. Additionally, rather than manually changing out the paper before printing a new page, the user could pull the lever and the press would both print and advance to the next page simultaneously. It was a simple and efficient design, both elegant and easy to use.</p>
          </div>
          <div v-else-if="getInventionName === 'SELF-PROPELLED CART'">
            <img
              class="slide-image"
              src="https://en.wikipedia.org/wiki/Leonardo%27s_self-propelled_cart#/media/File:LeonardoCardDrawing.jpg"
            />
            <p
              class="slide-text"
            >Leonardo's self-propelled cart, as the name suggests, was designed to move by itself along a pre-programmed path, much like a robot! Keep in mind that Leonardo lived and died long before the industrial revolution; automobiles were nothing more than dreams, then. While the design was revolutionary, it went the way of most of Leonardo's sketches, never to be built during his lifetime. The design for the cart can be found inside the Codex Atlanticus, the largest existing collection of his original designs and notes.</p>
          </div>
        </div>
      </slide>
      <slide>
        <div class="slide-wrapper">
          <div class="slide-header">{{"LEONARDO DA VINCI'S " + getInventionName}}</div>
          <div v-if="getInventionName === 'ORNITHOPTER'">
            <img
              class="slide-image"
              src="http://www.leonardo-da-vinci.net/images/en/Ornithopter%20Leonardo%20da%20Vinci.jpg"
            />
            <p
              class="slide-text"
            >During his time, Leonardo da Vinci had a great interest in flight and thought about how to create a device that would allow humans to fly. He studied birds and bats extensively, drawing parallels between the wing structure of bats and the bone structure of human arms. He also learned that the inner part of the wing moved slower than the outer part, which helped him develop wings that could not just move forward but sustain flight. Leonardo’s studies lead to the creation of the Ornithopter.</p>
          </div>
          <div v-else-if="getInventionName === 'AERIAL SCREW'">
            <img
              class="slide-image"
              src="https://gdsit.cdn-immedia.net/2015/03/Elicottero-Da-Vinci.jpg"
            />
            <p
              class="slide-text"
            >Leonardo da Vinci’s aerial screw was a rotor in the shape of a helix and is believed to be the predecessor to the modern-day helicopter as it was designed to compress air to obtain flight in a similar manner. Leonardo’s idea to make a flying machine in the shape of a screw came from his careful observation of nature, specifically the maple seed that goes into a spin when it falls through the air, as well as his extensive knowledge of mechanics and geometry.</p>
          </div>
          <div v-else-if="getInventionName === 'ROBOTIC KNIGHT'">
            <img
              class="slide-image"
              src="https://www.leonardodavinci.net/images/gallery/Anatomical-studies-of-the-shoulder.jpg"
            />
            <p
              class="slide-text"
            >The robotic knight was a result of Leonardo’s anatomical research, as a close examination of the knight and the distance between its limbs clearly demonstrate that it obeys the Canon of Proportions as described in the Vitruvian Man. Da Vinci was deeply fascinated by human anatomy and spent many hours dissecting corpses in order to understand how the human body functioned, and how muscles propelled bone. He applied the principles he learned from this to the creation of the robot, including implementing proportional distances between joints and the use of pulleys and cables in place of muscles.</p>
          </div>
          <div v-else-if="getInventionName === 'PRINTING PRESS'">
            <img
              class="slide-image"
              src="https://images.ehive.com/accounts/4536/objects/images/38cc7ffac2b0483fa5973612283a3836_m.jpg"
            />
            <p
              class="slide-text"
            >Pulling the lever puts the entire machine into motion. The large cogwheel at the top turns, and the plate holding the paper is pulled upwards, into its place underneath the press. In the same instant, the press is clamped down onto the paper, stamping it. With one turn of the lever, the press has automatically loaded and printed onto the page. The result is a faster printing process. Gutenberg might have appreciated such a machine, considering his first print of the Bible took his team of twenty nearly three years to complete!</p>
          </div>
          <div v-else-if="getInventionName === 'SELF-PROPELLED CART'">
            <img
              class="slide-image"
              src="https://commons.wikimedia.org/wiki/File:Leonardo_Amboise_Automobile.jpg"
            />
            <p
              class="slide-text"
            >Leonardo's self-propelled cart, as the name suggests, was designed to move by itself along a pre-programmed path, much like a robot! Keep in mind that Leonardo lived and died long before the industrial revolution; automobiles were nothing more than dreams, then. While the design was revolutionary, it went the way of most of Leonardo's sketches, never to be built during his lifetime. The design for the cart can be found inside the Codex Atlanticus, the largest existing collection of his original designs and notes.</p>
          </div>
        </div>
      </slide>
      <slide>
        <div class="slide-wrapper">
          <div class="slide-header">{{"LEONARDO DA VINCI'S " + getInventionName}}</div>
          <div v-if="getInventionName === 'ORNITHOPTER'">
            <img
              class="slide-image"
              src="https://cdn.hswstatic.com/gif/bungled-personal-flight-attempt-3.jpg"
            />
            <p
              class="slide-text"
            >Leonardo made many sketches of the ornithopter from 1485 to the early 1490s, and they are considered to be the first conceptualization of winged mechanical flight. He had deduced that humans were too heavy and not strong enough to fly with just wings attached to their arms, so he sketched a device where the pilot lies down and straps themselves onto a plank where they are able to manipulate large wings with the use of various levers, pedals, and pulleys.</p>
          </div>
          <div v-else-if="getInventionName === 'AERIAL SCREW'">
            <img
              class="slide-image"
              src="https://modelexpo-online.com/assets/images/Da%20vinci%20model%20kit%20aerial%20screw%20vite-02.jpg"
            />
            <p
              class="slide-text"
            >Leonardo da Vinci’s aerial screw was a rotor in the shape of a helix and is believed to be the predecessor to the modern-day helicopter as it was designed to compress air to obtain flight in a similar manner. Leonardo’s idea to make a flying machine in the shape of a screw came from his careful observation of nature, specifically the maple seed that goes into a spin when it falls through the air, as well as his extensive knowledge of mechanics and geometry.</p>
          </div>
          <div v-else-if="getInventionName === 'ROBOTIC KNIGHT'">
            <img
              class="slide-image"
              src="https://www.leonardorobotsociety.org/uploads/2/3/7/2/23729156/knight.jpeg"
            />
            <p
              class="slide-text"
            >Unlike most of da Vinci’s inventions, it is possible that Leonardo actually built the robotic knight, as he was said to have displayed the machine at parties hosted by his wealthy patron Ludovico Sforza in the court of Milan. While only used for entertainment, it is likely that the knight was built with militaristic capabilities in mind, as it was designed to move with fluidity in combat.</p>
          </div>
          <div v-else-if="getInventionName === 'PRINTING PRESS'">
            <img
              class="slide-image"
              src="https://images.fineartamerica.com/images-medium-large-5/leonardo-printing-press-granger.jpg"
            />
            <p
              class="slide-text"
            >Leonardo was born a few years after Gutenberg invented the printing press. With the spread of significantly cheaper more plentiful books throughout Europe, Leonardo was able to acquire books to study from (though he preferred to learn from his own observations more than the writings of others). He kept detailed notes on his collection of over 200 books, comparing and critiquing the knowledge they offered. The printing press allowed Leonardo to join the intellectual conversation of his time, despite lacking a formal education.</p>
          </div>
          <div v-else-if="getInventionName === 'SELF-PROPELLED CART'">
            <img
              class="slide-image"
              src="https://commons.wikimedia.org/wiki/File:Amboise_clos_luc%C3%A9_inventinos_de_vinci_automobile.jpg"
            />
            <p
              class="slide-text"
            >Leonardo's self-propelled cart, as the name suggests, was designed to move by itself along a pre-programmed path, much like a robot! Keep in mind that Leonardo lived and died long before the industrial revolution; automobiles were nothing more than dreams, then. While the design was revolutionary, it went the way of most of Leonardo's sketches, never to be built during his lifetime. The design for the cart can be found inside the Codex Atlanticus, the largest existing collection of his original designs and notes.</p>
          </div>
        </div>
      </slide>
      <slide v-if="getInventionName !== 'PRINTING PRESS'">
        <div class="slide-wrapper">
          <div class="slide-header">{{"LEONARDO DA VINCI'S " + getInventionName}}</div>
          <div v-if="getInventionName === 'ORNITHOPTER'">
            <img class="slide-image" src="https://www.britannica.com/technology/ornithopter" />
            <p
              class="slide-text"
            >Many of Leonardo’s designs remained on paper and it is unknown if he ever actually built and tested a model of his ornithopter. As the aircraft had many inherent problems including wing design, stability, controllability, and durability. Materials available during Leonardo’s time would have also been too heavy and thus require too much energy for proper flight. Some of Leonardo’s contemporaries were also believed to have attempted to but could never quite figure out how to get the ornithopter off the ground.</p>
          </div>
          <div v-else-if="getInventionName === 'AERIAL SCREW'">
            <img
              class="slide-image"
              src="https://www.cittadelsole.it/skin1/images/audio-video/ip30294_leonardo_vite_aerea_2.jpg"
            />
            <p
              class="slide-text"
            >As with many of Leonardo da Vinci’s ideas, the aerial screw was likely never built or tested, but his sketches and notes were incredibly detailed and mapped out exactly how the device would operate. Though due to weight constrictions modern scientist believes it would not have been capable of taking flight. Other factors that limited the design included it being impossible for four people to produce anywhere near enough power for flight, also the torque created by the operators would rotate their platform as well as the screw.</p>
          </div>
          <div v-else-if="getInventionName === 'ROBOTIC KNIGHT'">
            <img
              class="slide-image"
              src="https://retirementdownsizing.com/wp-content/uploads/2018/10/Lost-Robot-in-U-of-Tulsa-cropped-1.jpg"
            />
            <p
              class="slide-text"
            >Even though Leonardo da Vinci’s robotic knight did not survive, and no one knew exactly what it was completely capable of doing, the sketches have since been discovered. Roboticist Mark Rosheim used these drawings to build a version of the knight in 2002, and it was fully functional, capable of walking and waving. Rosheim noted how da Vinci had designed the knight to be easily constructed, without any unnecessary parts. He also used Leonardo’s notes as inspiration for the robots he developed for planetary exploration for NASA.</p>
          </div>
          <div v-else-if="getInventionName === 'SELF-PROPELLED CART'">
            <img
              class="slide-image"
              src="https://commons.wikimedia.org/wiki/File:Leonardo_da_Vinci_Self_Propelled_Cart.jpg"
            />
            <p
              class="slide-text"
            >Despite its intended use as a novelty for the stage, the self-propelled cart is largely considered an ancestor of the modern automobile. Some experts even note its similarity in appearance to Spirit, one of NASA's Mars land rovers! With its innovative use of stored potential energy, the cart's spring-powered mechanic can also be seen in various forms in Leonardo's later sketches of flying machines. Leonardo never got to see his invention working with his own eyes, but its legacy as a landmark in history remains.</p>
          </div>
        </div>
      </slide>
      <slide>
        <model-viewer :invention_piece="inventionNumber" />
      </slide>
    </carousel>
    <!-- <div class="carousel-footer" v-if="isOpen">
      <picture>
        <img
          class="carousel-footer-btn carousel-footer-btn--left"
          src="../../assets/PNG/btn_CaretLeft_Default.png"
          type="image/png"
          @click="$refs.carousel.advancePage('backward')"
        />
      </picture>
      <picture>
        <img
          class="carousel-footer-btn carousel-footer-btn--right"
          src="../../assets/PNG/btn_CaretRight_Default.png"
          type="image/png"
          @click="$refs.carousel.advancePage()"
        />
      </picture>
    </div>-->
  </div>
</template>

<script>
import Carousel from "./carousel/src/Carousel";
import Slide from "./carousel/src/Slide";
import ModelViewer from "./model-viewer";

let unknownHeader = require("../../assets/PNG/InventionHeader_Unknown_001.png");
let screwHeader = require("../../assets/PNG/InventionHeader_AerialScrew_001.png");
let ornithopterHeader = require("../../assets/PNG/InventionHeader_Ornithopter_001.png");
let pressHeader = require("../../assets/PNG/InventionHeader_PrintingPress_001.png");
let knightHeader = require("../../assets/PNG/InventionHeader_RoboticKnight_001.png");
let cartHeader = require("../../assets/PNG/InventionHeader_SelfPropelledCart_001.png");

export default {
  name: "InventionCard",
  components: {
    Carousel,
    Slide,
    ModelViewer
  },
  props: {
    invention_pieces: {},
    inventionNumber: ""
  },
  data() {
    return {
      isOpen: false,
      isUnlocked: false,
      builtPieces: []
    };
  },
  created() {
    this.parseBuiltPieces();
    if (this.builtPieces.length / 3 >= 1) {
      this.isUnlocked = true;
    }
  },
  computed: {
    getInventionName() {
      let invention = this.inventionNumber;
      let inventionName = "";
      switch (invention) {
        case "0":
          inventionName = "ORNITHOPTER";
          break;
        case "1":
          inventionName = "AERIAL SCREW";
          break;
        case "2":
          inventionName = "ROBOTIC KNIGHT";
          break;
        case "3":
          inventionName = "PRINTING PRESS";
          break;
        case "4":
          inventionName = "SELF-PROPELLED CART";
          break;
      }
      return inventionName;
    },
    getHeaderImage() {
      if (!this.isUnlocked) return unknownHeader;

      let headerImage;

      switch (this.inventionNumber) {
        case "0":
          headerImage = ornithopterHeader;
          break;
        case "1":
          headerImage = screwHeader;
          break;
        case "2":
          headerImage = knightHeader;
          break;
        case "3":
          headerImage = pressHeader;
          break;
        case "4":
          headerImage = cartHeader;
          break;
      }

      return headerImage;
    }
  },
  methods: {
    parseBuiltPieces() {
      // returns an invention_pieces object without pieces that are flagged as built
      this.builtPieces = [];

      Object.keys(this.invention_pieces).forEach(key => {
        let unbuilt_pieces = this.invention_pieces[key].filter(piece => {
          if (piece.usedInBuild) {
            this.builtPieces.push(piece);
          }
          return !piece.usedInBuild; // this is the return for the filter
        });
      });
    },
    toggleDropdown() {
      if (!this.isOpen) {
        this.isOpen = true;
        this.openDropdown();
        this.$emit("toggledDropdown");
      } else {
        this.closeDropdown();
      }
    },
    openDropdown() {
      if (window.innerWidth < 536) {
        this.$refs.inventionCard.style.height = "calc(100vw * (966/1080))";
      } else {
        this.$refs.inventionCard.style.height = "calc(536px * (966/1080))";
      }
      this.$refs.inventionDropdown.style.clipPath = "inset(0 0 0 0)";
      this.$refs.inventionDropdown.style.webkitClipPath = "inset(0 0 0 0)";
    },
    closeDropdown() {
      this.isOpen = false;

      if (window.innerWidth > 536) {
        this.$refs.inventionCard.style.height = "calc(536px * (725 / 1920))";
        this.$refs.inventionDropdown.style["clip-path"] =
          "inset(calc(536px * (1260 / 1920)) 0 0 0)";
        this.$refs.inventionDropdown.style.webkitClipPath =
          "inset(calc(536px * (1260 / 1920)) 0 0 0)";
      } else {
        this.$refs.inventionCard.style.height = "calc(100vw * (725 / 1920))";
        this.$refs.inventionDropdown.style["clip-path"] =
          "inset(calc(100vw * (1260 / 1920)) 0 0 0)";
        this.$refs.inventionDropdown.style.webkitClipPath =
          "inset(calc(100vw * (1260 / 1920)) 0 0 0)";
      }
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: MyriadPro-Regular;
  src: url(../../assets/MYRIADPRO-LIGHT.woff);
}
.invention-card {
  height: calc(100vw * (725 / 1920));
  width: calc(100% * (1000 / 1080));

  position: relative;
  margin: 15px auto;
}

.header-img {
  height: calc(100vw * (305 / 1080));
  width: 100%;
  position: relative;
  z-index: 2;
}

.header-img-shadow {
  position: absolute;
  height: calc(100vw * (305 / 1080));
  width: 100%;
  z-index: 3;

  box-shadow: inset 0 -29px 40px -10px black;
  border-radius: 6px;
}

.header-text {
  position: absolute;
  z-index: 4;
  top: calc(100vw * (210 / 1080));
  left: 10px;

  font-family: "Babas-Regular";
  font-size: calc(100vw * (70 / 1080));
  color: white;
}

.invention-dropdown {
  background: url(../../assets/InventoryFrame_PrizeExpanded.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  position: absolute;
  bottom: 0px;
  /* left: 1.5%; */

  height: calc(100vw * (963 / 1080));
  width: 100%;
  z-index: 1;

  border-radius: 6px;

  clip-path: inset(calc(100vw * (1260 / 1920)) 0 0 0);
  pointer-events: none;
}

.invention-dropdown-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.dropdown-footer-wrapper {
  font-family: "Babas-Regular";
  font-size: 1em;

  position: absolute;
  bottom: 0;

  height: 10.5%;
  width: 100%;
}

.dropdown-text-wrapper {
  display: inline-block;

  height: 100%;
  width: 100%;
}

.dropdown-text--title {
  margin-left: 10px;
  line-height: calc(100vw * (182 / 1920));
  font-size: calc(100vw * (48 / 1080));
}

.dropdown-btn-wrapper {
  height: calc(100vw * (87 / 1080));
  width: calc(100vw * (87 / 1080));

  position: absolute;
  right: calc(100vw * (15 / 1080));
  bottom: calc(100vw * (6 / 1080));

  z-index: 4;
}

.dropdown-btn {
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
}

.dropdown-btn--open {
  background: url(../../assets/btn_CaretOpen_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.dropdown-btn--open:active {
  background: url(../../assets/btn_CaretOpen_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.dropdown-btn--open:disabled {
  background: url(../../assets/btn_CaretOpen_Selected.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
}

.dropdown-btn--close {
  background: url(../../assets/btn_CaretClose_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.dropdown-toggle {
  position: absolute;
  bottom: 0px;
  height: calc(100vw * (100 / 1080));
  width: 100%;
  z-index: 2;
}

.carousel {
  z-index: 1;
}

.slide-wrapper {
  height: calc(100vw * (500 / 1080));
  margin-bottom: calc(100vw * (70 / 1080));
  width: 100%;
  overflow-y: scroll;
}

.slide-header {
  font-family: "Babas-Regular";
  font-size: calc(100vw * (50 / 1080));
  padding: 0 10px;
}

.slide-text {
  font-family: "MyriadPro-Regular";
  font-size: calc(100vw * (39 / 1080));
  margin: 5px 0 15px;
  padding: 0 10px;
}

.slide-image {
  display: block;
  max-width: 230px;
  max-height: 95px;
  width: auto;
  height: auto;

  float: right;
  shape-outside: border-box;

  padding-left: 5px;
  margin-top: 29px;
  margin-right: 10px;
}

.carousel-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: calc(100vw * (105 / 1080));

  z-index: 3;
}

.carousel-footer-btn {
  position: absolute;
  height: calc(100vw * (87 / 1080));
  width: calc(100vw * (87 / 1080));
}

.carousel-footer-btn--left {
  left: calc(100vw * (240 / 1080));
}
.carousel-footer-btn--right {
  right: calc(100vw * (240 / 1080));
}

@media screen and (min-device-width: 374px) {
  .invention-dropdown {
    clip-path: inset(calc(100vw * (1019 / 1920)) 0 0 0);
  }
}

@media screen and (min-device-width: 536px) {
  .invention-card {
    height: calc(536px * (725 / 1920));
  }

  .invention-dropdown {
    height: calc(536px * (963 / 1080));
    clip-path: inset(calc(536px * (1260 / 1920)) 0 0 0);
  }

  .dropdown-btn-wrapper {
    height: calc(536px * (87 / 1080));
    width: calc(536px * (87 / 1080));

    right: calc(536px * (15 / 1080));
    bottom: calc(536px * (6 / 1080));
  }

  .dropdown-text--title {
    margin-left: 10px;
    line-height: calc(536px * (182 / 1920));
    font-size: calc(536px * (48 / 1080));
  }

  .header-text {
    font-size: calc(536px * (70 / 1080));
    top: calc(536px * (210 / 1080));
  }

  .header-img,
  .header-img-shadow {
    height: calc(536px * (305 / 1080));
  }

  .dropdown-toggle {
    height: calc(536px * (100 / 1080));
  }

  .slide-wrapper {
    height: calc(536px * (500 / 1080));
  }

  .slide-text {
    font-size: calc(536px * (39 / 1080));
  }

  .slide-header {
    font-size: calc(536px * (50 / 1080));
  }
}
</style>