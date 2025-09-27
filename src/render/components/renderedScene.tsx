import React from 'react';
import { Scene } from '../scene/scene';
import { Camera } from '../scene/camera';
import { render } from '../scene/render';
import { generateBmp } from '../bitmap';
import Bitmap from './bitmap';

export function RenderedScene({scene, camera, width, height}: {scene: Scene, camera: Camera, width: number, height: number}) {
    let bitmap = render(scene, camera, width, height);
    return (
        <div>
            <Bitmap pixels={bitmap} />
        </div>
    );
}

export default RenderedScene;