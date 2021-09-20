<template>
    <div>
        <jednaVideoIgra :jednaVideoIgra="videoigra"/>
    </div>
</template>

<script>
import jednaVideoIgra from '@/components/jednaVideoIgra.vue'
import {objave} from "@/services";

export default {
  components: { jednaVideoIgra },
  name: "detalji_igre",
  props: ['imeIgre'],
  data(){
    return{
      videoigra:[],
    }
  },
  async created(){
      console.log("ID: ",this.imeIgre)
      this.videoigra = await objave.jednaVideoIgra(this.imeIgre); 

      console.log("Podaci o videoigri: ",this.videoigra) 
  }
  }
</script>
