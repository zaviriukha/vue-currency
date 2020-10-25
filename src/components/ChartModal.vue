<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        {{ currency.txt }}
      </v-card-title>

      <v-card-text>
        <div class="my-3">
          Selected currency: <strong>{{ currency.cc }}</strong>
        </div>
        <div>
          <LineChart :width="400" :height="300"
                     :chartData="datacollection" />
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.stop="show=false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Chart from 'chart.js';
import LineChart from "@/components/LineChart";

export default {
  name: "ChartModal",
  components: {LineChart},
  data: () => ({
    datacollection: null,
    options: {
              elements: {
                line: {
                  tension: 0 // disables bezier curves
                }
              },
    }
  }),
  props: {
    value: Boolean,
    currency: Object
  },
  computed: {
    show: {
      get() {
        this.fillCollection()
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },

    }

  },
  mounted () {
  },
  methods:{
    fillCollection(){
      this.datacollection = {

        labels: ['1','2','3'],
        datasets: [
          {
            label: this.currency.cc,
            lineTension:0,
            backgroundColor: '#f87979',
            data: [this.currency.rate, this.currency.rate + 1, this.currency.rate-1],
          },
        ],

      }
    },
  },


}
</script>

<style scoped lang="scss">
</style>
