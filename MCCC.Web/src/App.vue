<template>
    <v-app id="mccc-app">
        <v-navigation-drawer
            v-model="drawer"
            app
            :clipped="$vuetify.breakpoint.lgAndUp"
        >
            <v-list dense>
                <router-link to="/">Home</router-link>
                <router-link to="/sensors">Sensors</router-link>
                <!-- <template v-for="item in items">
                    <v-list-item :key="item.text" link>
                        <router-link to="/">{{ item.text }}</router-link>
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                        <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>             -->
            </v-list>            
        </v-navigation-drawer>
        <v-app-bar 
            app
            dense
            color="primary"
            :clipped-left="$vuetify.breakpoint.lgAndUp"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <span class="hidden-sm-and-down">Mother Cluckers CC</span>
        </v-app-bar>
        <v-content>
            <v-container class="fill-height" fluid>
                <img alt="Vue logo" src="./assets/logo.png">
                <router-view></router-view>
            </v-container>
        </v-content>

     
    </v-app>
</template>

<script>
    //import Home from './components/Home.vue'      

    export default {
        name: 'App',
        props:{
            source: String
        },
        data: () => ({
            dialog: false,
            drawer: null
        }),
        // components: {
        //     Home
        // }
    }
</script>

