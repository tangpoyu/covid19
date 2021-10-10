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
      'https://covid-19.nchc.org.tw/myDT_staff.php?TB_name=owl_world&limitColumn=a01&limitValue=TW%&equalValue=%20like%20&encodeKey=MTYzMzM1Njc4MA==&c[]=id&t[]=int&d[]=NO&c[]=a01&t[]=varchar&d[]=NO&c[]=a02&t[]=varchar&d[]=NO&c[]=a03&t[]=varchar&d[]=NO&c[]=a04&t[]=date&d[]=NO&c[]=a05&t[]=int&d[]=NO&c[]=a06&t[]=int&d[]=NO&c[]=a07&t[]=decimal&d[]=NO&c[]=a08&t[]=int&d[]=NO&c[]=a09&t[]=int&d[]=NO&c[]=a10&t[]=decimal&d[]=NO&c[]=a11&t[]=decimal&d[]=NO&c[]=a12&t[]=decimal&d[]=NO&c[]=a13&t[]=decimal&d[]=NO&c[]=a14&t[]=int&d[]=NO&c[]=a15&t[]=int&d[]=NO&c[]=a16&t[]=decimal&d[]=NO&c[]=a17&t[]=decimal&d[]=NO&c[]=a18&t[]=decimal&d[]=NO&c[]=a19&t[]=decimal&d[]=NO&c[]=a20&t[]=int&d[]=NO&c[]=a21&t[]=int&d[]=NO&c[]=a22&t[]=int&d[]=NO&c[]=a23&t[]=decimal&d[]=NO&c[]=a24&t[]=decimal&d[]=NO&c[]=a25&t[]=decimal&d[]=NO&c[]=a26&t[]=decimal&d[]=NO&c[]=a27&t[]=int&d[]=NO&c[]=a28&t[]=decimal&d[]=NO&c[]=a29&t[]=decimal&d[]=NO&c[]=a30&t[]=decimal&d[]=NO&c[]=a31&t[]=int&d[]=NO&c[]=a32&t[]=decimal&d[]=NO'
    )
    data=data.data.slice(data.data.length-30)
    
    data.forEach((item) => {
      const date=item.a04
      const{
      a05,
      a06,
      a08,
      } = item
      this.arrEverydaySuffer.push({date:date, suffer: a06})
      this.arrTotalSuffer.push({date:date, suffer: a05})
      this.arrTotalDeath.push({date:date, suffer: a08})
    })
    
    console.log(this.arrEverydaySuffer)
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