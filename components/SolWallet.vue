
<template>
  <span>
    <div class="modal" :class="{ 'is-active': $sol.loginModal }">
      <div
        class="modal-background"
        @click="
          $sol.loginModal = false;
          error = null;
        "
      />
      <div class="modal-card">
        <div v-if="error || solError" class="notification is-danger">
          <button class="delete" @click="error = null; solError = null" />
          {{ error }}
          <h2 class="subtitle">{{ solError.name }}</h2>
          <!-- eslint-disable-next-line -->
          <p v-html="solError.message" />
        </div>
        <header class="modal-card-head">
          <p class="modal-card-title">
            <span v-if="loggedIn">Your Account</span>
            <span v-else>Connect Solana Wallet</span>
          </p>
          <button
            class="delete"
            aria-label="close"
            @click="
              $sol.loginModal = false;
              error = null;
            "
          />
        </header>
        <section class="modal-card-body">
          <div v-if="loading" class="loader-wrapper is-active">
            <div class="loader is-loading" />
          </div>
          <div v-if="loggedIn">
            <div v-if="!$auth.loggedIn" class="has-text-centered has-text-black">
              <div class="block">
                <b class="has-text-black">Selected account</b>
                <a
                  :href="$sol.explorer + '/address/' + publicKey"
                  target="_blank"
                  class="blockchain-address"
                >{{ publicKey }}</a>
                <a
                  class="has-text-danger"
                  @click="
                    $sol.switch();
                    error = null;
                  "
                >
                  <small class="is-size-7">Switch Wallet</small>
                </a>
              </div>
              <p class="block">
                Login by verifying your address. This does not cost any
                transaction fees
              </p>
              <div class="has-text-centered">
                <a class="button is-accent is-wide" :disabled="isDisabled" @click="login">
                  <small class="is-size-7">Login</small>
                </a>
              </div>
            </div>
            <div v-else>
              <nuxt-link
                class="button is-accent px-5"
                to="/account"
                exact-active-class="is-active"
                @click="
                  $sol.loginModal = false;
                  error = null;
                "
              >
                <div>My Account</div>
              </nuxt-link>

              <div class="has-text-right">
                <a
                  class="has-text-danger is-small"
                  style="border-radius: 6px"
                  @click="$sol.logout()"
                >Logout</a>
              </div>
            </div>
          </div>
          <div v-else>
            <div v-for="wallet in $sol.wallets" :key="wallet.name" class="my-2">
              <div
                class="button is-medium is-justify-content-flex-start is-outlined is-fullwidth has-text-weight-semibold"
                @click="selectWallet(wallet)"
              >
                <span class="icon mr-5">
                  <img :src="wallet.icon">
                </span>
                <span>
                  <small v-if="wallet.readyState === 'NotDetected'" />
                  {{ wallet.name }}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </span>
</template>

<script>
import { PublicKey } from '@solana/web3.js';

export default {
  data () {
    return {
      loading: false,
      error: null,
      isDisabled: false
    };
  },
  computed: {
    publicKey () {
      return this.$sol ? this.$sol.publicKey : null;
    },
    loggedIn () {
      return this.$sol && this.$sol.publicKey;
    },
    solError () {
      return this.$sol && this.$sol.error;
    }
  },

  methods: {
    async login () {
      this.isDisabled = true;
      try {
        const timestamp = Math.floor(+new Date() / 1000);
        const signature = await this.$sol.sign(timestamp);
        const response = await this.$auth.loginWith('local', {
          data: {
            address: new PublicKey(this.publicKey).toBuffer(),
            signature,
            timestamp,
            referrer: this.$route.query.ref
          }
        });
        console.log('Logged in!', response);
        this.$sol.loginModal = false;
        this.error = null;
        // Needed because there is a redirect bug when going to a protected route from the login page
        const path = this.$auth.$storage.getUniversal('redirect') || '/';
        this.$auth.$storage.setUniversal('redirect', null);
        this.$router.push(path);
      } catch (error) {
        console.error('ERR', error);
        if (error.response && error.response.data) {
          if (error.response.data.error) {
            this.error = error.response.data.error;
          } else {
            this.error = error.response.data;
          }
        } else if (error.message) {
          this.error = error.message;
        } else {
          this.error = error;
        }
      }
      this.isDisabled = false;
    },
    async selectWallet (adapter) {
      if (adapter.readyState === 'NotDetected') {
        window.open(adapter.url);
      } else {
        try {
          this.error = null;
          this.$sol.error = null;
          await this.$sol.connect(adapter);
        } catch (error) {
          this.error = error;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-card {
  max-width: 400px;
}
</style>
