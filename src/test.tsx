import { test, test as testGeometry } from "./render/geometry/geometry";
import { test as testScene} from "./render/scene/sceneObject";

export function runTests() {
    for (let t of [testGeometry, testScene]) {
        console.log("Running test: " + t.name);
        t();
    }
    console.log("Tests complete");
}
