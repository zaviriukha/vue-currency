<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div class="d-flex align-center">
        <div class="header-brand">
          <h2 class="size-lg">The Currency Operations</h2>
        </div>
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

.header-brand{
  .size-lg{
    font-size: 1.2rem;
    color: white;
  }
}
</style>
