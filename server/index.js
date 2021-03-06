import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import GoogleStrategy from 'passport-google-oauth20';
import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import Dictionary from './models/dictionary';
import User from './models/user';
import { DATABASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PORT } from '../config';

const HOST = process.env.HOST;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();
const jsonParser = bodyParser.json();
//const router = express.Router(); //only used if you split up file for auth routes
if (process.env.CLIENT_PATH) {
  app.use(express.static(process.env.CLIENT_PATH));
}

app.use(jsonParser);

mongoose.Promise = global.Promise;

//google auth
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOneAndUpdate({ googleId: profile.id },
          {
            $set: {
              googleId: profile.id,
              name: profile.name,
              userName: profile.displayName,
              email: profile.emails[0].value,
              accessToken
            }
          },
          { upsert: true, new: true, setDefaultsOnInsert: true })
          .then(user => {
              cb(null, user);
          })
          .catch((err) => {
              console.log('catch error', err);
          });
    }
  ));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    res.cookie('accessToken', req.user.accessToken, { expires: 0, httpOnly: false });
    // Successful authentication, redirect home.
    res.redirect('/#/question');
  });

// passport bearer Strategy
passport.use(new BearerStrategy(
  (accessToken, done) => {
    User.findOne({
      accessToken
    }).then(user => {
      done(null, user, { scope: 'read' });
    }).catch(err => {
      done(err, null);
    });
  }
));

// get users collection with authenticated route
app.get('/api/users', passport.authenticate('bearer', { session: false }),
// how to make error fail gracefully instead of relying on passport authenticate
  (req, res) => {
    res.status(200).json(req.user);
  });

// get from dictionary words with level X and questionSet X with authentication needed
app.get('/api/questionSet/:userId/:sessionComplete', passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const userId = req.params.userId;
    const sessionComplete = req.params.sessionComplete;

    // check if correct sessionComplete parameters were sent.
    if (sessionComplete !== 'true' && sessionComplete !== 'false') {
      return res.status(400).json({ message: 'need value true/false for sessionComplete' });
    }

    // if the session is false/not complete we want to send back the dictionary words containing the users
    // current qquestionSet and level
    if (sessionComplete == 'false') {
      User.findById(userId)
      .then(userObj => {
    // if the userObj has items saved in their dictionary array, which means they saved a session,
    // then return the current dictionary array they are working on
    if (userObj.dictionary.length !== 0) {
      return userObj.dictionary;
    }
    // if the user is currently on a level greater than 5 (our last level), send back all the dictionary words to review
    if (userObj.level > 5) {
      return Dictionary.find({});
    }
    // else return the dictionary words from the user's current questionsSet and level
    return Dictionary.find({ level: userObj.level, questionSet: userObj.questionSet });
  })
  .then(wordObj => {
      return res.status(200).json(wordObj);
  })
  .catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'incorrect userId' });
    }
      return res.status(500).json(err);
  });
  } else if (sessionComplete == 'true') {
    // could add in future if a user has session true, we can save their new dictionary array to their user
      User.findById(userId)
      .then(userObj => {
        let newLevel;
        let newQuestionSet;

        if (userObj.questionSet >= 5) {
          newLevel = userObj.level + 1;
          newQuestionSet = 1;
          return User.findByIdAndUpdate(userId,
          { $set: { questionSet: newQuestionSet, level: newLevel } }, { new: true });
        }
        newQuestionSet = userObj.questionSet + 1;
        return User.findByIdAndUpdate(userId,
        { $set: { questionSet: newQuestionSet } }, { new: true });
      })
      .then(updateObj => {
        if (updateObj.level > 5) {
          // extend edge case on frontend if level > 5 to say cards complete and change text from level and set to "review"
          return Dictionary.find({});
        }
        return Dictionary.find({ level: updateObj.level, questionSet: updateObj.questionSet });
      })
      .then(wordObj => {
          return res.status(200).json(wordObj);
      })
      .catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(400).json({ message: 'incorrect userId' });
        }
          return res.status(500).json(err);
      });
  }
});

//Update a users dictionary with save session button
app.put('/api/saveSession', passport.authenticate('bearer', { session: false }),
 (req, res) => {
    //find logged in user then update dictionary and return the updated user dictionary
    User.findByIdAndUpdate(req.body.userId,
    { dictionary: req.body.dictionary }, { new: true })
    .then(updateObj => {
      return res.status(200).json(updateObj.dictionary);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// Currently not needed: post to add a flashCard to dictionary
app.post('/dictionary', (req, res) => {
    const word = new Dictionary();
    word.level = req.body.level;
    word.questionSet = req.body.questionSet;
    word.english = req.body.english;
    word.german = req.body.german;

    word.save((err, word) => {
        if (err) {
            res.send(err);
        }

        Dictionary.find({})
        .then(words => {
            return res.status(200).json(words);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    });
});

let server;

function runServer(callback) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL, err => {
            if (err && callback) {
              console.log(err);
              return callback(err);
            }
          });
        server = app.listen(PORT, HOST, () => {
            console.log(`Your app is listening on port ${PORT}`);
            if (callback) {
              callback();
            }
            resolve(server);
          }).on('error', err => {
              reject(err);
          });
        });
      }

    function closeServer() {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            reject(err);
            // so we don't also call `resolve()`
            return;
          }
          resolve();
        });
  });
}

if (require.main === module) {
    runServer();
}

export { app, runServer, closeServer };
