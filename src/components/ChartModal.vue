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
                     :chartData="datacollection"/>
        </div>

        <v-btn color="primary" @click="lastSevenDays">Close</v-btn>
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
    weekDays: []
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
    },
    lastSevenDays() {
      let lastWeek = new Map()
      let curentDay = new Date;
      const format = "YYYYMMDD"

      for (let i = 6; i >= 0; i--) {
        let dt = new Date;
        dt = dt.setDate(curentDay.getDate() - i);
        lastWeek.set(dt,i)

        let week = moment(dt).format(format)
        // lastWeek.push( curentDay.getDay( curentDay.setDate( curentDay.getDate()-i ) ) );
        //lastWeek.push( curentDay.getDate(curentDay.setDate( curentDay.getDate()-i )));
        // console.log(dt)
        // console.log(moment(dt).format(format))
        console.log(week)
      }


      // curentDay.setDate(curentDay.getDate()-7);
      // console.log(curentDay)
    }
  },
  mounted() {
  },
  methods: {
    fillCollection() {
      this.datacollection = {

        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
            label: this.currency.cc,
            lineTension: 0,
            backgroundColor: '#f87979',
            data: [this.currency.rate, this.currency.rate + 1, this.currency.rate - 1],
          },
        ],
      }
    },


  },


}
</script>

<style scoped lang="scss">
</style>
