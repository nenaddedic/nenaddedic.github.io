import { SceneObject, SphereSceneObject } from "./sceneObject.js";

export class Scene {
    objects: Array<SceneObject>;

    constructor() {
        this.objects = new Array<SceneObject>();;
    }

    addObject(obj: SceneObject) {
        this.objects.push(obj);
    }

    getObjects(): Array<SceneObject> {
        return this.objects;
    }
}