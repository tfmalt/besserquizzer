var chai   = require('chai');
var should = chai.should();
var debug  = require('../www/js/debug');
var u      = require('underscore');

describe( 'Testing debug', function () {
    describe('#inspect() -> _inspectArray()', function () {
        it('Should return true', function () {
            var res = true;
            res.should.be.true;
        });

        it('Should be an object', function () {
            debug.should.be.an.instanceOf(Object);
        });

        it('Should dump simple array pretty', function () {
            debug.inspect([1,2,3]).should.be.string('[ 1, 2, 3 ]');                
        });

        it('Should dump another simple array equally pretty', function () {
            debug.inspect([1,"yes",3]).should.be.string("[ 1, 'yes', 3 ]");
        });
    });

    describe('#inspect() -> _inspectObject()', function () {
        it('Should dump a simple object real nice', function () {
            var tests = {
                "{ 4: 4, en: 1, to: 'to', tre: 'tretretre' }": {
                    en: 1,
                    to: "to",
                    "tre": "tretretre",
                    4: 4
                },
                "{ 1: 'en', 2: 'to', 3: 'tre' }": {
                    3: "tre",
                    1: "en",
                    2: "to"
                }
            };
            u.each(tests, function(obj, str) {
                debug.inspect(obj).should.be.string(str);
            });
        });
        /* it('', function () {}); */
    });
    describe('#inspect() -> _inspectFunction()', function () {
        it('Should dump a function as it should', function () {
            var test = function () {
                return true;
            };

            debug.inspect(test).should.be.string("[Function]");
        });
    });
    describe('#inspect() -> complex objects', function () {
        it('Should dump a nested structure in the desired fashion', function () {
            debug.inspect({
                en: "en",
                2: "to",
                tre: {
                    en: 1, to: "to"
                }
            }).should.be.string(
                "{\n" +
                "  2: 'to',\n" +
                "  en: 'en',\n" +
                "  tre: {\n" +
                "    en: 1,\n" +
                "    to: 'to'\n" +
                "  }\n" +
                " }"   
            );
        });
    });
});
