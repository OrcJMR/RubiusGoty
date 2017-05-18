export class Point {

    public y: number;
    public x: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    public Translate(x, y) {
        return new Point(this.x + x, this.y + y);
    }

    public Rotate(angle) {
        const cosa = Math.cos(angle);
        const sina = Math.sin(angle);
        return new Point(
            this.x * cosa - this.y * sina,
            this.x * sina + this.y * cosa);
    }
}
