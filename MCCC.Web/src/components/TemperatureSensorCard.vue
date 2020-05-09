<template>   
    <v-card  
    class="mx-auto"
    max-width="344"
    :outlined="!isAlive"
  >
   <div class="alive-pulse" v-if="isAlive">
        <div class="pulse" title="Sensor is live"/>
    </div>

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
        <img src="@/assets/dht22.jpg" />
      </v-list-item-avatar>
    </v-list-item>
    
    <v-list-item >
      <v-list-item-content>
          <v-btn color="primary" >View</v-btn> 
      </v-list-item-content>
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
    name: "TemperatureSensorCard",
    props:{
        sensorData:Object
    },
    data:()=>({
      isAlive:false
    }),
    mounted (){   
      this.isAlive = isSensorActive(this.sensorData);
    },
    methods: {
      heartbeatReceived: function(){ 
        this.isAlive = true; 
        clearTimeout(hbTimeout);
        hbTimeout = setTimeout(() => {this.isAlive = false; console.log(this.sensorData.name + ' timeout')}, (this.sensorData.heartbeatInterval*1000)+hbBuffer);
      }
    },
    watch:{
      sensorData:{
        deep:true,
        handler(){   
          // may need to check before-after
          this.heartbeatReceived();
        }
      }
    }
}

</script>

<style scoped>

.alive-pulse{
  position: absolute;
  right:0;
  top: 0;
}

.pulse{
  background: rgb(63, 81, 181);
	border-radius: 50%;
	box-shadow: 0 0 0 0 rgb(44, 35, 35);
	margin: 10px;
	height: 7px;
	width: 7px;
	transform: scale(1);
	animation: pulse 2s infinite;
}

@keyframes pulse {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(63, 81, 181, 0.7);
	}
	
	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(63, 81, 181, 0);
	}
	
	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(63, 81, 181, 0);
	}
}

.fadeInOut {
  opacity: 1;
  animation: fadeInOut 1.5s linear  infinite;
}

@keyframes fadeInOut {
  0%,100% { opacity: 0.6 }
  50% { opacity: 1 }
}
</style>