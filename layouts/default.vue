<template>
  <div id="app">
    <modal-popup />
    <client-only>
      <sol-wallet />
      <nav-bar />
    </client-only>
    <Nuxt />
    <nos-footer />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import SolWallet from '@/components/SolWallet';

export default {
  components: {
    NavBar,
    SolWallet
  }
};
</script>

<style lang="scss">
html {
  min-height: 100vh;
  background-size: cover;
}
</style>
