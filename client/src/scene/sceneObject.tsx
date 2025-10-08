import { Ray, Sphere, Point, Vector } from "../geometry/geometry.js";

export class SceneColor {
    r: number;
    g: number;
    b: number;

    constructor(r: number, g: number, b: number) {
        if (r < 0 || r > 1 || g < 0 || g > 1 || b < 0 || b > 1) {
            throw new Error("Color components must be in the range [0, 1]");
        }
        this.r = r;
        this.g = g;
        this.b = b;
    }

    static grey(value: number): SceneColor {
        return new SceneColor(value, value, value);
    }

    static white() {
        return new SceneColor(1.0, 1.0, 1.0);
    }

    multipliedBy(factor: number): SceneColor {
        return new SceneColor(
            Math.min(this.r * factor, 1.0),
            Math.min(this.g * factor, 1.0),
            Math.min(this.b * factor, 1.0));
    }
}

export interface SceneObject {
    intersectWithRay(ray: Ray): [Point, number][];
    getColor?(): SceneColor;
}

export class SphereSceneObject implements SceneObject {
    sphere: Sphere;
    color: SceneColor = SceneColor.white();
    constructor(sphere: Sphere, color?: SceneColor) {
        this.sphere = sphere;
        if (color) {
            this.color = color;
        }
    }
    intersectWithRay(ray: Ray) {
        return this.sphere.intersectWithRay(ray);
    }
    getColor() {
        return this.color;
    }
    
}

export function test() {
    let sphere = new SphereSceneObject(new Sphere({x:0, y:0, z:10}, 1));
    let ray = new Ray({x:0, y:0, z:0}, new Vector(0, 0, 1));
    let intersections = sphere.intersectWithRay(ray);
    console.assert(intersections.length === 2, `Expected 2 intersections, got ${intersections.length}`);
    console.assert(Math.abs(intersections[0][0].z - 9) < 1e-6, `Expected first intersection at z=9, got z=${intersections[0][0].z}`);
    console.assert(Math.abs(intersections[1][0].z - 11) < 1e-6, `Expected second intersection at z=11, got z=${intersections[1][0].z}`);
}