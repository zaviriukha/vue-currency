<template>
  <v-container fluid>
    <v-layout row wrap>

      <v-col cols="10" md="12" lg="9" xl="6" class="bg--light mx-auto">
        <v-flex class="d-flex justify-center">
          <h1>Currency Rates</h1>
        </v-flex>

        <v-row class="justify-space-between">
          <v-simple-table
              fixed-header
              height="450px"
          >
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  favorite
                </th>
                <th class="text-left">
                  cc
                </th>
                <th class="text-left">
                  txt
                </th>
                <th class="text-left">
                  rate
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="valute in valutes"
                  :key="valute[0]"
              >
                <td @click="addFavorite(valute)" v-bind:class="{ active: showMobileMenu }">
                  favorite
                </td>
                <td @click.stop="openChartModal(valute)">
                  {{ valute[0] }}
                </td>
                <td>{{ valute[1].txt }}</td>
                <td>{{ valute[1].rate }}</td>
              </tr>
              <ChartModal v-model="showChartModal" :currency="currency" />
              </tbody>
            </template>

          </v-simple-table>

          <div class="d-flex" style="min-width: 350px; border: 1px solid red; padding: 10px">
            <v-col>
              <v-flex class="d-flex justify-center">
                <h3>Favorite Rates</h3>
              </v-flex>
              <ul v-for="favorite in favorites">
                <li>{{ favorite.cc }} - {{ favorite.name }}
                  <v-btn
                      color="primary"
                      fab
                      x-small
                      @click="deleteFavorite"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </li>
              </ul>
            </v-col>
          </div>
        </v-row>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
import ChartModal from "@/components/ChartModal";

export default {
  components: {ChartModal},
  data() {
    return {
      valutes: {},
      currency: {},
      selected: [],
      dialog: false,
      showChartModal: false,
      showScheduleForm: false,
      favorites: [],
      favorite: {
        name: '',
        cc: ''
      },
      showMobileMenu: false
    }
  },
  async mounted() {
    this.valutes = await this.$store.dispatch('fetchCurrency')
  },
  methods: {
    openChartModal(valute) {
      this.currency = valute[1];
      this.showChartModal = true
    },
    addFavorite(valute) {
      let favorites = localStorage.getItem("favorites");
      favorites = (favorites) ? JSON.parse(favorites) : [];

      let newFavorite = {
        name: valute[1].txt,
        cc: valute[0]
      }
      this.favorites.push(newFavorite)
    },
    deleteFavorite() {
      let index = this.favorites.indexOf(1)
      this.favorites.splice(index, 1);
    }
  }
}
</script>

<style lang="scss"></style>
