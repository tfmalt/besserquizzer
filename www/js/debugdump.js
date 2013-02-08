/*jslint node: true, vars: true, newcap: true, nomen: true */
/*global _ */
/**
 * A simple debug library since phonegap is lacking som dump obj stuff.
 */

var dd = {};
(function (dd, u__) {
    var _inspect,
        _inspectArray,
        _inspectFunction,
        _inspectObject;

    var root = {};
    // var u    = _;

    _inspect = function (obj, depth, curr) {
        depth = depth || 2; // init depth if not set.

        if (u__.isString(obj)) return "'" + obj + "'";
        // if (curr == depth+1) return obj.toString();

        curr = curr || 0 ; // Curr is optional so init if not set.

        if (u__.isArray(obj))    return _inspectArray(    obj, depth, curr + 1 );
        if (u__.isFunction(obj)) return _inspectFunction( obj, depth, curr + 1 );
        if (u__.isObject(obj))   return _inspectObject(   obj, depth, curr + 1 );

        return obj.toString();
    };


    _inspectArray = function (obj, depth, curr) {
        // throw exception if not an array
        // console.log("DEBUG: " + curr + ":" + obj.toString());
        if (depth == curr - 1) return '[object Array]';
        var str = "[ ";
        u__.each(obj, function (val) {
            str += _inspect(val, depth, curr) + ", ";
        });
        str = str.replace(/, $/, "");
        str += " ]";

        return str;
    };

    _inspectObject = function (obj, depth, curr) {
        if (depth == curr - 1) return obj.toString();
        if (typeof obj == 'undefined') return '[undefined]';

        var indent = Array(Number(curr)).join("  ");
        var str    = "{\n";
        console.log("inside inspectobject: " + curr + ": " + obj.toString());
        u__.each(obj, function (val, key, list) {
            if (key.match(/ /g)) {
                key = "'" + key + "'";
            }
            str += indent + "  " + key + ": ";
            str += _inspect(val, depth, curr);
            str += ",\n";
        });
        str = str.replace(/,\n$/m, "");
        str += "\n" + indent + "}";

        return str;
    };

    _inspectFunction = function (obj, depth, curr) {
        // Maybe should throw error if not function 
        return "[Function]";
    };
    
    dd.inspect = _inspect;
    return dd;
})(dd, _);

