<template>
    <!-- <v-card class="sensor-card">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="headline" v-text="sensorData.name" ></v-card-title>
          <v-card-subtitle v-text="sensorData.type"></v-card-subtitle>
           <v-card-subtitle>{{ isAlive }}</v-card-subtitle>
           <v-card-subtitle>{{ now }}</v-card-subtitle>
        </div>    
        <v-avatar class="ma-3" size="125">
          <v-img :src="image" />
        </v-avatar>
      </div>
    </v-card> -->
    <v-card

    class="mx-auto"
    max-width="344"
    :outlined="!isAlive"
    :raised="isAlive"
  
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-2 font-weight-bold">{{sensorData.name}}</div>
        <v-list-item-subtitle class="mb-1">{{sensorData.type}}-{{isAlive}}</v-list-item-subtitle>
        <v-list-item-subtitle>23&deg;C/79&deg;F<br />45% Humidity</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar        
        size="80"
        color="grey"        
      >
        <v-img :src="image" />
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn color="primary" class="float-right" text>View</v-btn>
    </v-card-actions>
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
      now: function(){
        return Date.now();
      }
      // alive: {
      //   get: function(){return isAlive;},
      //   set: function(){
      //       setTimeout(function(){ isAlive = true; console.log('set to true');}, 2000);
      //   }        
      // }      
    }
    
    // image:{
    //   return '../assets/dht22.jpg';
    // }
}

//<v-img :src="item.src"></v-img>
//<v-icon>mdi-thermometer-lines</v-icon>
</script>

<style scoped>
/* .sensor-card.alive {
        border: solid 1px rgba(0, 128, 0, 0.60);
        box-shadow: 0 0 20px rgb(24, 87, 5);
        -moz-box-shadow: 0 0 20px rgb(24, 87, 5);
        -webkit-box-shadow: 0 0 20px rgb(24, 87, 5);
        -o-box-shadow: 0 0 20px rgb(24, 87, 5);
} */

</style>