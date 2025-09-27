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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VariableScene width={500} height={500}  />
  </React.StrictMode>,
)
