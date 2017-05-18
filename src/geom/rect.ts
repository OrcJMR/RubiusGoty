import { Mbr } from "./mbr";
import { Point } from "./point";

export class Rect {
    public angle: number;
    public height: number;
    public width: number;
    public y: number;
    public x: number;

    constructor(x, y, width, height, angle) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;
    }

    public GetMbr(): Mbr {
        const w = this.width;
        const h = this.height;

        let p = (new Point(w / 2, -h / 2)).Rotate(this.angle).Translate(this.x, this.y);

        let xmin = p.x;
        let xmax = p.x;
        let ymin = p.y;
        let ymax = p.y;

        p = (new Point(w / 2, h / 2)).Rotate(this.angle).Translate(this.x, this.y);

        if (p.x > xmax) { xmax = p.x; }
        if (p.x < xmin) { xmin = p.x; }
        if (p.y > ymax) { ymax = p.y; }
        if (p.y < ymin) { ymin = p.y; }

        p = (new Point(-w / 2, h / 2)).Rotate(this.angle).Translate(this.x, this.y);

        if (p.x > xmax) { xmax = p.x; }
        if (p.x < xmin) { xmin = p.x; }
        if (p.y > ymax) { ymax = p.y; }
        if (p.y < ymin) { ymin = p.y; }

        p = (new Point(-w / 2, -h / 2)).Rotate(this.angle).Translate(this.x, this.y);

        if (p.x > xmax) { xmax = p.x; }
        if (p.x < xmin) { xmin = p.x; }
        if (p.y > ymax) { ymax = p.y; }
        if (p.y < ymin) { ymin = p.y; }

        return new Mbr(xmin, xmax, ymin, ymax);
    }

    public Translate(x, y): Rect {
        return new Rect(this.x + x, this.y + y, this.width, this.height, this.angle);
    }

    public Rotate(angle): Rect {
        const cosa = Math.cos(angle);
        const sina = Math.sin(angle);
        const newrect = new Rect(
            this.x * cosa - this.y * sina,
            this.x * sina + this.y * cosa,
            this.width,
            this.height,
            this.angle + angle
        );
        return newrect;
    }
}
