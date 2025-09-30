import react from "react";
import { TextInput } from "./textInput";
import { SceneColor, SphereSceneObject } from "../scene/sceneObject";
import { Point, Ray, Sphere, Vector } from "../geometry/geometry";
import { Scene } from "../scene/scene";
import RenderedScene from "./renderedScene";
import { Camera } from "../scene/camera";
import { parseScene } from "../parse/parseScene";

export default function VariableScene({width, height}: {width?: number, height?: number}) {
    const [numObjects, setNumObjects] = react.useState("1");
    const [scene, setScene] = react.useState(new Scene());
    const [description, setDescription] = react.useState("1 red sphere in the center");

    function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setNumObjects(event.target.value);
        // let n = Number(event.target.value);
        // let scale = 1000;
        // let zscale = 1000;
        // let rscale = 50;
        // let s = new Scene();
        // for (let i = 0; i < n; i++) {
        //     s.addObject(new SphereSceneObject(
        //         new Sphere(new Point(Math.random()*scale-scale/2, Math.random()*scale-scale/2, 10 + Math.random()*zscale-zscale/2),
        //             Math.random()*rscale+rscale/2),
        //         new SceneColor(Math.random(), Math.random(), Math.random())));
        // }
        console.log(description)
        let scene = parseScene(description)
        setScene(scene);
    }

    function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log("Handling description change " + event.target.value.length);
        setDescription(event.target.value);
        let scene = parseScene(event.target.value)
        setScene(scene);
    }

    let camera = new Camera(
        new Ray(new Point(0, 40, -100), new Vector(0, 0, 1)),
        new Vector(1, 0, 0),
        0.8);
    return (
        <div>
            <h1>Variable Scene</h1>
            <TextInput initialValue={description} onChange={handleDescriptionChange} />
            <RenderedScene scene={scene} camera={camera} width={width ? width : 200} height={height ? height : 200} />
        </div>
    );
}


