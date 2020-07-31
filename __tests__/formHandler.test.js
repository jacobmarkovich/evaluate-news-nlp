import { handleSubmit } from '../src/client/js/formHandler.js'

describe('Test, the function "handleSubmit()" should exist' , () => {
    test('Function should return true', () => {
        expect(handleSubmit).toBeDefined();
    });
});