import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose'
import Dictionary from '../models/dictionary'
import User from '../models/user'
import bodyParser from 'body-parser'

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;
const DATABASE_URL = 'mongodb://german:german@ds119748.mlab.com:19748/german'


console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();
const jsonParser = bodyParser.json()

app.use(express.static(process.env.CLIENT_PATH));
app.use(jsonParser)

// get for logged in users database info
app.get('/flashCards/:id', (req,res)=>{
    console.log(req.params)
    User.findById(req.params.id)
    .then(userObj => {
        return res.status(200).json(userObj)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// post to add a flashCard, not necessary for current game
app.post('/flashCards', (req, res) => {
    let word = new Dictionary()
    word.english = req.body.english
    word.german = req.body.german

    word.save((err, word) => {
        if(err) {
            res.send(err)
        }

        Dictionary.find({})
        .then(words => {
            return res.status(200).json(words)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })
})

//post newUser
app.post('/users', (req, res) => {

        Dictionary.find({})
        .then(words => {
            const learn = words.map(item => {
                let word = {};

                word[item._id] = 1;
                return word

            })
            return learn
        })
        .then((learn) => {
            let newUser = new User()
            newUser.words = learn
            newUser.correctCount = 0
            newUser.userName = req.body.userName

            newUser.save((err, user) => {
                if(err) {
                    res.send(err)
                }
                return res.status(200).json(newUser)
        })
        .catch(err => {
            res.status(500).json(err)
        })
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
