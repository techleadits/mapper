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
function classMap(entrada, saida, force) {
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
function mapper(entrada, saida, paths) {
    if (paths === void 0) { paths = null; }
    return map(entrada, saida, paths);
}
exports.mapper = mapper;
function map(entrada, saida, paths) {
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
function _object(saida, entrada, force) {
    if (force === void 0) { force = true; }
    if (saida instanceof File) {
        return entrada;
    }
    else if (Array.isArray(saida) && saida !== null) {
        var newSaida = [];
        for (var id in saida) {
            if (saida.hasOwnProperty(id)) {
                if (entrada[id]) {
                    newSaida.push(_object(saida[id], entrada[id], force));
                }
            }
        }
        return newSaida;
    }
    else if (entrada instanceof Date && saida instanceof Date) {
        return entrada;
    }
    else if (typeof saida === 'object' && saida !== null) {
        var newSaida = {};
        for (var id in saida) {
            if (saida.hasOwnProperty(id)) {
                newSaida[id] = _object(saida[id], entrada[id], force);
            }
        }
        return newSaida;
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
                var ret = _copyIfNull(saida[id], entrada[id], force);
                if (ret) {
                    saida[id] = ret;
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
    var newEntrada = _object(entrada, saida, true);
    _copyIfNull(newEntrada, saida, true);
    _paths(saida, newEntrada, paths);
    return newEntrada;
}
//# sourceMappingURL=mapper.js.map