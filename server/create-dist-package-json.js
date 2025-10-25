import { EXTERNAL_DEPS } from "./external-deps.js";
import * as fs from "fs";
import * as path from "path";

const root_package_js = fs.readFileSync('package.json', 'utf-8');
const root_package = JSON.parse(root_package_js);
var deps = {}
for (const d of EXTERNAL_DEPS) {
    if (d in root_package.dependencies) {
        deps[d] = root_package.dependencies[d];
    }
}

var p = {
    main: "index.cjs",
    dependencies: deps
}

fs.writeFileSync('dist/server/package.json', JSON.stringify(p));
console.log('Wrote dist/server/package.json');
