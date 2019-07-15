

const { isEmpty } = require('../functions')

describe('Testing isEmpty function', () => {

    it('tests that true is not empty', () => {

        expect(isEmpty(true)).toBe(false);
    })

    it('tests that empty string is empty', () => {
        expect(isEmpty('')).toBe(true);
    })

    it('tests that false is empty', () => {
        expect(isEmpty(false)).toBe(true)
    })

    it('tests that null is empty', () => {
        expect(isEmpty(null)).toBe(true)
    })

    it('tests that undefined is empty', () => {
        expect(isEmpty(undefined)).toBe(true)
    })

    it('tests that 5 is not empty', () => {
        expect(isEmpty(5)).toBe(false)
    })

    it('tests that "lazy dog" is not empty', () => {
        expect(isEmpty('lazy dog')).toBe(false)
    })
})

