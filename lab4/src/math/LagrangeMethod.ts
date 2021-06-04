import {Point} from "../models/Point";

export class LagrangeMethod {

    static getLn(x: number, points: Point[]): number {
        const n = points.length;
        const xValues = points.map(p => p.x);
        const yValues = points.map(p => p.y);
        let Ln = 0;
        for (let i = 0; i < n; i++) {
            let proizv = 1;

            for(let j = 0; j<n; j++){
                if(j == i) {
                    continue;
                }
                proizv *= (x-xValues[j]) / (xValues[i]-xValues[j]);
            }
            Ln += yValues[i] * proizv;
        }
        return Ln;
    }

}