import { Point, Ray, Vector } from "../geometry/geometry";

export class Camera {
    direction: Ray = new Ray(new Point(0, 0, -1), new Vector(0, 0, 1)); // points forward
    roll: Vector = new Vector(1, 0, 0);  // points right, should be normal to direction
    slope: number = 0.1;  // fov, 0.5 is 90 degrees, 1.0 is 180 degrees
    up: Vector;


    constructor(direction?: Ray, roll?: Vector, slope?: number) {
        if (direction) {
            this.direction = direction;
        }
        if (roll) {
            this.roll = roll;
        }
        if (slope) {
            this.slope = slope;
        }
        if (Math.abs(this.roll.dot(this.direction.direction)) > 1e-6) {
            throw new Error("Camera roll must be perpendicular to direction");
        }
        this.up = this.direction.direction.cross(this.roll).normalized();
    }

    // Ray declined from direction by x*roll*slope + y*up*slope.
    fovRay(x: number, y: number): Ray {
        let dir = new Vector(
            this.direction.direction.x + this.roll.x * x * this.slope + this.up.x * y * this.slope,
            this.direction.direction.y + this.roll.y * x * this.slope + this.up.y * y * this.slope,
            this.direction.direction.z + this.roll.z * x * this.slope + this.up.z * y * this.slope);
        return new Ray(this.direction.origin, dir);
    }
}