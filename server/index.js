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
// return the userObj that has the users array of words and correctCount
app.get('/flashCards/:userId', (req,res)=> {
    User.findById(req.params.userId)
    .then(userObj => {
        return res.status(200).json(userObj)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// get dictionary word to display
//return word object with english and german versions of that one word
// needs to be passed in params the wordId (which is the key of whatever
//word the user is on in their array of words) // bad efficiency if server is pinged for every render of new word???
app.get('/dictionary/:wordId', (req, res)=> {
    Dictionary.findById(req.params.wordId)
    .then(wordObj => {
        return res.status(200).json(wordObj)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
// get from dictionary words with level X and questionSet X
app.get('/dictionary', (req, res)=> {
    Dictionary.find({level: 1, questionSet: 1})
    .then(wordObj => {
        return res.status(200).json(wordObj)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//Update a users word and mValue
app.put('/flashCards/:userId', (req, res) => {
    // could potentialy do algorithm computation here but for now will assume
    // it is done on the frontend and frontend sends in body of put request
    // the wordId and computed mValue
    // also send me index value of the word
    let wordId = req.body.word
    let mValue = req.body.mValue
    //find logged in user
    User.findById(req.params.userId)
    .then(userObj => {
        for (i=0; i<userObj.length; i++) {

        }
        return res.status(200).json(userObj)
    })
    .catch(err => {
        res.status(500).json(err)
    })
    //in body send the wordId req.body.word and the new mValue req.body.mValue
    // User.findOneAndUpdate({_id: req.params.id}, $set: {req.body.word})
})


//post newUser
app.post('/users', (req, res) => {

    Dictionary.find({level: 1, questionSet: 1})
        .then(words => {
            const learn = words.map(item => {
                let word = {};

                word[item._id] = 1;
                return word

            })
            let userObj = {
                learn: learn,
                userDictionary: words
            }
            //console.log(learn)
            return userObj
        })
        .then(userObj => {

            let newUser = new User()
            newUser.userName = req.body.userName
            newUser.correctCount = 0
            newUser.level = 1
            newUser.questionSet = 1
            newUser.words = userObj.learn
            newUser.dictionary = userObj.userDictionary


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

// Currently not needed: post to add a flashCard to dictionary
app.post('/dictionary', (req, res) => {
    let word = new Dictionary()
    word.level = req.body.level
    word.questionSet = req.body.questionSet
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
