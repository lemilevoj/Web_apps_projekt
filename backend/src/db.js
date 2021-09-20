const { MongoClient } = require('mongodb');

let connection_string = 'mongodb+srv://admin:admin@cluster0.s11eu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

let client = new MongoClient(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = null

export default () => {

    return new Promise((resolve, reject) =>{

        if (db){
            resolve(db)
        }
        client.connect(err => {
            if(err){
                reject("Došlo je do greške prilikom spajanja: " + err)
            }
            else{
                console.log("Uspješno spajanje")
                db = client.db("objave")
                resolve(db)
            }
        });
    })
};