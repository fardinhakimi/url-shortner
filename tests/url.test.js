
const { expect } = require('chai')
const chai = require('chai').should()

const Url = require('../models/url')


describe("Url Schema", () => {

    it("should have long_url", () => {

        const url = new Url({
            long_url: "long_url",
            short_url: "short_url"
        })

        url.should.have.property('long_url')
    })

    it("getLongUrl should return correct long_url", () => {

        const url = new Url({
            long_url: "https://funrang.com/very-long-url",
            short_url: "https://funrang.com/shortid"
        })

        url.getLongUrl().should.equal('https://funrang.com/very-long-url')
    })

    it("getCombinedUrl should return both long and short urls combined (testing a callback)", (done) => {

        const url = new Url({
            long_url: "https://funrang.com/very-long-url",
            short_url: "https://funrang.com/shortid"
        })

        url.getCombinedUrl((error, value) => {
            value.should.equal("https://funrang.com/very-long-url:https://funrang.com/shortid")
            done(error)
        })
    })

    it("validate should return true if long_url is valid ( testing a promise which succeeds) ", () => {

        const url = new Url({
            long_url: "https://funrang.com/very-long-url",
            short_url: "https://funrang.com/shortid"
        })

        return url.validate().then((value) => {
            expect(value).to.be.true
        })
    })


    it("validate should return error if long_url is not valid ( testing a promise which fails) ", () => {

        const url = new Url({
            long_url: "not_valid",
            short_url: "https://funrang.com/shortid"
        })

        return url.validate().catch((error) => {
            error.should.not.be.null
        })
    })
})