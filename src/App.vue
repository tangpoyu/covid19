<template>
  <v-app>
    <v-main>
      <h1>COVID-19 Tracking Dashboard of Taiwan</h1>

      <v-tabs v-model="tab">
      <v-tab 
          v-for="chartData in renderData" 
          :key="chartData.id" 
          :href="`#${chartData.label}`">
        {{ chartData.label }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="chartData in renderData"
            :key="chartData.id"
            :value="chartData.label"
          >
            <v-card flat>
              <v-row v-if="arrEverydaySuffer.length">
                <v-col cols="12">
                  
                  <LineChart
                    :chartData="chartData.data"
                    :options="chartOptions"
                    :label="chartData.label"
                    :chartColorOptions="chartData.chartColorOptions"
                  />
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
 
    </v-main>
  </v-app>
</template>

<style>

h1{
  color: rgb(0, 0, 0);
  text-align: center;
} 
.row{
  color: aliceblue;
}
h2{
  color: #000;
  margin-top: 20px;
}
</style>

<script>
import axios from 'axios'
import LineChart from './components/LineChart'

export default {
  name: 'App',

  components: {
     LineChart,
  },
  data() {
    return {
    
      tab: null,
      
      labels: [
       'everydaySuffer',
       'totalSuffer',
       'totalDeath'
 ],
      arrEverydaySuffer: [],
      arrTotalSuffer:[],
      arrTotalDeath: [],
      chartOptions: {  // 新增這裡
        responsive: true,
        maintainAspectRatio: false,
        legend: {
                labels: {
                    fontColor: "rgb(0, 0, 0)",
                    fontSize: 18
                }
            },
      },
      
    }
  },
  async created() {
    
    let { data } = await axios.get(
      'https://server-getdada.herokuapp.com/everydaySuffer'
    )
    this.arrEverydaySuffer = data

    data = await axios.get(
      'https://server-getdada.herokuapp.com/totalSuffer'
    )
    this.arrTotalSuffer=data.data
    
    
    data = await axios.get(
      'https://server-getdada.herokuapp.com/death'
    )
    this.arrTotalDeath=data.data
    console.log(this.arrTotalSuffer)
    console.log(this.arrTotalDeath)
    console.log(this.arrEverydaySuffer)
    // data = await axios.get(
    //   'https://server-getdada.herokuapp.com/death'
    // )
    // this.arrTotalDeath = data
    // data.forEach((item) => {
    //   const date=item.a04
    //   const{
    //   a05,
    //   a06,
    //   a08,
    //   } = item
    //   this.arrEverydaySuffer.push({date:date, suffer: a06})
    //   this.arrTotalSuffer.push({date:date, suffer: a05})
    //   this.arrTotalDeath.push({date:date, suffer: a08})
    // })
    
    // console.log(this.arrEverydaySuffer)
  },
  computed:{
    renderData() {
      // 利用解構的方式從this中取出我們要用到的所有陣列
      const {
        arrEverydaySuffer,
        arrTotalSuffer,
        arrTotalDeath,
        labels
      } = this
      
      // 建立所有的labels
      
      
      // 將所有要輸出的陣列整理為一個，做為最終迭代的對象
      const displayedDataArr = [
        arrEverydaySuffer,
        arrTotalSuffer,
        arrTotalDeath
      ]
      
      // 設置每個圖表的背景與邊界顏色
      const chartColorOptions = [
        {
          borderColor: '#EF5350',
          backgroundColor: 'rgba(255, 56, 96, 0.1)',
        },
        {
          borderColor: '#FFF176',
          backgroundColor: 'rgba(191, 182, 63, 0.1)',
        },
        {
          borderColor: '#FFB74D',
          backgroundColor: 'rgba(239, 109, 9, 0.1)',
        },
       
      ]
      
      // 最終整理成一個陣列，每一個元素都包含標籤名稱、資料以及圖表顏色的設定
      return displayedDataArr.map((data, index) => ({
        label: labels[index],
        data,
        chartColorOptions: chartColorOptions[index],
      }))
    },
  }
}
</script>