import { test, test as testGeometry } from "./geometry/geometry";
import { test as testScene} from "./scene/sceneObject";

export function runTests() {
    for (let t of [testGeometry, testScene]) {
        console.log("Running test: " + t.name);
        t();
    }
    console.log("Tests complete");
}
