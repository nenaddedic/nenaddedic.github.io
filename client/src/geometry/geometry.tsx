export class Point {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class Vector {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  normalized(): Vector {
    const length = this.length();
    if (length === 0) {
      throw new Error("Cannot normalize a zero-length vector");
    }
    return new Vector(this.x / length, this.y / length, this.z / length);
  }

  dot(other: Vector): number {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  cross(other: Vector): Vector {
    return new Vector(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  }
}

export class Ray {
    origin: Point;
    direction: Vector;

    constructor(origin: Point, direction: Vector) {
        this.origin = origin;
        this.direction = direction.normalized();
    }

    static fromPoints(origin: Point, destination: Point): Ray {
        return new Ray(origin, new Vector(
            destination.x - origin.x,
            destination.y - origin.y,
            destination.z - origin.z
        ).normalized())
    }
}

export class Sphere {
    center: Point;
    radius: number;

    constructor(center: Point, radius: number) {
        this.center = center;
        this.radius = radius;
    }

    intersectWithRay(ray: Ray): [Point, number][] {
        let L = new Vector(ray.origin.x - this.center.x,
                           ray.origin.y - this.center.y,
                           ray.origin.z - this.center.z);
        let delta = (ray.direction.dot(L))**2 - (L.dot(L) - this.radius**2);
        if (delta < 0) {
            return [];
        }
        let ta = [];

        if (delta === 0) {
            let t = -ray.direction.dot(L);
            ta.push(t);
        } else {
            let t1 = -ray.direction.dot(L) + Math.sqrt(delta);
            let t2 = -ray.direction.dot(L) - Math.sqrt(delta);
            if (t1 > 0) ta.push(t1);
            if (t2 > 0) ta.push(t2);
            ta.sort((a, b) => a - b);
        }
        let out: [Point, number][] = [];
        for (let t of ta) {
            let p = new Point(
                ray.origin.x + t * ray.direction.x,
                ray.origin.y + t * ray.direction.y,
                ray.origin.z + t * ray.direction.z
            );
            let v = new Vector(p.x - this.center.x,
                                p.y - this.center.y,
                                p.z - this.center.z).normalized();
            out.push([p, v.dot(ray.direction)]);
        }
        return out;
    }
}

export function test() {
    let s = new Sphere(new Point(0, 0, 10), 1);
    let r = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1));
    console.assert(s.intersectWithRay(r).length === 2, `Expected 2 intersections, got ${s.intersectWithRay(r).length}`);
    console.assert(Math.abs(s.intersectWithRay(r)[0][0].z - 9) < 1e-6, `Expected first intersection at z=9, got z=${s.intersectWithRay(r)[0][0].z}`);
    console.assert(Math.abs(s.intersectWithRay(r)[1][0].z - 11) < 1e-6, `Expected second intersection at z=11, got z=${s.intersectWithRay(r)[1][0].z}`);
    console.assert(Math.abs(s.intersectWithRay(r)[0][0].x - 0) < 1e-6, `Expected first intersection at x=0, got x=${s.intersectWithRay(r)[0][0].x}`);
    console.assert(Math.abs(s.intersectWithRay(r)[1][0].x - 0) < 1e-6, `Expected second intersection at x=0, got x=${s.intersectWithRay(r)[1][0].x}`);
    console.assert(Math.abs(s.intersectWithRay(r)[0][0].y - 0) < 1e-6, `Expected first intersection at y=0, got y=${s.intersectWithRay(r)[0][0].y}`);
    console.assert(Math.abs(s.intersectWithRay(r)[1][0].y - 0) < 1e-6, `Expected second intersection at y=0, got y=${s.intersectWithRay(r)[1][0].y}`);

    r = new Ray(new Point(0, 0, 0), new Vector(1, 0, 0));
    console.assert(s.intersectWithRay(r).length === 0, `Expected 0 intersections, got ${s.intersectWithRay(r).length}`);

    r = new Ray(new Point(0, 0, 0), new Vector(0.01, 0, 1));
    console.assert(s.intersectWithRay(r).length === 2, `Expected 2 intersections, got ${s.intersectWithRay(r).length}`);
    console.assert(s.intersectWithRay(r)[0][0].x < s.intersectWithRay(r)[1][0].x, `Expected first intersection to be more to the left`);

    s = new Sphere(new Point(0, 0, 0), 1); // r at 1, 0, 0
    r = new Ray(new Point(-1, 0, -2), new Vector(0, 0, 1));
    console.assert(s.intersectWithRay(r).length === 1, `Expected 1 intersection, got ${s.intersectWithRay(r).length}`);
    r = new Ray(new Point(-1, 0, -2), new Vector(1, 0, 1));
    console.assert(s.intersectWithRay(r).length === 2, `Expected 2 intersections, got ${s.intersectWithRay(r).length}`);
    console.assert(Math.abs(s.intersectWithRay(r)[1][0].x - 1) < 1e-6 , `Expected second intersection at x=1, got x=${s.intersectWithRay(r)[0][0].x}`);
    console.assert(Math.abs(s.intersectWithRay(r)[1][0].z - 0) < 1e-6 , `Expected second intersection at z=1, got z=${s.intersectWithRay(r)[0][0].z}`);
}