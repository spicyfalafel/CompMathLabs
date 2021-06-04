import {ApproximatingFunction} from '../../models/ApproximationFunction';

export class LinearApproximation implements ApproximatingFunction {
    aValues: number[];

    getPhiString(aValues: number[]): string {
        const znak = aValues[1] > 0 ? ' + ' : ' ';
        return aValues[0].toFixed(3) + 'x' + znak + (aValues[1] < 0.001 ?
            '+ 0' : aValues[1].toFixed(3));
    }

    getAValues(xValues: number[], yValues: number[]): number[] {
        let SX = 0;
        const n = xValues.length;
        for (const xi of xValues) {
            SX += xi;
        }
        let SXX = 0;
        for (const xi of xValues) {
            SXX += xi * xi;
        }
        let SY = 0;
        for (const yi of yValues) {
            SY += yi;
        }
        let SXY = 0;
        for (let i = 0; i < n; i++) {
            SXY += yValues[i] * xValues[i];
        }
        //console.log(SX, SXX, SY, SXY)
        const delta = SXX * n - SX * SX;
        const delta1 = SXY * n - SX * SY;
        const delta2 = SXX * SY - SX * SXY;
        //console.log('delta', delta, 'delta1', delta1, 'delta2', delta2)
        const a = delta1 / delta;
        const b = delta2 / delta;
        this.aValues = [a, b];
        console.log(this.aValues);
        return this.aValues;
    }

    getPhi(x: number, a: number, b: number, c: number): number {
        return a * x + b;
    }

    getPhi1(x: number): number {
        return this.aValues[0] * x + this.aValues[1];
    }
}
