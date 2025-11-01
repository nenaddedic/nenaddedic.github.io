import React from 'react';
import { Scene } from '../scene/scene.js';
import { Camera } from '../scene/camera.js';
import { render } from '../scene/render.js';
import { generateBmp } from '../scene/bitmap.js';
import Bitmap from './bitmap.js';

export function RenderedScene({scene, camera, width, height}: {scene: Scene, camera: Camera, width: number, height: number}) {
    console.log("Updating RenderedScene with " + scene.getObjects().length + " objects");
    let bitmap = render(scene, camera, width, height);
    return (
        <div>
            <Bitmap pixels={bitmap} />
        </div>
    );
}

export default RenderedScene;