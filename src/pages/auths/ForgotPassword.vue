<template>
  <div class="container" :class="{ active: isActive }">
    <div class="form-container sign-in-container m-auto">
      <form>
        <div class="send-mail-success-message" v-if="sendMailSuccess">
          <h1>Thank you</h1>
          <br />
          <br />
          A reset password email has been sent to {{ email }}.<br />
          <br />
          Please use the reset link to update your password <br />
          <br />
          After that, you can sign in
          <router-link to="/signIn" class="fw-bold">HERE</router-link>
        </div>

        <div v-else>
          <h1 class="header-title text-4xl font-bold text-center">
            Forgot your password ?
          </h1>

          <form-validator
            labelClass="form-title font-bold text-left"
            label="Email"
            required
            name="email"
          >
            <input
              v-model="email"
              class="appearance-none border w-full px-3 text-gray-700 leading-tight focus:shadow-outline"
              type="email"
              placeholder="Enter your email"
            />
          </form-validator>

          <div class="mb-8">
            <GlobalErrorMessage />
          </div>

          <button
            class="font-bold form-button-auth w-full cursor-pointer"
            type="button"
            @click="sendPasswordResetEmail"
          >
            Send a reset
          </button>
        </div>
      </form>
    </div>

    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <div class="h-full flex items-center justify-center">
            <img src="@/assets/images/bg-auth.png" alt="" />
          </div>
        </div>
        <div class="overlay-panel overlay-right">
          <div class="h-full flex items-center justify-center">
            <img src="@/assets/images/bg-auth.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

// ===============STORE================
import { useAuthStore } from "@/stores/auth";

// ===============COMPONENTS================
import GlobalErrorMessage from "@/components/shared/GlobalErrorMessage.vue";
import FormValidator from "@/components/shared/FormValidator.vue";
import Svg from "@/components/svg/Svg.vue";

export default {
  components: {
    GlobalErrorMessage,
    Svg,
    FormValidator,
  },

  setup() {
    // =============REACTIVE=================
    const email = ref("");
    const sendMailSuccess = ref(false);

    // =============STORE=================
    const authStore = useAuthStore();

    // =============METHODS=================
    async function sendPasswordResetEmail() {
      const result = await authStore.sendPasswordResetEmailAction({
        email: email.value,
      });

      if (result.usersPasswordResetEmailSubmit) sendMailSuccess.value = true;
    }

    return {
      // Data
      email,
      sendMailSuccess,

      // Actions
      sendPasswordResetEmail,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

.container {
  width: 80% !important;
  height: 70%;
}

h1 {
  font-weight: bold;
  margin: 0;
  font-size: 36px;
}

button {
  font-weight: bold;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
}

form {
  background-color: #ffffff;
  height: 100%;
  width: 60%;
  margin: auto;
  margin-top: 90px;

  @media (max-width: 1600px) {
    margin-top: 10px;
  }

  .header-title {
    background: linear-gradient(
      to right,
      #434c9d,
      #0066af,
      #007cb3,
      #008eab,
      #009f9d,
      #4fac90
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 40px;
  }

  .social-button {
    display: flex;
    padding: 8px 15px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    align-self: stretch;
    border-radius: 10px;
    border: 1px solid #8280b4;

    .auth-with-google {
      color: #000;
      font-size: 14px;
      font-family: "Quicksand", sans-serif;
      font-weight: 700;
    }
  }

  .divider {
    color: #6a6969;
    width: 100%;
    font-size: 12px;
    font-family: "Quicksand", sans-serif;
    padding: 0 8px;
    margin: 28px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before,
    &::after {
      content: "";
      height: 1px;
      flex: 1;
      background: #888;
    }

    &:before {
      margin-right: 8px;
    }

    &:after {
      margin-left: 8px;
    }
  }

  input {
    background-color: #f1f1f1;
    border: 1px solid #8280b4;
    padding: 12px 15px;
    width: 100%;

    &::placeholder {
      font-size: 14px;
    }

    &:focus {
      border: none;
      border-width: 2px;
      border-image: linear-gradient(to right, #434c9d, #38b1a6);
      border-image-slice: 1;
    }
  }

  input[type="checkbox"] {
    margin-bottom: 0;
  }

  .form-remember-me {
    margin-top: 20px;
    margin-bottom: 24px;

    .form-checkbox-title,
    .forgot-pwd {
      margin-left: 4px;
      font-size: 12px;
      font-family: "Quicksand", sans-serif;
    }
  }

  .form-button-auth {
    color: #fff;
    font-size: 16px;
    border-radius: 30px;
    padding: 8px 0;
    background-image: linear-gradient(to right, #434c9d, #38b1a6);
    margin-bottom: 30px;
  }

  .form-footer {
    color: #000;
    font-size: 12px;
    font-family: "Quicksand", sans-serif;
  }

  &.form-register {
    margin: auto;
    margin-top: 30px;

    .header-title {
      margin-bottom: 30px;
    }

    input[type="checkbox"] {
      width: unset;
    }

    .form-agree {
      margin-top: 20px;
      margin-bottom: 20px;

      .form-checkbox-title {
        margin-left: 4px;
        font-size: 12px;
        font-family: "Quicksand", sans-serif;
      }
    }

    .form-button-auth {
      margin-bottom: 20px;
    }

    .divider {
      margin: 20px 0;
    }
  }
}

.container {
  border-radius: 50px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  max-width: 100%;
  min-height: 480px;

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;

    &.sign-in-container {
      left: 0;
      width: 50%;
      z-index: 2;
    }

    &.sign-up-container {
      left: 0;
      width: 50%;
      opacity: 0;
      z-index: 1;
    }
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;

    .overlay {
      opacity: 0.9;
      position: relative;
      left: -100%;
      height: 100%;
      width: 200%;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;

      .overlay-panel {
        // background-image: url("@/assets/images/bg-auth.png") !important;
        background-color: #e4e8f4;
        position: absolute;
        padding: 0 40px;
        top: 0;
        height: 100%;
        width: 50%;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;

        &.overlay-right {
          right: 0;
          transform: translateX(0);
        }
      }
    }
  }

  &.active {
    .sign-in-container {
      transform: translateX(100%);
    }

    .sign-up-container {
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
      animation: show 0.6s;
    }

    .overlay-container {
      transform: translateX(-100%);
    }

    .overlay {
      transform: translateX(50%);
    }

    .overlay-left {
      transform: translateX(0);
    }

    .overlay-right {
      transform: translateX(20%);
    }
  }
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

:deep(.form-title) {
  padding: unset;
  display: block;
  color: #000;
  font-size: 14px;
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 8px;
}

.send-mail-success-message {
  h1 {
    font-size: 36px;
    font-weight: bold;
  }

  background: linear-gradient(
    to right,
    #434c9d,
    #0066af,
    #007cb3,
    #008eab,
    #009f9d,
    #4fac90
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 40px;
  font-size: 20px;
  text-align: center;
}

.fw-bold {
  font-weight: bold;
}
</style>
