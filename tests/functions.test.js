

const { isEmpty } = require('../functions')
const { expect } = require('chai')

describe('Testing isEmpty function', () => {

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

