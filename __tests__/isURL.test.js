import { isURL } from '../src/client/js/isURL'

describe('Test, the function "isURL()" should exist' , () => {
    test('Function should return true', () => {
        expect(isURL).toBeDefined();
    });
});