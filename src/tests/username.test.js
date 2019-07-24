
const chai = require('chai')
const chaiHttp = require('chai-http')
const httpStatus = require('http-status-codes')
const app = require('../index')
chai.use(chaiHttp)
chai.should()

describe("Username uniqueness functionality", () => {


    it("should return 422 UNPROCESSABLE_ENTITY", (done) => {

        chai.request(app)
            .post('/account/username-unique')
            .send({ email: 'fardin' })
            .end((err, res) => {
                res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY)
                res.body.should.be.a('object')
                done()
            })
    })

    it("should say that this username is not unique", (done) => {

        chai.request(app)
            .post('/account/username-unique')
            .send({ email: 'fardin@gmail.com' })
            .end((err, res) => {
                res.should.have.status(httpStatus.OK)
                res.body.is_username_unique.should.be.false
                done()
            })
    })

    it("should say that this username is unique", (done) => {

        chai.request(app)
            .post('/account/username-unique')
            .send({ email: 'random_user@gmail.com' })
            .end((err, res) => {
                res.should.have.status(httpStatus.OK)
                res.body.is_username_unique.should.be.true
                done()
            })
    })

})