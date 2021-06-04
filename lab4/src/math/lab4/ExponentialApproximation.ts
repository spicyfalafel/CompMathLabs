import {LinearApproximation} from './LinearApproximation';
import {ApproximatingFunction} from '../../models/ApproximationFunction';

export class ExponentialApproximation implements ApproximatingFunction {

  aValues: number[];

  getPhi(x: number, a: number, b: number, c: number): number {
    return a * Math.exp(b * x);
  }

  getPhi1(x: number): number {
    return this.aValues[0] * Math.exp(this.aValues[1] * x);
  }


  getPhiString(aValues: number[]): string {
    return aValues[0].toFixed(3) + 'e^' + aValues[1].toFixed(3) + 'x';
  }

  getAValues(xValues: number[], yValues: number[]): number[] {
    const yLn = yValues.map(val => Math.log(val));
    const ab = new LinearApproximation().getAValues(xValues, yLn);
    console.log(ab);
    this.aValues = [Math.exp(ab[1]), ab[0]];
    return this.aValues;
  }
}
