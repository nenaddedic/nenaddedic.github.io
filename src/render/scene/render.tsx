import { Scene } from "./scene";
import { Camera } from "./camera";
import { Pixel } from "../bitmap";
import { Ray, Point, Vector } from "../geometry/geometry";
import { SceneObject } from "./sceneObject";

type IntersectionResult = { point: Point; object: any };

export function render(scene: Scene, camera: Camera, width: number, height: number): Array<Array<Pixel>> {
function findClosestIntersection(ray: Ray, objects: Array<SceneObject>): IntersectionResult | null {
        let closestPoint: Point | null = null;
        let closestObject: any = null;
        let minDistance = Infinity;

        for (const obj of scene.getObjects()) {
            const intersection = obj.intersectWithRay(ray);
            if (intersection.length > 0) {
                const d = new Vector(intersection[0].x - ray.origin.x,
                                     intersection[0].y - ray.origin.y,
                                     intersection[0].z - ray.origin.z);
                const distance = d.length();
                if (distance < minDistance) {
                    minDistance = distance;
                    closestPoint = intersection[0];
                    closestObject = obj;
                }
            }
        }
        if (closestPoint === null) {
            return null;
        }
        return {point: closestPoint, object: closestObject};
    }

        let out = new Array(height);
        for (let i = 0; i < height; i++) {
            out[i] = new Array(width);
        }
        // Rendering logic goes here
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                //console.log(`Rendering pixel (${x}, ${y})`);
                let ray = Ray.fromPoints(
                    camera.orientation.origin, new Point(x-width/2, y-height/2, 0));
                //console.log(`Ray: origin=(${ray.origin.x}, ${ray.origin.y}, ${ray.origin.z}) direction=(${ray.direction.x}, ${ray.direction.y}, ${ray.direction.z})`);
                let intersection = findClosestIntersection(ray, scene.getObjects());
                //console.log(`intersection = ${intersection}`);
                if (intersection) {
                    out[y][x] = Pixel.fromSceneColor(intersection.object.getColor());
                } else {
                    out[y][x] = new Pixel(0, 0, 0); // Black for miss
                }
            }
        }
        return out;
    }

