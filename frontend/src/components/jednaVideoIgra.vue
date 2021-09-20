<template>
  <div id="jednaVideoIgra">
    <h1>{{jednaVideoIgra.ime_igre}}</h1>
    
    <div class="videoGame">
      <img :src="jednaVideoIgra.url" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Datum održavanja igre: {{jednaVideoIgra.datum_igre}}</h5>
      </div>
      <ul class="list-group">
        <li class="list-group-item">Vrsta igre: {{jednaVideoIgra.vrsta_igre}}</li>
        <li class="list-group-item">Opis igre: {{jednaVideoIgra.opis_igre}}</li>
      </ul>
      
  </div>
  </div>
</template>

<script>
export default {
  name: 'jednaVideoIgra',
  props: ['jednaVideoIgra'],
  
}
</script>

<style scoped>
.videoGame{
  width:600px;
  margin:auto;
  
}
.card-img-top{
  max-width:500px;
}
</style>


