<template>
    <v-container id="sensors-page">
        <v-row dense>
            <v-col cols="12">                
                <h3 class="pl-3">Sensors</h3>
            </v-col>
        </v-row>
        <v-row dense v-if="!loading">
            <v-col cols="12" md="4" sm="6" v-for="(sensor,i) in sensors" :key="i">
                <SensorCard :sensorData="sensor" />
            </v-col>    
        </v-row>
        <v-overlay v-else>
            <v-progress-circular :size="120" :width="5" color="warning" indeterminate />
        </v-overlay>   
    </v-container>
    
</template>

<script>
import axios from 'axios'
import SensorCard from './SensorCard'

// const sensors = [
//     {id:"123456-123345-123-123-123", name:"Coop Indoors", type:"DHT22", heartbeatInterval:10, lastConnected:Date.now()},
//     {id:"123456-123345-123-123-987", name:"Coop sitting Outdoors", type:"DHT22", heartbeatInterval:10, lastConnected:Date.now()},
//      {id:"123456-123345-123-123-123", name:"Coop Indoors", type:"DHT22", heartbeatInterval:10, lastConnected:Date.now()},
//     {id:"123456-123345-123-123-987", name:"Coop Outdoors", type:"DHT22", heartbeatInterval:10, lastConnected:Date.now()},
//      {id:"123456-123345-123-123-123", name:"Coop Indoors", type:"DHT22", heartbeatInterval:10, lastConnected:Date.now()},
//     {id:"123456-123345-123-123-987", name:"Coop Outdoors", type:"DHT22", heartbeatInterval:10, lastConnected:Date.now()},
//      {id:"123456-123345-123-123-123", name:"Coop Indoors", type:"DHT22", heartbeatInterval:10, lastConnected:Date.now()},
//     {id:"123456-123345-123-123-987", name:"Coop Outdoors", type:"DHT22", heartbeatInterval:10, lastConnected:Date.now()},
//      {id:"123456-123345-123-123-123", name:"Coop Indoors", type:"DHT22", heartbeatInterval:10, lastConnected:Date.now()},
//     {id:"123456-123345-123-123-987", name:"Coop Outdoors", type:"DHT22", heartbeatInterval:10, lastConnected:Date.now()},
//     {id:"123456-123345-123-123-987", name:"Coop Outdoors", type:"DHT22", heartbeatInterval:10, lastConnected:Date.now()},
//      {id:"123456-123345-123-123-123", name:"Coop Indoors", type:"DHT22", heartbeatInterval:10, lastConnected:Date.now()},
//     {id:"123456-123345-123-123-987", name:"Coop Outdoors", type:"DHT22", heartbeatInterval:10, lastConnected:Date.now()}
// ]


export default {
    name:"Sensors",
    data:()=>({
        sensors:[],
        loading:true
    }),
    mounted(){
        axios.get(process.env.VUE_APP_SENSOR_API_BASE + '/GetSensors')
             .then(response => {this.sensors = response.data; this.loading = !this.loading; console.log(this.sensors)})
             .then(() => { this.sensors.push({id:"123456-123345-123-123-987", name:"Coop Outdoors", type:"DHT22", heartbeatInterval:10, lastHeartbeat: new Date() })} ) // console.log(response))

    },
    components:{
        SensorCard
    }
}
</script>