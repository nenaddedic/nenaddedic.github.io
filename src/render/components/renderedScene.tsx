import React from 'react';
import { Scene } from '../scene/scene';
import { Camera } from '../scene/camera';
import { render } from '../scene/render';
import { generateBmp } from '../bitmap';

export function RenderedScene({scene, camera, width, height}: {scene: Scene, camera: Camera, width: number, height: number}) {
    let bitmap = render(scene, camera, width, height);
    return (
        <div>
            <img src={"data:image/bmp;base64," + btoa(String.fromCharCode(...generateBmp(bitmap)))} alt="5x5 red bitmap" />

        </div>
    );
}

export default RenderedScene;