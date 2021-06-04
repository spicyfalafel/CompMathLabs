import {MatrixUtils} from '../MatrixUtils';
import {ApproximatingFunction} from '../../models/ApproximationFunction';

export class QuadraticApproximation implements ApproximatingFunction {
  aValues: number[];

  getAValues(xValues: number[], yValues: number[]): number[] {

    const n = xValues.length;
    let SX = 0;
    for (const xi of xValues) {
      SX += xi;
    }

    let SXX = 0;
    for (const xi of xValues) {
      SXX += xi * xi;
    }

    let SXXX = 0;
    for (const xi of xValues) {
      SXXX += xi * xi * xi;
    }

    let SXXXX = 0;
    for (const xi of xValues) {
      SXXXX += xi * xi * xi * xi;
    }

    let SY = 0;
    for (const yi of yValues) {
      SY += yi;
    }

    let SXY = 0;
    for (let i = 0; i < n; i++) {
      SXY += yValues[i] * xValues[i];
    }

    let SXXY = 0;
    for (let i = 0; i < n; i++) {
      SXXY += yValues[i] * xValues[i] * xValues[i];
    }

    const a: number[] = [n, SX, SXX];
    const b: number[] = [SX, SXX, SXXX];
    const c: number[] = [SXX, SXXX, SXXXX];
    const matrixCoeffs = [a, b, c];
    const matrixRight = [SY, SXY, SXXY];
    this.aValues = MatrixUtils.solveSLAU(matrixCoeffs, matrixRight);
    return this.aValues;
  }

  getPhi(x: number, a: number, b: number, c: number): number {
    return a + b * x + c * x * x;
  }


  getPhi1(x: number): number {
    return this.aValues[0] + this.aValues[1] * x + this.aValues[2] * x * x;
  }

  getPhiString(aValues: number[]): string {
    const znak2 = aValues[2] < 0 ? ' ' : ' + ';
    const znak3 = aValues[0] < 0 ? ' ' : ' + ';
    return aValues[1].toFixed(3)
      + 'x' + znak2 + aValues[2].toFixed(3) + 'x²' + znak3 + aValues[0].toFixed(3);
  }

}
