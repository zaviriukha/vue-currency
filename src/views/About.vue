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
                  :class="{ active: valute[0] === isFavorite}"
              >
                <td @click="addFavorite(valute)" v-model="favoriteFlag" v-bind:class="{ active: showMobileMenu }">
                  <v-icon :class="{'favorite' : isFavorite}">mdi-cards-heart</v-icon>
                </td>
                <td @click.stop="openChartModal(valute)">
                  {{ valute[0] }}
                </td>
                <td>{{ valute[1].txt }}</td>
                <td>{{ valute[1].rate }}</td>
              </tr>
              <ChartModal v-model="showChartModal" :currency="currency"/>
              </tbody>
            </template>

          </v-simple-table>

          <div class="d-flex" style="min-width: 350px; border: 1px solid #ff0000; padding: 10px">
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
                      @click="deleteFavorite(favorite)"
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
      showMobileMenu: false,
      favoriteFlag: false,
      favoriteCurrencyList: [],
      isFavorite: false
    }
  },
  async mounted() {
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
      if(typeof(ind) ==='undefined')
      {
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

    async favOrdering(){
      this.favorites = JSON.parse(localStorage.getItem("favorites"));
      this.valutes = await this.$store.dispatch('fetchCurrency')
      let favRates = new Map()
      let otherRates = new Map()
      this.valutes.forEach(val=>{
        let ind = this.favorites.find((obj) => {
          return obj.cc === val.cc
        })
        if(typeof(ind) ==='undefined')
        {
          otherRates.set(val.cc, val);
        }
        else{
          favRates.set(val.cc, val);
        }
      })
      this.valutes = new Map([...favRates,...otherRates]);
    }
  }
}
</script>

<style lang="scss">
.favorite {
  color: #ee44aa!important;
}
</style>
