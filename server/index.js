import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose'
import Dictionary from '../models/dictionary'
import bodyParser from 'body-parser'

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;
const DATABASE_URL = 'mongodb://german:german@ds119748.mlab.com:19748/german'


console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();
const jsonParser = bodyParser.json()

app.use(express.static(process.env.CLIENT_PATH));

app.get('/flashCards', (req,res)=>{
    Dictionary.find({})
    .then(words => {
        return res.status(200).json(words)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

function runServer() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL, err => {
            if (err) {
                return reject(err);
            }
        app.listen(PORT, HOST, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            const host = HOST || 'localhost';
            console.log(`Listening on ${host}:${PORT}`);
        });
    });
})}

if (require.main === module) {
    runServer();
}
