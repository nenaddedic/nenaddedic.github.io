import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import ModifiableImage from './render/components/modifiableImage'
import { RenderedScene } from './render/components/renderedScene';
import { Scene } from './render/scene/scene';
import { SceneColor, SphereSceneObject } from './render/scene/sceneObject';
import { Point, Ray, Sphere, Vector } from './render/geometry/geometry';
import { Camera } from './render/scene/camera';
import { runTests } from './test';
import VariableScene from './render/components/variableScene';

runTests();

let scene = new Scene();
scene.addObject(new SphereSceneObject(
    new Sphere(new Point(0, 0, 10), 10), new SceneColor(1, 0, 0)));
scene.addObject(new SphereSceneObject(
    new Sphere(new Point(1, 0, 20), 15), new SceneColor(1, 1, 0)));
let camera = new Camera(new Ray(new Point(0, 0, -100), new Vector(0, 0, 1)));
let width = 200;
let height = 200;
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <ModifiableImage />
    <VariableScene />
    <RenderedScene scene={scene} camera={camera} width={width} height={height} />
  </React.StrictMode>,
)
