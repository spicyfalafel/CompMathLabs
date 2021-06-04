import {LinearApproximation} from './LinearApproximation';
import {ApproximatingFunction} from '../../models/ApproximationFunction';

export class PowerApproximation implements ApproximatingFunction {
  aValues: number[];

  getAValues(xValues: number[], yValues: number[]): number[] {
    const xV = xValues.map(val => Math.log(val));
    const yV = yValues.map(val => Math.log(val));
    console.log('xV', xV);
    console.log('yV', yV);
    const ab = new LinearApproximation()
      .getAValues(xV, yV);

    this.aValues = [Math.exp(ab[1]), ab[0]];
    console.log('aValues', this.aValues);
    console.log(ab[1], Math.exp(ab[0]));
    return this.aValues;
  }

  getPhi(x: number, a: number, b: number, c: number): number {
    return a * Math.pow(x, b);
  }

  getPhi1(x: number): number {
    return this.aValues[0] * Math.pow(x, this.aValues[1]);
  }

  getPhiString(aValues: number[]): string {
    if(isNaN(aValues[0]) || isNaN(aValues[1])){
      return 'ОДЗ';
    }
    return aValues[0].toFixed(3) + 'x^' + aValues[1].toFixed(3);
  }
}
