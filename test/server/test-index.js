// integration testing with chai-http
import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import User from './../../server/models/user';

const { app, runServer, closeServer } = require('./../../server/index');

const should = chai.should();

chai.use(chaiHttp);

describe('/api/users', () => {
  before(() => {
    return runServer(() => {
      User.create({
          userName: 'deleteMe',
          accessToken: '1234'
      });
    });
  });
  after(() => {
    User.findOneAndRemove({ userName: 'deleteMe' }, (err) => {
      console.log(err);
    });
    return closeServer();
  });
  it('should reject unauthorized users', (done) => {
      chai.request(app)
          .get('/api/users')
          .end((err, res) => {
              res.unauthorized.should.equal(true);
              res.should.have.status(401);
              done();
          });
  });
  it('should accept authorized users', (done) => {
    chai.request(app)
        .get('/api/users')
        .set('Authorization', 'bearer 1234')
        .end((err, res) => {
            res.unauthorized.should.equal(false);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            done();
        });
    });
    it('should return authorized user document', (done) => {
      chai.request(app)
          .get('/api/users')
          .set('Authorization', 'bearer 1234')
          .end((err, res) => {
              res.should.be.json;
              res.body.should.be.a('object');
              // following test does not include keys that are aquired through googleAuth
              res.body.should.include.keys(
                '_id', 'accessToken', 'userName', 'level',
                 'questionSet', 'sessionComplete', 'correctCount', 'dictionary'
              );
              res.body.userName.should.equal('deleteMe');
              res.body.accessToken.should.a('String');
              res.body._id.should.not.be.null;
              res.body.dictionary.should.be.a('Array');
              res.body.correctCount.should.be.a('Number');
              res.body.questionSet.should.be.a('Number');
              res.body.level.should.be.a('Number');
              res.body.sessionComplete.should.be.a('Boolean');

              res.body.level.should.not.equal(0);
              res.body.questionSet.should.not.equal(0);
              done();
          });
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
