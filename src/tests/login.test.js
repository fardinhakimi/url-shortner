
const chai = require('chai')
const chaiHttp = require('chai-http')
const httpStatus = require('http-status-codes')
const app = require('../index')

chai.use(chaiHttp)
chai.should()

describe("Login functionality", () => {

    it("should return 401 UNAUTHORIZED", (done) => {

        chai.request(app)
            .post('/account/login')
            .send({ email: 'fardin@gmail.com', password: 'wrong_password' })
            .end((err, res) => {
                res.should.have.status(httpStatus.UNAUTHORIZED)
                res.body.should.be.a('object')
                done()
            })
    })

    it("should return 422 UNPROCESSABLE_ENTITY", (done) => {

        chai.request(app)
            .post('/account/login')
            .send({ email: 'fardin@gmail.com' })
            .end((err, res) => {
                res.should.have.status(httpStatus.UNPROCESSABLE_ENTITY)
                res.body.should.be.a('object')
                done()
            })
    })

    it("should return 200 OK", (done) => {

        chai.request(app)
            .post('/account/login')
            .send({ email: 'fardin@gmail.com', password: 'test1234' })
            .end((err, res) => {
                res.should.have.status(httpStatus.OK)
                res.body.user.isGuest.should.be.false
                res.body.user.token.should.be.string
                done()
            })
    })
})