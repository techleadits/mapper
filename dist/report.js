"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var reportFolder = './report';
function genReport(baseFolder, fileName, content) {
    var folder = reportFolder + "/" + baseFolder;
    return fs.ensureDir("" + folder).then(function () {
        return fs.writeJSON(folder + "/" + fileName + ".json", content, { spaces: 2 });
    });
}
exports.genReport = genReport;
//# sourceMappingURL=report.js.map