<template>
    <v-app id="mccc-app">
        <v-navigation-drawer
            v-model="drawer"
            app       
            :mini-variant="$vuetify.breakpoint.lgAndUp"
            :expand-on-hover="$vuetify.breakpoint.lgAndUp"
            :clipped="$vuetify.breakpoint.lgAndUp"
        >
            <v-list dense>
                <v-list-item link to="/">
                    <v-list-item-action>
                            <v-icon>mdi-router-wireless</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                Sensors
                            </v-list-item-title>
                        </v-list-item-content>
                </v-list-item>

                 <v-list-item link to="/about">
                    <v-list-item-action>
                            <v-icon>mdi-information-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                About
                            </v-list-item-title>
                        </v-list-item-content>
                </v-list-item>
            </v-list>            
        </v-navigation-drawer>
        <v-app-bar 
            app
            dense            
            color="primary" dark
            :clipped-left="$vuetify.breakpoint.lgAndUp"            
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-lg-and-up" />
            <span class="hidden-sm-and-down">Mother Cluckers Coop Control</span>
        </v-app-bar>
        <v-content>
            <v-container align-start class="fill-height" fluid>
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
            drawer: null
        }),
        // components: {
        //     Home
        // }
    }
</script>

