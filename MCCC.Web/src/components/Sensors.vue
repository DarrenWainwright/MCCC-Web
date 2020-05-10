<template>
    <v-container id="sensors-page">
        <v-row dense>
            <v-col cols="11">                
                <h3>Sensors</h3>
            </v-col>
        </v-row>        
        <v-row dense v-if="!loading">
            <v-col cols="12" lg="3" md="4" sm="6" v-for="(sensor,i) in sensors" :key="i">
                <TemperatureSensorCard v-if="sensor.type==='Temperature'" :sensorData="sensor" />
            </v-col>    
        </v-row>  
        <v-row>
            <v-col cols="3">
                <v-skeleton-loader
                    v-if="loading" 
                    :loading="loading" 
                    transition="fade-transition" type="image">
                </v-skeleton-loader>
            </v-col>
        </v-row>     
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
    beforeDestroy(){
        this.$sensorHub.$off('onSensorChanged');
    },
    methods: {
        loadSensors(){
            this.loading = true;
            axios.get(process.env.VUE_APP_SENSOR_API_BASE + '/api/sensors',
            { 'headers': { 'x-functions-key': process.env.VUE_APP_SENSOR_GETSENSOR_KEY } }
            
                        )
             .then(response => {
                 this.sensors = response.data; 
                 this.loading = false;})           
        },
        sensorChanged(sensor){
            console.log('sensorChanged event received')
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