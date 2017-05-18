export class Mbr {
    public ymax: number;
    public ymin: number;
    public xmax: number;
    public xmin: number;

    constructor(xmin, xmax, ymin, ymax) {
        this.xmin = xmin;
        this.xmax = xmax;
        this.ymin = ymin;
        this.ymax = ymax;
    }
}
