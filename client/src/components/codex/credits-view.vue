<template>
  <div class="credits-container">
    <div>
      <div class="header-text center">Design, Writing, and Research</div>
      <picture>
        <img class="line-img" src="../../assets/PNG/Codex_Line.png" type="image/png" />
      </picture>
      <div class="credits-wrapper">
        <dl class="list-wrapper">
          <div>
            <dt>Marko Suvajdzic</dt>
            <dd>Grant Primary Investigator</dd>
          </div>
          <div>
            <dt>James Oliverio</dt>
            <dd>Grant Co-Primary Investigator</dd>
          </div>
          <div>
            <dt>Paul Burgermeister</dt>
            <dd>Game Designer</dd>
          </div>
          <div>
            <dt>Jan Zamojski</dt>
            <dd>Copywriter</dd>
          </div>
          <div>
            <dt>Jan Zamojski</dt>
            <dd>Trivia Question Author</dd>
          </div>
          <div>
            <dt>Anna Walters</dt>
            <dd>Trivia Question Author</dd>
          </div>
          <div>
            <dt>Kristen Eldridge</dt>
            <dd>Copywriter</dd>
          </div>
          <div>
            <dt>Anthony Monteagudo</dt>
            <dd>Copywriter</dd>
          </div>
        </dl>
      </div>
    </div>
    <div>
      <div class="header-text center">Software</div>
      <picture>
        <img class="line-img" src="../../assets/PNG/Codex_Line.png" type="image/png" />
      </picture>
      <div class="credits-wrapper">
        <dl class="list-wrapper">
          <div>
            <dt>Liam Wood</dt>
            <dd>Tech Lead</dd>
          </div>
          <div>
            <dt>Liam Wood</dt>
            <dd>Full Stack</dd>
          </div>
          <div>
            <dt>Liam Wood</dt>
            <dd>Architect</dd>
          </div>
          <div>
            <dt>Kelvin Chang</dt>
            <dd>Frontend</dd>
          </div>
          <div>
            <dt>Steven Ettinger</dt>
            <dd>Consultant</dd>
          </div>
        </dl>
      </div>
    </div>
    <div>
      <div class="header-text center">Visual Arts</div>
      <picture>
        <img class="line-img" src="../../assets/PNG/Codex_Line.png" type="image/png" />
      </picture>
      <div class="credits-wrapper">
        <dl class="list-wrapper">
          <div>
            <dt>Paul Burgermeister</dt>
            <dd>Creative Direction</dd>
          </div>
          <div>
            <dt>Paul Burgermeister</dt>
            <dd>Graphic Designer</dd>
          </div>
          <div>
            <dt>Paul Burgermeister</dt>
            <dd>UI/UX Designer</dd>
          </div>
          <div>
            <dt>Ryan Trimble</dt>
            <dd>3D Modeler</dd>
          </div>
          <div>
            <dt>Ryan Trimble</dt>
            <dd>Texture Artist</dd>
          </div>
          <div>
            <dt>Ryan Trimble</dt>
            <dd>Visual Effects</dd>
          </div>
          <div>
            <dt>Nick Heitzman</dt>
            <dd>3D Modeler</dd>
          </div>
          <div>
            <dt>Nick Heitzman</dt>
            <dd>Texture Artist</dd>
          </div>
          <div>
            <dt>Seung Hyuk Jang</dt>
            <dd>3D Animator</dd>
          </div>
          <div>
            <dt>Seung Hyuk Jang</dt>
            <dd>3D Modeler</dd>
          </div>
          <div>
            <dt>Seung Hyuk Jang</dt>
            <dd>Texture Artist</dd>
          </div>
        </dl>
      </div>
    </div>
    <div>
      <div class="header-text center">Production</div>
      <picture>
        <img class="line-img" src="../../assets/PNG/Codex_Line.png" type="image/png" />
      </picture>
      <div class="credits-wrapper">
        <dl class="list-wrapper">
          <div>
            <dt>Paul Burgermeister</dt>
            <dd>Project Manager</dd>
          </div>
        </dl>
      </div>
    </div>
    <div>
      <div class="header-text center">Quality Assurance & Testing</div>
      <picture>
        <img class="line-img" src="../../assets/PNG/Codex_Line.png" type="image/png" />
      </picture>
      <div class="credits-wrapper" style="padding-bottom: 25%">
        <dl class="list-wrapper">
          <div>
            <dt>Aaron Karlson</dt>
            <dd>Tester</dd>
          </div>
          <div>
            <dt>Chelsea Cantrell</dt>
            <dd>Tester</dd>
          </div>
          <div>
            <dt>Gabriel Coleman</dt>
            <dd>Tester</dd>
          </div>
          <div>
            <dt>Jan Zamojski</dt>
            <dd>Tester</dd>
          </div>
          <div>
            <dt>Jared Crane</dt>
            <dd>Tester</dd>
          </div>
          <div>
            <dt>Justin Marlin</dt>
            <dd>Tester</dd>
          </div>
          <div>
            <dt>Nick Heitzman</dt>
            <dd>Tester</dd>
          </div>
          <div>
            <dt>Tim Difato</dt>
            <dd>Tester</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
