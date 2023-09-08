<template>
  <div class="register-container">
    <p class="welcome-text">
      <b>Check your email!</b>
      <br />We just sent a verification email to the address you provided us. Click the link within it to verify your account.
    </p>
    <div class="icon-wrapper">
      <picture>
        <img class="mail-icon" src="../assets/PNG/MailIcon.png" type="image/png" />
      </picture>
    </div>
  </div>
</template>

<script>
import api from "../api";
export default {
  name: "EmailVerification",
  props: ["user"],
  created() {
    api.registerNew(this.user);
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

.icon-wrapper {
  position: absolute;
  top: calc(var(--inner-height) * (850 / 1920));
  bottom: calc(var(--inner-height) * (675 / 1920));
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
}

picture {
  margin: auto;
  display: block;
}

.mail-icon {
  margin: auto;
  display: block;
  max-height: calc(var(--inner-height) * (115 / 1080));
  height: auto;
  width: auto;
}

@media screen and (min-device-width: 536px) {
}
</style>
