import axios from "axios";

let Service = axios.create({
    baseURL: 'http://localhost:3000/', 
    timeout: 1000
 })

 Service.interceptors.response.use(
    (response) => {
            console.log('Interceptor', response);
        return response;
    },
    (error) => {
        if(error.response.status == 401){
            console.log(error)
        }
    }
); 

let objave= {
    dodaj_objave(podaci) {
            console.log(podaci);
            return Service.post("/videoigre",podaci)
    },
    
   async slanje_objave() {
       
    let videoigre = await Service.get("/videoigre")
        console.log("video igre su: ",videoigre);

    /*let videoigre = response.data;

    console.log(videoigre);*/

    return videoigre.data.map((doc) => {
        return {
            id:doc._id,
            ime_igre:doc.ime_igre,
            opis_igre:doc.opis_igre,
            datum_igre:doc.datum_igre,
            vrsta_igre:doc.vrsta_igre,
            url:doc.url
        }
    })
   },

   async jednaVideoIgra(id){

    let videoigre = await Service.get(`/videoigre/${id}`);

    console.log(videoigre);
    let doc = videoigre.data;

    return {
        id:doc._id,
        ime_igre:doc.ime_igre,
        opis_igre:doc.opis_igre,
        datum_igre:doc.datum_igre,
        vrsta_igre:doc.vrsta_igre,
        url:doc.url
    };
}, 
};

export {
    objave,
    Service
}