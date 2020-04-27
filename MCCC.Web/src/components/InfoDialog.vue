<template>
    <v-dialog
        v-model="show"
        scrollable 
        persistent :overlay="false"
        max-width="500px"
        transition="dialog-transition"
    >        
    <h1>DIALOG</h1>
    </v-dialog>
</template>

<script>
export default {
    name: 'InfoDialog',
    props:{
        show: Boolean
    }
    
}
</script>