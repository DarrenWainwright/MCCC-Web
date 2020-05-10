import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
import axios from 'axios'

export default {
  install (Vue) {
    // use a new Vue instance as the interface for Vue components to receive/send SignalR events
    // this way every component can listen to events or send new events using this.$questionHub
    const sensorHub = new Vue()
    Vue.prototype.$sensorHub = sensorHub

    // Provide methods to connect/disconnect from the SignalR hub
    let connection = null
    let startedPromise = null
    let manuallyClosed = false


    Vue.prototype.startSignalR = () =>{
       
         getConnectionInfo().then(function(info){
        var options = {
            accesssTokenFactory: () => info.accessToken
        }
        
        connection = new HubConnectionBuilder()
                    .withUrl(
                        `${process.env.VUE_APP_SIGNALR_API_BASE}/api`,
                        options
                    )
                    .configureLogging(LogLevel.Information)
                    .build()
      
        // Forward hub events through the event, so we can listen for them in the Vue components
        connection.on('onSensorChanged', (sensor) => { sensorHub.$emit('onSensorChanged', sensor) })
        connection.on('onSensorDataChanged', (sensorData) =>{ sensorHub.$emit('onSensorDataChanged', sensorData)})
        
        // You need to call connection.start() to establish the connection but the client wont handle reconnecting for you!
        // Docs recommend listening onclose and handling it there.
        // This is the simplest of the strategies
        function start () {
            startedPromise = connection.start()
            .catch(err => {
                console.error('Failed to connect with hub', err)
                return new Promise((resolve, reject) => setTimeout(() => start().then(resolve).catch(reject), 5000))
            })
            return startedPromise
        }
        connection.onclose(() => {
            if (!manuallyClosed) start()
        })

        // Start everything
        manuallyClosed = false
        start()

        });
    }

    
    let connectionInfo = null
   async function getConnectionInfo() {

        if (connectionInfo)
            return connectionInfo

        await axios.post(`${process.env.VUE_APP_SIGNALR_API_BASE}/api/negotiate`, null, {})
          .then(function(resp) { connectionInfo = resp.data; return connectionInfo })
          .catch(function() { return {} })

          return connectionInfo;
      }

   
    Vue.prototype.stopSignalR = () => {
      if (!startedPromise) return

      manuallyClosed = true
      return startedPromise
        .then(() => connection.stop())
        .then(() => { startedPromise = null })
    } 
  }
}
