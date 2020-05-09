<template>
    <v-container id="sensors-page">
        <v-row dense>
            <v-col cols="11">                
                <h3 class="pl-3">Sensors</h3>
            </v-col>
            <!-- <v-col cols="1">
                <v-btn hidden icon color="secondary" @click.native="loadSensors()">
                    <v-icon>mdi-refresh</v-icon>
                </v-btn>
            </v-col> -->
        </v-row>
        <v-row dense v-if="!loading">
            <v-col cols="12" lg="3" md="4" sm="6" v-for="(sensor,i) in sensors" :key="i">
                <TemperatureSensorCard v-if="sensor.type==='Temperature'" :sensorData="sensor" />
            </v-col>    
        </v-row>
        <v-overlay v-else>
            <v-progress-circular :size="80" :width="5" color="warning" indeterminate />
        </v-overlay>   
    </v-container>
    
</template>

<script>
import axios from 'axios'
import TemperatureSensorCard from './TemperatureSensorCard'



export default {
    name:"Sensors",
    data:()=>({
        sensors:[],
        loading:true
    }),
    created(){
        this.$sensorHub.$on('onSensorChanged', this.sensorChanged);
    },
    mounted(){
        this.loadSensors();
    },
    methods: {
        loadSensors(){
            console.log('loading sensors')
            this.loading = true;
            axios.get(process.env.VUE_APP_SENSOR_API_BASE + '/api/GetSensors')
             .then(response => {
                 console.log('have sensor data')
                 this.sensors = response.data; 
                 this.loading = false;})           
        },
        sensorChanged(sensor){
            console.log('sensor changed')
            var ls = this.sensors.find(s => s.name===sensor.name);
            if (ls==undefined)
               this.loadSensors();
            else{
                ls.heartbeatInterval = sensor.heartbeatInterval;
                ls.lastHeartbeat = new Date().toJSON();
            }
        }

    },
    components:{
        TemperatureSensorCard
    }
}
</script>