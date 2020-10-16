<template>
  <v-container fluid>
    <v-layout row wrap>

      <v-col cols="10" md="12" lg="9" xl="6" class="bg--light mx-auto">
        <v-flex class="d-flex justify-center">
          <h1>Currency Rates</h1>
        </v-flex>

        <v-row class="justify-center">
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
                <td @click="toggle">
                  <v-item v-model="selected" v-slot:default="{ active, toggle }">
                    <v-btn
                        icon
                        dark
                    >
                      <v-icon >
                        {{ active ? 'mdi-heart' : 'mdi-heart-outline ' }}
                      </v-icon>
                    </v-btn>
                  </v-item>
                </td>
                <td>{{ valute.cc }}</td>
                <td>{{ valute.txt }}</td>
                <td>{{ valute.rate }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-row>

      </v-col>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valutes: {},
      selected: []
    }
  },
  async mounted() {
    this.valutes = await this.$store.dispatch('fetchCurrency')
  },
  methods: {
    toggle() {
      console.log('test')
    }
  }
}
</script>
