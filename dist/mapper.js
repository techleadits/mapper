"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectPath = require("object-path");
var Mapper = /** @class */ (function () {
    function Mapper(_specialMappings) {
        this._specialMappings = _specialMappings;
    }
    Object.defineProperty(Mapper.prototype, "mappings", {
        get: function () {
            return this._specialMappings;
        },
        enumerable: true,
        configurable: true
    });
    Mapper.prototype.map = function (object1, object2) {
        return mapper(object1, object2, this._specialMappings);
    };
    return Mapper;
}());
exports.Mapper = Mapper;
function classMap(saida, entrada, force) {
    if (force === void 0) { force = true; }
    var newSaida = {};
    for (var id in saida) {
        if (saida.hasOwnProperty(id)) {
            newSaida[id] = undefined;
        }
    }
}
exports.classMap = classMap;
/**
 * @deprecated use map instead
 */
function mapper(saida, entrada, paths) {
    if (paths === void 0) { paths = null; }
    return map(entrada, saida, paths);
}
exports.mapper = mapper;
function map(saida, entrada, paths) {
    if (saida === void 0) { saida = {}; }
    if (paths === void 0) { paths = {}; }
    if (!entrada) {
        return saida;
    }
    // no formato atual, saida e um clone completo do objeto passado por referencia. Não alteraremos o mesmo
    return _pathMap(entrada, saida, paths);
}
exports.map = map;
function isPrimitive(test) {
    return (test !== Object(test));
}
function _paths(saida, entrada, paths) {
    var _loop_1 = function (id) {
        if (paths.hasOwnProperty(id)) {
            var pathsPossibilities = void 0;
            if (!Array.isArray(paths[id])) {
                pathsPossibilities = [paths[id]];
            }
            else {
                pathsPossibilities = paths[id];
            }
            pathsPossibilities.forEach(function (element) {
                var data = objectPath.get(entrada, element);
                if (data !== undefined && data !== null) {
                    objectPath.set(saida, id, data);
                    return;
                }
            });
        }
    };
    for (var id in paths) {
        _loop_1(id);
    }
}
function isFile(obj) {
    try {
        return obj instanceof window.Blob || obj instanceof window['File'];
    }
    catch (_a) {
        return false;
    }
}
// não ordenado
function keyList() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var newArg = new Set();
    args.forEach(function (arg) {
        if (arg) {
            var keys = Object.keys(arg);
            keys.forEach(function (key) {
                newArg.add(key);
            });
        }
    });
    return newArg;
}
// ordenado
function objectKeyList() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var newArg = {};
    args.forEach(function (arg) {
        if (arg) { }
        var keys = Object.keys(arg);
        keys.forEach(function (key) {
            newArg[key] = undefined;
        });
    });
    return newArg;
}
function _object(saida, entrada, paramList, force) {
    if (force === void 0) { force = true; }
    if (entrada == null || entrada == undefined) {
        return saida;
    }
    if (saida == null || saida == undefined) {
        return entrada;
    }
    paramList = keyList(saida, entrada, paramList);
    if (isFile(saida)) {
        return entrada;
    }
    else if (Array.isArray(saida) && saida !== null && Array.isArray(entrada) && entrada !== null) {
        var newSaida = [];
        for (var id in entrada) {
            if (entrada.hasOwnProperty(id) && entrada[id]) {
                newSaida.push(_object(saida[id], entrada[id], undefined, force));
            }
        }
        return newSaida;
    }
    else if (entrada instanceof Date && saida instanceof Date) {
        return entrada;
    }
    else if (typeof saida === 'object' && saida !== null && typeof entrada === 'object' && entrada !== null) {
        var newSaida_1 = {};
        paramList.forEach(function (id) {
            newSaida_1[id] = _object(saida[id], entrada[id], undefined, force);
        });
        // for (const id in paramList) {
        //   if (saida.hasOwnProperty(id)) {
        //     newSaida[id] = _object(saida[id], entrada[id], force);
        //   }
        // }
        return newSaida_1;
    }
    else if (isPrimitive(saida) && (!saida || typeof entrada === typeof saida)) {
        return entrada;
    }
    else if (isPrimitive(saida) && (entrada instanceof Date && typeof saida === 'string' || saida instanceof Date && typeof entrada === 'string')) {
        return entrada;
    }
    else {
        return saida;
    }
}
// set undefined propertys in saida
function _copyIfNull(saida, entrada, force) {
    if (force === void 0) { force = true; }
    if (typeof entrada === 'object' && !Array.isArray(entrada)) {
        for (var id in entrada) {
            if (entrada.hasOwnProperty(id)) {
                if (saida == undefined) {
                    saida = entrada;
                }
                else {
                    var ret = _copyIfNull(saida[id], entrada[id], force);
                    if (ret) {
                        saida[id] = ret;
                    }
                }
            }
        }
    }
    else if (entrada && (!saida)) {
        return entrada;
    }
}
function _pathMap(entrada, saida, paths) {
    if (saida === void 0) { saida = {}; }
    if (paths === void 0) { paths = {}; }
    var newEntrada = _object(saida, entrada, undefined, true);
    _copyIfNull(newEntrada, saida, true);
    _paths(saida, newEntrada, paths);
    return newEntrada;
}
//# sourceMappingURL=mapper.js.map