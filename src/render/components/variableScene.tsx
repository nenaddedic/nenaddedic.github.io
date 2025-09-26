import react from "react";
import { TextInput } from "./textInput";
import { SceneColor, SphereSceneObject } from "../scene/sceneObject";
import { Point, Ray, Sphere, Vector } from "../geometry/geometry";
import { Scene } from "../scene/scene";
import RenderedScene from "./renderedScene";
import { Camera } from "../scene/camera";

export default function VariableScene() {
    const [numObjects, setNumObjects] = react.useState("1");
    const [scene, setScene] = react.useState(new Scene());
    
    function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNumObjects(event.target.value);
        console.log(event.target.value);
        let n = Number(event.target.value);
        if (isNaN(n) || n < 0) {
            n = 1;
        }
        let s = new Scene();
        for (let i = 0; i < n; i++) {
            s.addObject(new SphereSceneObject(
                new Sphere(new Point(Math.random()*100-50, Math.random()*100-50, 10 + Math.random()*5),
                 1 + Math.random()*10),
                new SceneColor(Math.random(), Math.random(), Math.random())));
        }
        setScene(s);
        console.log(`Scene now has ${s.getObjects().length} objects.`);
    }

    let camera = new Camera(new Ray(new Point(0, 0, -100), new Vector(0, 0, 1)));
    let width = 200;
    let height = 201;
    return (
        <div>
            <h1>Variable Scene</h1>
            <input type="text" placeholder="Number of objects" value={numObjects} onChange={handleTextChange} />
            <RenderedScene scene={scene} camera={camera} width={width} height={height} />
        </div>
    );
}