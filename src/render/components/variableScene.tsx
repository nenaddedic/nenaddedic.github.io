import react from "react";
import { TextInput } from "./textInput";
import { SceneColor, SphereSceneObject } from "../scene/sceneObject";
import { Point, Ray, Sphere, Vector } from "../geometry/geometry";
import { Scene } from "../scene/scene";
import RenderedScene from "./renderedScene";
import { Camera } from "../scene/camera";

export default function VariableScene({width, height}: {width?: number, height?: number}) {
    const [numObjects, setNumObjects] = react.useState("1");
    const [scene, setScene] = react.useState(new Scene());
    
    function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNumObjects(event.target.value);
        let n = Number(event.target.value);
        if (isNaN(n) || n < 0) {
            n = 1;
        }
        let scale = 1000;
        let zscale = 1000;
        let rscale = 50;
        let s = new Scene();
        for (let i = 0; i < n; i++) {
            s.addObject(new SphereSceneObject(
                new Sphere(new Point(Math.random()*scale-scale/2, Math.random()*scale-scale/2, 10 + Math.random()*zscale-zscale/2),
                    Math.random()*rscale+rscale/2),
                new SceneColor(Math.random(), Math.random(), Math.random())));
        }
        setScene(s);
    }

    let camera = new Camera(
        new Ray(new Point(0, 0, -1000), new Vector(0, 0, 1)),
        new Vector(1, 0, 0),
        0.8);
    return (
        <div>
            <h1>Variable Scene</h1>
            <input type="text" placeholder="Number of objects" value={numObjects} onChange={handleTextChange} />
            <RenderedScene scene={scene} camera={camera} width={width ? width : 200} height={height ? height : 200} />
        </div>
    );
}