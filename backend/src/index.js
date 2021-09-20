import express from 'express'
import connect from './db.js'
import cors from 'cors';

const app = express() // instanciranje aplikacije
const port = 3000 // port na kojem će web server slušati

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World, ovaj puta preko browsera!')
    console.log("Hello world u konzolu")
})


app.listen(port, () => console.log(`Slušam na portu ${port}!`))

app.post ('/videoigre', async (req , res) => {
    let db = await connect();

    let videoigre = req.body;
    console.log(videoigre);
    delete videoigre._id;

    let rezultat = await db.collection('objave').insertOne(videoigre);
    if (rezultat.insertedCount == 1) {
        res.send({
            status: 'uspješno',
            id: rezultat.insertedId,
        });
    } 
    else {
        res.send({
            status: 'neuspješno',
        });
    }

    console.log(rezultat);
});

app.get ("/videoigre", async (req,res) => {
    let db = await connect();

    let cursor = await db.collection('objave').find({});
    let result = await cursor.toArray();
    
    res.json(result);

});

app.get ('/videoigre/:imeVideoIgre', async (req , res) => {
    let imeIgre = req.params.imeVideoIgre;
    let db = await connect();
    
    console.log(req.params);
    let doc = await db.collection("objave").findOne({ime_igre: imeIgre});
    console.log(doc)
    res.json(doc)
});

app.get("/videoigre/obrisi/:imeVideoIgre", async (req, res) => {
	let imeVideoIgre = req.params.imeVideoIgre;
    
	let db = await connect();
	let obrisano = await db.collection("objave").deleteOne({ ime_igre: imeVideoIgre });

	if (obrisano && obrisano.deletedCount == 1) {
		res.json("Uspješno brisanje!", obrisano);
	} 
    
    else {
		res.json({
			status: "Igra nije obrisana"
		});
	}
});