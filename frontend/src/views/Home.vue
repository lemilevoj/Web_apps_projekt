<template>
 <div class="container">
  <h2> Unesite podatke o video igrici: </h2>
  <form>
    <div class="form-group">
      <label for="ime_igre">Ime video igre:</label>
      <input v-model="ime_igre" type="text" class="form-control" id="ime_igre" placeholder="Unesite ime video igre" name="text">
    </div>
    <div class="form-group">
      <label for="opis_igre">Opis video igre:</label>
      <input v-model="opis_igre" type="text" class="form-control" id="opis_igre" placeholder="Unesite opis video igre" name="text">
    </div>
    <div class="form-group">
      <label for="opis_igre">Datum održavanja turnira video igre: </label>
      <input v-model="datum_igre" class="form-control input-lg" type="date" id="datum_igre" name="trip-start" min="2021-09-20" max="2021-12-31">
    </div>
     <div class="form-group">
      <label for="opis_igre">Odaberi vrstu video igre:</label>
      <select v-model="vrsta_igre">
            <option>Akcijska</option>
            <option>Horror</option>
            <option>Akcijska avantura</option>
            <option>Avantura</option>
            <option>Igre igranja uloga (RPG)</option>
            <option>MOBA</option>
            <option>Simulacija</option>
            <option>Strateška</option>
            <option>FPS (First Person Shooter)</option>
            <option>Ostalo</option>
        </select>
    </div>
    <div class="form-group">
      <label for="opis_igre"> </label>
      <input v-model="url" class="form-control input-lg" type="text" id="opis_igre" name="trip-start" placeholder="Unesite URL video igre">
    </div>
    <button type="submit" class="btn btn-default" @click.prevent="dodaj_igru()"> Objavi </button>
  </form>
<h1>Turniri po videoigrama:</h1>
<div v-for="(lista_igara) in lista_igara" :key="lista_igara.id" class="card mb-3">
  <img src="" class="card-img-top" alt="">
  <div class="card-body-color">
    <h5 class="card-title" style="font-weight: bold; font-size:20px;">{{lista_igara.ime_igre}}</h5>
    <small class="text-muted">Datum igre: {{lista_igara.datum_igre}}</small><br><br>
    <!--<p class="card-text"><small class="text-muted">Zadnje ažurirano</small></p>-->
    <a href="#"  @click.prevent="ruta_detalji(lista_igara)">Detaljno</a>
    <br><br>
    <a href="#" class="obrisi_boja" @click="obrisi(lista_igara.ime_igre)" :key="lista_igara.ime_igre">Obriši</a>
  </div>
</div>

</div>
</template>

<script>
import {objave} from "@/services";
import {Service} from "@/services";

export default {
    data() {
      return {
        url:"",
        ime_igre:"",
        opis_igre:"",
        datum_igre:"",
        vrsta_igre:"",
        lista_igara:[],
        id: this.$route.params.id,
      }
    },

    methods: {
      dodaj_igru() {
        let podaci= {
          ime_igre: this.ime_igre,  //desna strana v modal lijeva data f-ije
          opis_igre: this.opis_igre,
          datum_igre: this.datum_igre,
          vrsta_igre: this.vrsta_igre,
          url: this.url,

        };
        console.log(podaci);
        objave.dodaj_objave(podaci);
      },
      ruta_detalji(lista_igara){
            this.$router.push({ path: `/igre/${lista_igara.ime_igre}` })
            console.log(this.$route.params.id);
      },
      obrisi(ime){
          Service.get("/videoigre/obrisi/" + ime).then(()=>{
              this.lista_igara;
          })
      }
    },

    async created() {
      this.lista_igara = await objave.slanje_objave();
      console.log("slanje objave", this.lista_igara);
    }
}

</script>
<style scoped>
.card-body-color{
  background-color:rgba(21, 173, 248, 0.095);
}
.obrisi_boja{
  color:red;
}
</style>


