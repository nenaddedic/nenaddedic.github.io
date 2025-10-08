import { test, test as testGeometry } from "./geometry/geometry.js";
import { test as testScene} from "./scene/sceneObject.js";

export function runTests() {
    for (let t of [testGeometry, testScene]) {
        console.log("Running test: " + t.name);
        t();
    }
    console.log("Tests complete");
}
