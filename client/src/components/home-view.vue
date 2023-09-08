<template>
  <div class="home-container">
    <p class="welcome-text">
      <b>Welcome to the Discover Da Vinci platform!</b>
      <br />Here you can win prizes for answering trivia questions. Users must have an
      <b>active ufl.edu email</b> and a
      <b>steem account</b> to participate.
    </p>
    <div class="btn-wrapper">
      <button class="home-btn login-btn" @click="$router.push('Login')"></button>
      <button class="home-btn signup-btn" @click="$router.push('SignUp')"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView"
};
</script>

<style scoped>
.home-container {
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

  padding: 0 10%;

  font-family: "Babas-Regular";
  font-size: 0.9em;
}

.btn-wrapper {
  position: absolute;
  top: calc(var(--inner-height) * (850 / 1920));
  bottom: calc(var(--inner-height) * (675 / 1920));
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
}

.home-btn {
  margin: auto;

  height: calc(var(--inner-height) * (110 / 1920));
  width: calc(100% * (350 / 1080));

  max-width: 300px;

  border: none;
}

.home-btn:active {
  outline: none;
}

.login-btn {
  margin-bottom: calc(var(--inner-height) * (50 / 1920));

  background: url(../assets/btn_Login_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.signup-btn {
  margin-top: 0;

  background: url(../assets/btn_SignUp_Default.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

@media screen and (min-device-width: 536px) {
  .welcome-text {
    font-size: calc(536px * (40 / 1080));
  }
}
</style>