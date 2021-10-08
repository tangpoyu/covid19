<template>
  <v-app>
    <v-main>
      <h1>COVID-19 Tracking Dashboard of Taiwan</h1>
       <v-row >
              <v-col cols="12" v-if="arrEverydaySuffer.length">
                <LineChart
                  label="近30日確診人數追蹤"
                  :chartData="arrEverydaySuffer"
                  :options="chartOptions"
                  :chartColorOptions="{
                    borderColor: '#FFD700',
                    backgroundColor: '#FFFFE0',
                   
                  }"
                  
                />
              </v-col>
            </v-row>
    </v-main>
  </v-app>
</template>

<style>
.v-application--wrap{
  background-color: rgba(241, 236, 156, 0.445);
}
h1{
  color: rgb(0, 0, 0);
  text-align: center;
} 
.row{
  color: aliceblue;
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
      arrEverydaySuffer: [],
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
      a06
      } = item
      this.arrEverydaySuffer.push({date:date, suffer: a06})
    })
    
    console.log(this.arrEverydaySuffer)
  },
}
</script>