<template>
   
    <v-card  
    class="mx-auto"
    max-width="344"
    :outlined="!isAlive"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-2 font-weight-bold">{{sensorData.name}}</div>
        <v-list-item-subtitle class="mb-1">{{sensorData.type}}</v-list-item-subtitle>
        <v-list-item-subtitle>23&deg;C/79&deg;F<br />45% Humidity</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar        
        size="80"
        color="grey"        
      >
        <v-img :src="image" />
      </v-list-item-avatar>
    </v-list-item>
    
    <v-list-item >
      <v-list-item-content>
        <div>
          <v-btn color="secondary" >View</v-btn>     
        </div>
      </v-list-item-content>

      <v-list-item-icon v-if="isAlive">
        <v-icon class="blink" color="secondary">mdi-radio-tower</v-icon>
      </v-list-item-icon>
       
    </v-list-item>
  </v-card>
</template>

<script>

const hbBuffer = 3000; // 3 seconds
var hbTimeout;

function isSensorActive(sensor) {
      var lc = new Date(sensor.lastHeartbeat);
      lc.setSeconds(lc.getSeconds() + sensor.heartbeatInterval);  
      var c = new Date();
      c.setSeconds(c.getSeconds() + (hbBuffer/1000));
      return ((c - lc) / 100 < 0);
}

export default {
    name: "SensorCard",
    props:{
        sensorData:Object
    },
    data:()=>({
      isAlive:false
    }),
    mounted (){   
      this.isAlive = isSensorActive(this.sensorData);
      this.onHeartbeatReceived();
    },
    methods: {
      onHeartbeatReceived: function(){ 
        clearTimeout(hbTimeout);
        hbTimeout = setTimeout(() => {this.isAlive = false; console.log('timeout')}, (this.sensorData.heartbeatInterval*1000)+hbBuffer);
      }
    },
    computed:{
      image: function() {   
        if (this.sensorData.type=='DHT22')
          return require('@/assets/dht22.jpg');        
        return require('@/assets/logo.png');
      },
      // cardColor: function() {      
      //   if (this.isAlive)
      //     return 'orange lighten-5';
      //   return '';
      // }   
    }

}

</script>

<style scoped>

.blink {
  opacity: 1;
  animation: blink 1.5s linear  infinite;
}

@keyframes blink {
  0%,100% { opacity: 0.6 }
  50% { opacity: 1 }
}
</style>