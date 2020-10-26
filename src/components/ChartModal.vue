<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        {{ currency.txt }} ({{ currency.cc }})
      </v-card-title>

      <v-card-text>
        <v-row class="mt-2">
          <v-select v-model="sortType" v-on:change="sortItem()" filled
                    label="Select Limits" :items="sortItems" item-value="value" item-text="text"
                    dense>
          </v-select>
        </v-row>

        <v-spacer></v-spacer>

        <div>
          <LineChart :width="400" :height="300"
                     :chartData="datacollection"/>
        </div>
<!--        <v-btn color="primary" @click="lastMonthRate">Close</v-btn>-->
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
    weekDays: [],
    sortType: {
      value: "week",
      text: "Week"
    },
    sortItems: [
      {
        value: "week",
        text: "Week"
      },
      {
        value: "month",
        text: "Month"
      },
      {
        value: "year",
        text: "Year"
      }
    ]
  }),
  props: {
    value: Boolean,
    currency: Object
  },
  computed: {
    show: {
      get() {
        if(this.value===true){
          this.weekRates()
        }
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    }
  },
  mounted() {},
  methods: {
    async weekRates() {
      let lastWeek = new Map();
      let currentDay = new Date;
      const format = "YYYYMMDD";

      for (let i = 6; i >= 0; i--) {
        let dt = new Date;
        dt = dt.setDate(currentDay.getDate() - i);
        let stringDate = moment(dt).format(format);
        let rate = await this.$store.dispatch('fetchRateOnDate', [stringDate, this.currency.cc]);
        lastWeek.set(stringDate, rate);
        this.fillCollection(lastWeek)
      }
    },

    async halfYearRate(){
      let halfYear = new Map();
      let currentMonth = new Date;
      const format = "YYYYMMDD";

      for (let i = 6; i >= 0; i--) {
        let dt = new Date;
        dt = dt.setMonth(dt.getMonth() - i);
        let stringHalfYear = moment(dt).format(format);
        let halfYearRate = await this.$store.dispatch('fetchRateOnDate', [stringHalfYear, this.currency.cc]);
        halfYear.set(stringHalfYear, halfYearRate);
        this.fillCollection(halfYear)
      }
    },

    async lastMonthRates() {
      let lastMonth = new Map();
      let currentDayMonth = new Date;
      let prevDayMonth = new Date;
      const format = "YYYYMMDD";

      prevDayMonth.setMonth(prevDayMonth.getMonth() - 1);

      let dd = (currentDayMonth - prevDayMonth) / 1000 / 60 / 60 / 24;
      for (let i=dd; i >= 0; i--) {
        let dt = new Date;
        dt = dt.setDate(dt.getDate() - i);
        let stringDate = moment(dt).format(format);
        let rate = await this.$store.dispatch('fetchRateOnDate', [stringDate, this.currency.cc]);
        lastMonth.set(stringDate, rate);
        this.fillCollection(lastMonth)
      }
    },

    fillCollection(rateMap) {
      this.datacollection = {
        labels: [],
        datasets: [
          {
            label: this.currency.cc,
            lineTension: 0,
            backgroundColor: '#f87979',
            data: [],
          },
        ],
      }
      let labels = [];
      let data =[];
      for (let pair of rateMap) {
        labels.push(pair[0]);
        data.push(pair[1]);
      }
      this.datacollection.labels = labels;
      this.datacollection.datasets[0].data = data;
    },
    sortItem() {
      if (this.sortType === 'week') {
        this.weekRates();
      }
      if (this.sortType === 'month') {
        this.lastMonthRates();
      }
      if (this.sortType === 'year') {
        this.halfYearRate();
      }
    }

  },


}
</script>

<style scoped lang="scss">
</style>
