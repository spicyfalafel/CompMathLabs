import {Point} from "../models/Point";

export class NewtonMethod {
    /*
    метод для получения конечной разности k-го порядка
     */
    static getDeltaY(k: number, i: number, allY: number[]) {
        if (k == 0) {
            return allY[i];
        }
        if (k == 1){
            return allY[i + 1] - allY[i];
        }
        return this.getDeltaY(k - 1, i + 1, allY) - this.getDeltaY(k - 1, i, allY);
    }

    static getN(x: number, points: Point[]): number {
        const n = points.length;
        const h = points[1].x - points[0].x;
        const allY = points.map(point => point.y)
        const t = (x - points[0].x) / h;
        let ans = points[0].y;

        function factorial(n: number): number {
            for (var o = n; n > 1;) o *= --n;
            return o;
        }

        for (let k = 1; k < n; k++) {
            const delta = this.getDeltaY(k, 0, allY);
            let tFriends = t;
            for (let i = 2; i <= k; i++) {
                tFriends = tFriends * (t - i + 1);
            }
            ans += tFriends / factorial(k) * delta;
        }
        return ans;
    }
}