const bodyScrollLock = require("body-scroll-lock");

export default {
  name: "CreditsView",
  components: {},
  mounted() {
    bodyScrollLock.disableBodyScroll(this.$el);
  }
};
</script>

<style scoped>
@font-face {
  font-family: MyriadPro-Regular;
  src: url(../../assets/MYRIADPRO-REGULAR.woff);
}

.credits-container {
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
  margin: 12px 0 0 0;
}

.header-text,
.center {
  text-align: center;
}

.line-img {
  display: block;
  margin: auto;
  width: calc(100vw * (950 / 1080));
}

.credits-wrapper {
  font-family: "Babas-Regular";
  font-size: calc(100vw * (40 / 1080));
  margin: 7px 24px 0 24px;
}

/* https://www.bennadel.com/blog/3622-styling-a-movie-cast-list-using-a-definition-list-and-css-flexbox.htm */
dl.list-wrapper {
  width: 100%;
  margin: 0;
}
dl.list-wrapper div {
  /* Setup the DT (character) and DD (cast) items as a flexible layout. */
  display: flex;
  margin: 0.5px 0px 0px 0px;
}
dl.list-wrapper dt {
  /*
        Setup the DT element as a NESTED flexible layout. This will control the
        IMPLICIT TEXT element (character) and the :after pseudo-element (dots)
        layouts.
    */
  display: flex;
  /* Setup the DT (character) element to grow and take-up space. */
  flex: 1 1 auto;
  margin: 0px 0px 0px 0px;
}
dl.list-wrapper dt:after {
  border-bottom: 2px dotted #787878;
  content: "";
  /*
        Setup the pseudo-element (dots) to grow and take-up space. This will fill
        the white-space with "dots" because it growing inside of another layout
        which is also growing.
    */
  flex: 1 1 auto;
  margin: 0px 5px 5px 5px;
}
dl.list-wrapper dd {
  /* Setup the DD (cast) element to shrink, allow for dots to fill space. */
  flex: 0 1 auto;
  margin: 0px 0px 0px 0px;
  font-family: "MyriadPro-Regular";
  font-size: calc(100vw * (42 / 1080));
}

@media screen and (min-device-width: 536px) {
  .header-text {
    font-size: calc(536px * (65 / 1080));
  }
  .credits-wrapper {
    font-size: calc(536px * (40 / 1080));
  }
  dl.list-wrapper dd {
    font-size: calc(536px * (42 / 1080));
  }
  .line-img {
    display: block;
    margin: auto;
    width: calc(536px * (950 / 1080));
  }
}
</style>
