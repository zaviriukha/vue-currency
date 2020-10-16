<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
        />

        <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <div id="nav">
        <router-link to="/">Currency Converter</router-link>
        |
        <router-link to="/about">Currency Rates</router-link>
      </div>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},

  data: () => ({}),
};
</script>

<style lang="scss">
#nav a {
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 14px;

  &:hover{
    color: aqua;
  }
}
</style>
