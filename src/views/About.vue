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
                  :key="valute.cc"
              >
                <td @click="addFavorite(valute)" v-bind:class="{ active: showMobileMenu }">
                  favorite
                </td>
                <td @click.stop="openChartModal(valutes)">
                  {{ valute.cc }}
                </td>
                <ChartModal v-model="showChartModal" :currency="valutes"/>
                <td>{{ valute.txt }}</td>
                <td>{{ valute.rate }}</td>
              </tr>
              </tbody>
            </template>

            <div class="text-center">


            </div>
          </v-simple-table>



            <div class="d-flex" style="min-width: 350px; border: 1px solid red; padding: 10px">

              <v-col>
                <v-flex class="d-flex justify-center">
                  <h3>Favorite Rates</h3>
                </v-flex>
              <ul v-for="favorite in favorites">
                <li>{{ favorite.cc }} {{ favorite.name }}
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


      <!--      <div v-if="showChartModal">-->
      <!--        teteyehdfncvkgkhljk-->
      <!--      </div>-->

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
    toggle() {
      // console.log('test')
    },
    openChartModal(valutes) {
      // console.log('test')
      this.valutes = currency;
      this.showChartModal = true
    },
    addFavorite(valute) {
      // this.showMobileMenu = !this.showMobileMenu

      let newFavorite = {
        name: valute.txt,
        cc: valute.cc
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

<style lang="scss">
.favoriting {
  display: inline-block
}

.favorite__heart {
  display: inline-block;
  padding: 3px;
  vertical-align: middle;
  line-height: 1;
  font-size: 16px;
  color: #ABABAB;
  cursor: pointer;
  -webkit-transition: color .2s ease-out;
  transition: color .2s ease-out;
}

.favorite__heart.is-disabled:hover {
  cursor: default;
}

.favorite__checkbox {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

.favorite__heart__selected {
  color: #df470b;
}

.showMobileMenu,
.active{
  color: red;
}
</style>
