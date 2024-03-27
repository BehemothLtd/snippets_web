<template>
  <div class="credit-page">
    <img
      class="snippets-icon lg:block hidden"
      src="@/assets/images/icon_circle.png"
      alt="icon"
    />
    <img
      src="@/assets/images/credit-page-banner.png"
      alt="Banner"
      class="credit-banner"
    />
    <div class="credit-title">The Team</div>
    <div class="credit-content">
      <ul class="credit-fullname inline-block">
        <li
          v-for="(item, index) in infors"
          :key="index"
          class="text-right uppercase"
        >
          {{ item.fullName }}
        </li>
      </ul>
      <ul class="credit-name inline-block">
        <li
          v-for="(item, index) in infors"
          :key="index"
          class="text-left uppercase font-bold"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infors: [
        {
          id: 1,
          name: "bachdx",
          fullName: "duong xuan bach",
        },
        {
          id: 2,
          name: "cuongdv",
          fullName: "dam van cuong",
        },
        {
          id: 3,
          name: "manhdx",
          fullName: "duong xuan manh",
        },
        {
          id: 4,
          name: "thaodtt",
          fullName: "dao thi thu thao",
        },
        {
          id: 5,
          name: "anhnm",
          fullName: "nguyen minh anh",
        },
        {
          id: 6,
          name: "anhdt",
          fullName: "do tuan anh",
        },
        {
          id: 7,
          name: "thangnt",
          fullName: "nguyen trong thang",
        },
        {
          id: 8,
          name: "kienvt",
          fullName: "vu trung kien",
        },
        {
          id: 9,
          name: "hung",
          fullName: "ta viet hung",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.credit-page {
  position: relative;
  .snippets-icon {
    position: absolute;
    top: -60px;
    left: -125px;
    width: 150px;
  }
  .credit-banner {
    width: 600px;
  }
  .credit-title {
    font-size: 32px;
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    padding: 32px 0;
  }
  .credit-content {
    display: flex;
    justify-content: center;
    gap: 24px;
  }
}
</style>
