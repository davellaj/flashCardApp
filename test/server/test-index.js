// integration testing with chai-http
import mongoose from 'mongoose'
import User from './../../server/models/user'
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('./../../server/index');

const should = chai.should();

chai.use(chaiHttp);

describe('/api/users', function() {
  // Before our tests run, we activate the server. Our `runServer`
  // function returns a promise, and we return the promise by
  // doing `return runServer`. If we didn't return a promise here,
  // there's a possibility of a race condition where our tests start
  // running before our server has started.
  before(function() {
    return runServer(() => {
      User.create({
          userName: "deleteMe",
          accessToken: "1234"
      })
    });
  });

  // Close server after these tests run in case
  // we have other test modules that need to
  // call `runServer`. If server is already running,
  // `runServer` will error out.
  after(function() {
    User.findOneAndRemove({ userName: 'deleteMe' }, (err) => {
      console.log(err);
    })
    return closeServer();
  });
  // `chai.request.get` is an asynchronous operation. When
  // using Mocha with async operations, we need to either
  // return an ES6 promise or else pass a `done` callback to the
  // test that we call at the end. We prefer the first approach, so
  // we just return the chained `chai.request.get` object.
  // it('should return user info on GET', function() {
  //   return chai.request(app)
  //     .get('/api/users')
  //     .end(function(res, err) {
  //       res.unauthorized.should.equal(true);
  //       done()
  it('should reject unauthorized users', (done) => {
      chai.request(app)
          .get('/api/users')
          .end((err, res) => {
              res.unauthorized.should.equal(true);
              done();
          })
  })
  it('should accept authorized users', (done) => {
    // let user = {
    //   userName: "deleteMe",
    //   accessToken: "1234"
    // }
    // User.create(user)
    chai.request(app)
        .get('/api/users')
        .set("Authorization", "bearer 1234")
        .end((err, res) => {
            res.unauthorized.should.equal(false);
            res.should.be.json;
            res.body.should.be.a('object');
            done();
        })
    });
  });


// Theresa's code for before function when you need an async function
// before(function(done) {
//         runServer(function() {
//             return createArrayOfQuestions()
//             .then(questions => {
//                 User.create({
//                     accessToken: "123",
//                     googleId: "111",
//                     name: "John Doe",
//                     score: 0,
//                     questions: questions
//                 });
//             })
//             .then(() => done())
//             .catch(err => {
//                 console.log(err);
//                 done(err);
//             })
//         })
//     });
