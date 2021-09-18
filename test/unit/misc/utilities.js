
var expect = require('chai').expect;
var utilities = require("../../../misc/utilities");

// Test Validation functions
describe('Validators', function(){
    describe('isValidAddress', function(){
        it('should return true for valid address', function(){
            var testAddress = "12345 SomeStreet";
            var result = utilities.isValidAddress(testAddress);
            expect(result).to.equal(true);
        });
        it('should return false for address being too long', function(){
            var testAddress = "";
            var i;
            for (i=0;i<300;i++){
                testAddress = testAddress + "x";
            }
            var result = utilities.isValidAddress(testAddress);
            expect(result).to.equal(false);
        });
        it('should return false for empty address', function(){
            var testAddress = "";
            var result = utilities.isValidAddress(testAddress);
            expect(result).to.equal(false);
        });
    });
    describe('isValidCity',function(){
        it('should return true for valid city', function(){
            var testCity = "San Antonio";
            var result = utilities.isValidCity(testCity);
            expect(result).to.equal(true);
        });
        it('should return false for city name being too long', function(){
            var testCity = "";
            var i;
            for (i=0;i<60;i++){
                testCity = testCity + "x";
            }
            var result = utilities.isValidCity(testCity);
            expect(result).to.equal(false);
        });
        it('should return false for empty city name', function(){
            var testCity;
            var result = utilities.isValidCity(testCity);
            expect(result).to.equal(false);
        });
    });
    describe('isValidState', function(){
        it('should return true for valid state', function(){
            var testState = "TX";
            var result = utilities.isValidState(testState);
            expect(result).to.equal(true);
        });
        it('should return false for invalid state', function(){
            var testState = "abcde";
            var result = utilities.isValidState(testState);
            expect(result).to.equal(false);
        });
    });
    describe('isValidZip', function(){
        it('should return true for valid zip', function(){
            var testZip = "12345";
            var result = utilities.isValidZip(testZip);
            expect(result).to.equal(true);
        });
        it('should return false for invalid zip', function(){
            var testZip = "123";
            var result = utilities.isValidZip(testZip);
            expect(result).to.equal(false);
        });
    });
    describe('isValidId', function(){
        it('should return true for valid id', function(){
            var testID = "123456789";
            var result = utilities.isValidId(testID);
            expect(result).to.equal(true);
        });
        it('should return false for invalid id', function(){
            var testID = "1234a1234";
            var result = utilities.isValidId(testID);
            expect(result).to.equal(false);
        });
    });
});