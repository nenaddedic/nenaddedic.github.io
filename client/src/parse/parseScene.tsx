import { Scene } from "../scene/scene.js";
import { SphereSceneObject } from "../scene/sceneObject.js";
import { Point, Vector, Sphere } from "../geometry/geometry.js";
import { SceneColor } from "../scene/sceneObject.js";
import { Camera } from "../scene/camera.js";
import { Ray } from "../geometry/geometry.js";

// Top level object representing a scene to be rendered.
interface SerializedScene {
    // Parameters of the camera from which the scene is viewed.
    camera?: SerializedCamera;

    // Width of the rendering surface in pixels.
    width?: number;

    // Height of the rendering surface in pixels.
    height?: number;

    // List of objects in the scene.
    objects: SerializedObject[];
}

interface SerializedCamera {
    // Camera position (x, y, z), direction (dx, dy, dz), roll (right vector) (rx, ry, rz), and slope.
    // Slope defines the field of view: larger slope means larger field of view.
    // A slope of 1 means that the width of the view at distance 1 from the camera is 2.
    // A slope of 0.5 means that the width of the view at distance 1 from the camera is 1.
    // A slope of 2 means that the width of the view at distance 1 from the camera is 4.
    // The height of the view is determined by the aspect ratio (width / height) of the rendering surface.
    // The direction and roll vectors must be orthogonal and normalized.
    // The up vector is computed as the cross product of direction and roll.
    // The camera looks in the direction of the direction vector, with the top of the view aligned with the up vector.
    // The right side of the view is aligned with the roll vector.
    // Example: {position: [0, 0, -10], direction: [0, 0, 1], roll: [1, 0, 0], slope: 0.5}
    position: [number, number, number];
    direction: [number, number, number];
    roll: [number, number, number]; // right vector
    slope: number;
}

interface SerializedObject {
    // Currently, only spheres are supported.
    sphere: {
        // A sphere is defined by its center (x, y, z) and radius.
        // Example: {type: "sphere", center: [0, 0, 10], radius: 1, color: [1, 0, 0]}
        center: [number, number, number];
        radius: number;
    };
    // The color is optional and defaults to white if not provided.
    color: [number, number, number];
}

export function parseScene(input: string): Scene {
    console.log("Parsing scene: " + input);
    const data = JSON.parse(input) as SerializedScene;
    const scene = new Scene();
    for (const obj of data.objects) {
        if (obj.sphere) {
            scene.addObject(new SphereSceneObject(
                new Sphere(new Point(...obj.sphere.center), obj.sphere.radius),
                new SceneColor(...obj.color)
            ));
        }
    }
    // if (data.camera) {
    //     const camera = new Camera(
    //         new Ray(new Point(...data.camera.position), new Vector(...data.camera.direction)),
    //         new Vector(...data.camera.roll),
    //         data.camera.slope
    //     );
    // }
    return scene
}

