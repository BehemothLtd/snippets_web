<template>
  <div class="page">
    <Header />

    <div class="container m-auto">
      <slot></slot>
    </div>

    <Footer />
  </div>
</template>
<script>
import Footer from "@/components/shared/Footer.vue";
import Header from "@/components/shared/Header.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.page {
  background-color: #f0edff;
}
</style>
