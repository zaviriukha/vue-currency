<template>
  <v-container fluid>
    <v-layout row wrap>

      <v-col cols="10" md="12" lg="9" xl="6" class="bg--light mx-auto">
        <v-flex class="d-flex justify-center">
          <h1>Currency Converter</h1>
        </v-flex>

        <v-row justify="space-between" no-gutters>
          <v-col cols="12" md="5">
            <v-row no-gutters>
              <v-col class="px-1" cols="3">
                <v-select @change="convert" v-model="selected[0]" :items="ccyCodes" label="I have"></v-select>
              </v-col>
              <v-col class="px-1" cols="9">
                <v-text-field @input="convert" v-model="inputed"></v-text-field>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="5">
            <v-row no-gutters>
              <v-col class="px-1" cols="9">
                <v-text-field v-model="result" type="number" readonly></v-text-field>
              </v-col>
              <v-col class="px-1" cols="3">
                <v-select @change="convert" v-model="selected[1]" :items="ccyCodes" label="I buy"></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      valutes: {},
      selected: ['UAH', 'USD'],
      inputed: "",
      result: null,
      ccyCodes: ['UAH'],
    }
  },
  methods: {
    convert() {
      let defaultValute = {
        rate: 1,
      };

      let firstValute = this.valutes.get(this.selected[0]) ?? defaultValute,
          firstValuteValue = firstValute.rate * Number(this.inputed);

      let secondValute = this.valutes.get(this.selected[1]) ?? defaultValute,
          secondValuteValue = secondValute.rate;

      let result = (firstValuteValue) / (secondValuteValue);

      this.result = result ? Math.floor(result * 10000) / 10000 : null;
    },
  },
  async mounted() {
    this.valutes = await this.$store.dispatch('fetchCurrency')

    let valutes = []
    for (let pair of this.valutes) {
      valutes.push(pair[0])
    }

    this.ccyCodes = this.ccyCodes.concat(valutes);
  },
}
</script>
