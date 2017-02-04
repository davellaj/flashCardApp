// integration testing with chai-http
import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import User from './../../server/models/user';
import Dictionary from './../../server/models/dictionary';

const { app, runServer, closeServer } = require('./../../server/index');

const should = chai.should();

chai.use(chaiHttp);

// describe('/api/users', () => {
//   before(() => {
//     return runServer(() => {
//       User.create({
//           userName: 'deleteMe',
//           accessToken: '1234'
//       });
//     });
//   });
//   after(() => {
//     User.findOneAndRemove({ userName: 'deleteMe' }, (err) => {
//       console.log(err);
//     });
//     return closeServer();
//   });
//   it('should reject unauthorized users', (done) => {
//       chai.request(app)
//           .get('/api/users')
//           .end((err, res) => {
//               res.unauthorized.should.equal(true);
//               res.should.have.status(401);
//               done();
//           });
//   });
//   it('should accept authorized users', (done) => {
//     chai.request(app)
//         .get('/api/users')
//         .set('Authorization', 'bearer 1234')
//         .end((err, res) => {
//             res.unauthorized.should.equal(false);
//             res.should.have.status(200);
//             res.should.be.json;
//             res.body.should.be.a('object');
//             done();
//         });
//     });
//     it('should return authorized user document', (done) => {
//       chai.request(app)
//           .get('/api/users')
//           .set('Authorization', 'bearer 1234')
//           .end((err, res) => {
//               res.should.be.json;
//               res.body.should.be.a('object');
//               // following test does not include keys that are aquired through googleAuth
//               res.body.should.include.keys(
//                 '_id', 'accessToken', 'userName', 'level',
//                  'questionSet', 'sessionComplete', 'correctCount', 'dictionary'
//               );
//               res.body.userName.should.equal('deleteMe');
//               res.body.accessToken.should.a('String');
//               res.body._id.should.not.be.null;
//               res.body.dictionary.should.be.a('Array');
//               res.body.correctCount.should.be.a('Number');
//               res.body.questionSet.should.be.a('Number');
//               res.body.level.should.be.a('Number');
//               res.body.sessionComplete.should.be.a('Boolean');
//
//               res.body.level.should.not.equal(0);
//               res.body.questionSet.should.not.equal(0);
//               done();
//           });
//       });
//   });

  // describe('/api/questionSet/:userId/:sessionComplete', () => {
  //   before(() => {
  //       return runServer(() => {
  //         User.create({
  //             userName: 'deleteMe',
  //             accessToken: '1234'
  //         });
  //       });
  //     });
  //   after(() => {
  //     User.findOneAndRemove({ userName: 'deleteMe' }, (err) => {
  //       console.log(err);
  //     });
  //     return closeServer();
  //   });
  //   it('should reject unauthorized users', (done) => {
  //       chai.request(app)
  //           .get('/api/questionSet/123/false')
  //           .end((err, res) => {
  //               res.unauthorized.should.equal(true);
  //               res.should.have.status(401);
  //               done();
  //           });
  //   });
  //   it('should accept authorized users', (done) => {
  //     let id;
  //     User.findOne({ userName: 'deleteMe' })
  //     .then(user => {
  //       id = user.id;
  //       console.log(id);
  //       return;
  //     })
  //     .then(() => {
  //       chai.request(app)
  //         .get(`/api/questionSet/${id}/false`)
  //         .set('Authorization', 'bearer 1234')
  //         .end((err, res) => {
  //             res.unauthorized.should.equal(false);
  //             res.should.have.status(200);
  //             res.should.be.json;
  //             res.body.should.be.a('array');
  //             done();
  //         });
  //       });
  //     });
  //     it('should fail gracefully when wrong sessionComplete parameter is sent', (done) => {
  //       let id;
  //       User.findOne({ userName: 'deleteMe' })
  //       .then(user => {
  //         id = user.id;
  //         return;
  //       })
  //       .then(() => {
  //         chai.request(app)
  //           .get(`/api/questionSet/${id}/fals`)
  //           .set('Authorization', 'bearer 1234')
  //           .end((err, res) => {
  //               res.should.have.status(400);
  //               res.should.be.json;
  //               res.body.should.be.a('object');
  //               res.body.should.include.keys('message');
  //               res.body.message.should.be.a('string');
  //               done();
  //           });
  //         });
  //       });
  //       it('should fail gracefully when wrong id parameter is sent', (done) => {
  //           chai.request(app)
  //             .get('/api/questionSet/123/false')
  //             .set('Authorization', 'bearer 1234')
  //             .end((err, res) => {
  //                 res.should.have.status(400);
  //                 res.should.be.json;
  //                 res.body.should.be.a('object');
  //                 res.body.should.include.keys('message');
  //                 res.body.message.should.be.a('string');
  //                 done();
  //             });
  //         });
  //     it('should return a dictionary array of objects from dictionary when session complete false', (done) => {
  //       let id;
  //       let sessionComplete;
  //       User.findOne({ userName: 'deleteMe' })
  //       .then(user => {
  //         id = user.id;
  //         sessionComplete = user.sessionComplete;
  //         console.log(id);
  //         console.log(sessionComplete);
  //         return;
  //       })
  //       .then(() => {
  //         chai.request(app)
  //           .get(`/api/questionSet/${id}/${sessionComplete}`)
  //           .set('Authorization', 'bearer 1234')
  //           .end((err, res) => {
  //               res.body.should.have.length.of.at.least(1);
  //               res.body[0].should.include.keys('level',
  //               'questionSet', 'english', 'german');
  //               res.body[0].english.should.be.a('String');
  //               res.body[0].german.should.be.a('String');
  //               res.body[0].level.should.equal(1);
  //               res.body[0].questionSet.should.equal(1);
  //               done();
  //           });
  //         });
  //       });
  //       it('should return the next questionset (2) when session complete true', (done) => {
  //         let id;
  //         const sessionComplete = true;
  //         User.findOne({ userName: 'deleteMe' })
  //         .then(user => {
  //           id = user.id;
  //           console.log(id);
  //           return;
  //         })
  //         .then(() => {
  //           chai.request(app)
  //             .get(`/api/questionSet/${id}/${sessionComplete}`)
  //             .set('Authorization', 'bearer 1234')
  //             .end((err, res) => {
  //                 res.body.should.have.length.of.at.least(1);
  //                 res.body[0].should.include.keys('level',
  //                 'questionSet', 'english', 'german');
  //                 res.body[0].english.should.be.a('String');
  //                 res.body[0].german.should.be.a('String');
  //                 res.body[0].level.should.equal(1);
  //                 res.body[0].questionSet.should.equal(2);
  //                 done();
  //             });
  //           });
  //         });
  //   });

  // describe('/api/questionSet/:userId/:sessionComplete', () => {
  //   before(() => {
  //       return runServer(() => {
  //         User.create({
  //             userName: 'deleteMe',
  //             accessToken: '1234',
  //             level: 1,
  //             questionSet: 5,
  //             dictionary: [{
  //               level: 1,
  //               questionSet: 5,
  //               english: 'questionSet5',
  //               german: 'germanAnswer'
  //             }]
  //         });
  //       });
  //     });
  //   after(() => {
  //     User.findOneAndRemove({ userName: 'deleteMe' }, (err) => {
  //     });
  //     return closeServer();
  //   });
  //     it('should return an array of objects from user dictionary when session complete false', (done) => {
  //       let id;
  //       let sessionComplete;
  //       User.findOne({ userName: 'deleteMe' })
  //       .then(user => {
  //         id = user.id;
  //         sessionComplete = user.sessionComplete;
  //         return;
  //       })
  //       .then(() => {
  //         chai.request(app)
  //           .get(`/api/questionSet/${id}/${sessionComplete}`)
  //           .set('Authorization', 'bearer 1234')
  //           .end((err, res) => {
  //               res.body.should.have.length.of(1);
  //               res.body[0].should.include.keys('level',
  //               'questionSet', 'english', 'german');
  //               res.body[0].english.should.equal('questionSet5');
  //               res.body[0].german.should.equal('germanAnswer');
  //               res.body[0].level.should.equal(1);
  //               res.body[0].questionSet.should.equal(5);
  //               done();
  //           });
  //         });
  //       });
  //       it('should return the next level (2) and new questionSet (1) when session complete true', (done) => {
  //         let id;
  //         const sessionComplete = true;
  //         User.findOne({ userName: 'deleteMe' })
  //         .then(user => {
  //           id = user.id;
  //           return;
  //         })
  //         .then(() => {
  //           chai.request(app)
  //             .get(`/api/questionSet/${id}/${sessionComplete}`)
  //             .set('Authorization', 'bearer 1234')
  //             .end((err, res) => {
  //                 res.body.should.have.length.of.at.least(1);
  //                 res.body[0].should.include.keys('level',
  //                 'questionSet', 'english', 'german');
  //                 res.body[0].english.should.be.a('String');
  //                 res.body[0].german.should.be.a('String');
  //                 res.body[0].level.should.equal(2);
  //                 res.body[0].questionSet.should.equal(1);
  //                 done();
  //             });
  //           });
  //         });
  //   });
  describe('/api/questionSet/:userId/:sessionComplete', () => {
    before(() => {
        return runServer(() => {
          User.create({
              userName: 'deleteMe',
              accessToken: '1234',
              level: 6,
              questionSet: 5
          });
        });
      });
    after(() => {
      User.findOneAndRemove({ userName: 'deleteMe' }, (err) => {
      });
      return closeServer();
    });
      it('should return all words from dictionary when session complete false', (done) => {
        let id;
        let sessionComplete;
        User.findOne({ userName: 'deleteMe' })
        .then(user => {
          id = user.id;
          sessionComplete = user.sessionComplete;
          return;
        })
        .then(() => {
          chai.request(app)
            .get(`/api/questionSet/${id}/${sessionComplete}`)
            .set('Authorization', 'bearer 1234')
            .end((err, res) => {
                res.body.should.have.length.of.at.least(35);
                res.body[0].should.include.keys('level',
                'questionSet', 'english', 'german');
                res.body[0].english.should.be.a('String');
                res.body[0].german.should.be.a('String');
                res.body[0].level.should.equal(1);
                res.body[0].questionSet.should.equal(1);
                done();
            });
          });
        });
        it('should return all dictionary words when user level is greater than 5 and session complete true', (done) => {
          let id;
          const sessionComplete = true;
          User.findOne({ userName: 'deleteMe' })
          .then(user => {
            id = user.id;
            return;
          })
          .then(() => {
            chai.request(app)
              .get(`/api/questionSet/${id}/${sessionComplete}`)
              .set('Authorization', 'bearer 1234')
              .end((err, res) => {
                  res.body.should.have.length.of.at.least(35);
                  res.body[0].should.include.keys('level',
                  'questionSet', 'english', 'german');
                  res.body[0].english.should.be.a('String');
                  res.body[0].german.should.be.a('String');
                  res.body[0].level.should.equal(1);
                  res.body[0].questionSet.should.equal(1);
                  done();
              });
            });
          });
    });

// add tests to check if database was updated correctly in route above

// add tests for save session router

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


// working async dictionary call
// describe('/api/questionSet/:userId/:sessionComplete', () => {
//   before(() => {
//     runServer(() => {
//       return User.create({
//           userName: 'deleteMe',
//           accessToken: '1234',
//           id: '123'
//       })
//       .then(() => {
//         Dictionary.create({
//         level: 1,
//         questionSet: 1,
//         english: 'test',
//         german: 'teest',
//         mValue: 1
//         });
//       })
//       .then(() => done())
//       .catch(err => {
//         console.log(err);
//         done(err);
//       });
//     });
//   });
//   after(() => {
//     User.findOneAndRemove({ userName: 'deleteMe' }, (err) => {
//       console.log(err);
//     });
//     Dictionary.findOneAndRemove({ english: 'test' }, (err) => {
//       console.log(err);
//     });
//     return closeServer();
//   });
