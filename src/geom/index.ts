import { Mbr } from "./mbr";
import { Point } from "./point";
import { Rect } from "./rect";

const Geom = {
    Point,
    Mbr,
    Rect,

    OverlapMbr(r1, r2): boolean {
        // in this coords r1 is in the origin and along axis
        const rotrect = r2.Translate(-r1.x, -r1.y).Rotate(-r1.angle);
        const mbr = rotrect.GetMbr();

        const xmin = -r1.width / 2;
        const xmax = r1.width / 2;
        const ymin = -r1.height / 2;
        const ymax = r1.height / 2;

        // if r2 projection on r1 edges overlaps the edges
        return (mbr.xmax > xmin) && (mbr.xmin < xmax) && (mbr.ymax > ymin) && (mbr.ymin < ymax);
    },

    Intersect(rect1, rect2): boolean {
        if (!Geom.OverlapMbr(rect1, rect2)) { return false; }
        if (!Geom.OverlapMbr(rect2, rect1)) { return false; }

        return true;
    },

    FindPointsInRect(r1, r2): Point[] {
        const rotrect = r2.Translate(-r1.x, -r1.y).Rotate(-r1.angle);

        const xmin = -r1.width / 2;
        const xmax = r1.width / 2;
        const ymin = -r1.height / 2;
        const ymax = r1.height / 2;

        const w = rotrect.width;
        const h = rotrect.height;
        const retval: Point[] = [];
        const testFunc = (p: Point) => {
            if (p.x < xmax && p.x > xmin && p.y < ymax && p.y > ymin) {
                const cpoint = p.Rotate(r1.angle).Translate(r1.x, r1.y); // .Rotate(r1.angle).Translate(r1.x, r1.y);
                retval.push(cpoint);
            }
        };
        testFunc((new Geom.Point(w / 2, -h / 2)).Rotate(rotrect.angle).Translate(rotrect.x, rotrect.y));
        testFunc((new Geom.Point(w / 2, h / 2)).Rotate(rotrect.angle).Translate(rotrect.x, rotrect.y));
        testFunc((new Geom.Point(-w / 2, h / 2)).Rotate(rotrect.angle).Translate(rotrect.x, rotrect.y));
        testFunc((new Geom.Point(-w / 2, -h / 2)).Rotate(rotrect.angle).Translate(rotrect.x, rotrect.y));
        return retval;
    },

    Intersect2(rect1, rect2): Point[] {
        // dbg = printRect(rect1) + "<br/>" + printRect(rect2) + "<br/><br/>";
        const arr1 = Geom.FindPointsInRect(rect1, rect2);
        const arr2 = Geom.FindPointsInRect(rect2, rect1);
        const arr = arr1.concat(arr2);
        return arr;
    }
};

export default Geom;
