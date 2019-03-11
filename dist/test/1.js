"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var fs = require("fs-extra");
var entrada = fs.readJSON("./tests/1/entrada.json");
var saida = fs.readJSON("./tests/1/saida.json");
Promise.all([entrada, saida]).then(function (array) {
    var saida = index_1.mapper(array[0], array[1]);
    console.log(saida);
}).catch(function (err) {
    console.error(err);
});
//# sourceMappingURL=1.js.map