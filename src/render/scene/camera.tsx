import { Point, Ray } from "../geometry/geometry";

export class Camera {
    orientation: Ray;

    constructor(orientation: Ray) {
        this.orientation = orientation;
    }
}