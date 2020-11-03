<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-col cols="10" md="12" lg="9" xl="6" class="bg--light mx-auto">
        <v-flex class="d-flex justify-center mb-5">
          <h1>Currency Rates</h1>
        </v-flex>

        <v-row class="justify-space-between">
          <v-col cols="12" md="6" class="pt-0">
            <v-simple-table
                fixed-header
                height="400px"
            >
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-left text-uppercase">
                    code
                  </th>
                  <th class="text-left text-uppercase">
                    name
                  </th>
                  <th class="text-left text-uppercase">
                    rate
                  </th>
                  <th class="text-left text-uppercase">
                    favorite
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="valute in valutes"
                    :key="valute[0]"
                >
                  <td>{{ valute[0] }}</td>
                  <td @click.stop="openChartModal(valute)">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <span
                            v-bind="attrs"
                            v-on.stop="on"
                        >{{ valute[1].txt }}</span>
                      </template>
                      <span>Open chart</span>
                    </v-tooltip>
                  </td>
                  <td>{{ valute[1].rate }}</td>
                  <td>
                    <v-btn @click="addFavorite(valute)" color="primary" fab x-small>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                  </td>
                </tr>
                <ChartModal v-model="showChartModal" :currency="currency"/>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>

          <v-col cols="12" md="5" class="pa-5 fav-block">
            <v-flex class="d-flex justify-center">
              <h3>Favorite Rates</h3>
            </v-flex>
            <ul v-for="favorite in favorites" class="pl-0">
              <li class="d-flex my-3 justify-space-between">
                <div> {{ favorite.cc }} - {{ favorite.name }}</div>
                <div>
                  <v-btn class="ml-3"
                         color="primary"
                         fab
                         x-small
                         @click="deleteFavorite(favorite)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </li>
            </ul>
          </v-col>
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
      favoriteCurrencyList: []
    }
  },
  async mounted() {
    let storageItem = JSON.parse(localStorage.getItem("favorites"));
    if(storageItem === null)
    {
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    }
    await this.favOrdering()
  },
  methods: {
    openChartModal(valute) {
      this.currency = valute[1];
      this.showChartModal = true
    },

    async addFavorite(valute) {
      let newFavorite = {
        name: valute[1].txt,
        cc: valute[0],
      }
      let ind = this.favorites.find((obj) => {
        return obj.cc === newFavorite.cc
      })
      if (typeof (ind) === 'undefined') {
        this.favorites.push(newFavorite);
      }
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
      await this.favOrdering()
    },

    async deleteFavorite(favorite) {
      let index = this.favorites.indexOf(favorite)
      this.favorites.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
      await this.favOrdering()
    },

    async favOrdering() {
      this.favorites = JSON.parse(localStorage.getItem("favorites"));
      this.valutes = await this.$store.dispatch('fetchCurrency')
      let favRates = new Map()
      let otherRates = new Map()
      this.valutes.forEach(val => {
        let ind = this.favorites.find((obj) => {
          return obj.cc === val.cc
        })
        if (typeof (ind) === 'undefined') {
          otherRates.set(val.cc, val);
        } else {
          favRates.set(val.cc, val);
        }
      })
      this.valutes = new Map([...favRates, ...otherRates]);
    }
  }
}
</script>

<style lang="scss">
.favorite {
  color: #ee44aa !important;
}

.fav-block {
  border: 1px solid #ff0000;
  max-height: 400px;
  position: relative;
  overflow-y: scroll;
}
</style>
