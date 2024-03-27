<template>
  <footer class="footer relative mt-24">
    <img
      class="icon-noti"
      src="@/assets/images/icon_notification.png"
      alt="icon notification"
    />
    <Svg iconName="BottomWave" class="w-full h-auto svg-bot-wave"></Svg>
    <div class="footer-info">
      <img
        class="footer-icon"
        src="@/assets/images/logo_footer.png"
        alt="icon"
      />
      <a
        href="https://behemoth.vn/"
        class="text-white text-[10px] md:text-sm pt-1 md:pt-2 font-bold link-website"
      >
        www.behemoth.vn
      </a>
      <button
        class="flex items-center border-2 border-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] btn-credit-page"
        @click="goToCredit"
      >
        Go to credit page <Svg iconName="PointerHeart"></Svg>
      </button>
    </div>
  </footer>
</template>
<script>
import Svg from "@/components/svg/Svg.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    Svg,
  },

  setup() {
    const router = useRouter();

    function goToCredit() {
      router.push("/credit");
    }

    return {
      goToCredit,
    };
  },
};
</script>
<style lang="scss" scoped>
.icon-noti {
  position: absolute;
  top: -95px;
}
.svg-bot-wave {
  margin-top: 100px;
}

.footer-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, 0);
  .footer-icon {
    max-width: 100%;
    height: auto;
  }
  .link-website {
    &:hover {
      color: #434c9d;
    }
  }
  .btn-credit-page {
    color: #434c9d;
    padding: 10px;
    margin-top: 12px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    svg {
      margin-left: 10px;
    }
    &:hover {
      background-color: white;
    }
  }
}
@media (max-width: 1536px) {
  .icon-noti {
    top: -85px;
    width: 180px;
  }
}

@media (max-width: 1280px) {
  .icon-noti {
    top: -75px;
    width: 150px;
  }
}

@media (max-width: 768px) {
  .icon-noti {
    top: -60px;
    width: 100px;
  }
  .footer-info {
    bottom: 5px;
    .footer-icon {
      width: 60px;
    }
    .btn-credit-page {
      padding: 4px;
      margin-top: 4px;
      font-size: 12px;
      svg {
        width: 16px;
        margin-left: 4px;
      }
    }
  }
}
</style>
