import react, { useEffect } from "react";
import { TextInput } from "./textInput.js";
import { Button } from "./button.js";
import { SceneColor, SphereSceneObject } from "../scene/sceneObject.js";
import { Point, Ray, Sphere, Vector } from "../geometry/geometry.js";
import { Scene } from "../scene/scene.js";
import RenderedScene from "./renderedScene.js";
import { Camera } from "../scene/camera.js";
import { parseScene } from "../parse/parseScene.js";
import {generate} from "../rpc_clients/gatewayService.js";

export default function VariableScene({width, height}: {width?: number, height?: number}) {
    const [numObjects, setNumObjects] = react.useState("1");
    const [renderText, setRenderText] = react.useState("Render");
    const [scene, setScene] = react.useState(new Scene());
    const [description, setDescription] = react.useState("1 red sphere in the center");
    const [sceneDescription, setSceneDescription] = react.useState("something");

    useEffect(() => {
        const f = async () => {
            const r = await generate("hello world");
            setDescription(r);
        }
        f();
    }, []);

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

    async function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log("Handling description change " + event.target.value);
        setDescription(event.target.value);
        
    }

    async function generateAndRender() {
        console.log("Generating and rendering: " + description);
        class spinner {
            i = 0;
            c = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

            next() {
                setRenderText("generating " + this.c[this.i]);
                this.i = (this.i+1)%this.c.length;
            }
        }
        let s = new spinner();
        var intId = setInterval(() => s.next(), 20);
        generate(description).then((resp) => {
            clearInterval(intId);
            setRenderText("Render");
            setSceneDescription(resp);
            let scene = parseScene(resp);
            setScene(scene);
        });
    }
        
    let camera = new Camera(
        new Ray(new Point(0, 0, -100), new Vector(0, 0, 1)),
        new Vector(1, 0, 0),
        0.8);
    return (
        <div>
            <h1>Variable Scene</h1>
            <TextInput initialValue={description} onChange={handleDescriptionChange} />
            <Button text={renderText} onClick={generateAndRender} />
            <RenderedScene scene={scene} camera={camera} width={width ? width : 200} height={height ? height : 200} />
        </div>
    );
}
