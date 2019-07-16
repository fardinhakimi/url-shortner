

const { isEmpty, isValidUrl } = require('../functions')
const { expect } = require('chai')
const should   = require('chai').should()

describe('isEmpty function', () => {

    it('tests that true is not empty', () => {

        expect(isEmpty(true)).to.eql(false)
    })

    it('tests that empty string is empty', () => {
        expect(isEmpty('')).to.eql(true)
    })

    it('tests that false is empty', () => {
        expect(isEmpty(false)).to.eql(true)
    })

    it('tests that null is empty', () => {
        expect(isEmpty(null)).to.eql(true)
    })

    it('tests that undefined is empty', () => {
        expect(isEmpty(undefined)).to.eql(true)
    })

    it('tests that 5 is not empty', () => {
        expect(isEmpty(5)).to.eql(false)
    })

    it('tests that "lazy dog" is not empty', () => {
        expect(isEmpty('lazy dog')).to.eql(false)
    })
})


describe('isValidUrl', () => {

    it('should return false when invalid url is given', () => {
        isValidUrl('invalid_url').should.be.false
    })

    it('should return true when passed with a valid url', () => {
        isValidUrl('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test').should.be.true
    })
})

