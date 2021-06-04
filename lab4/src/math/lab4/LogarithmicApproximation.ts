import {ApproximatingFunction} from '../../models/ApproximationFunction';
import {LinearApproximation} from './LinearApproximation';

export class LogarithmicApproximation implements ApproximatingFunction {
  aValues: number[];
  getAValues(xValues: number[], yValues: number[]): number[] {
    const ab = new LinearApproximation().getAValues(xValues.map(val => Math.log(val)), yValues);
    this.aValues = [ab[0], ab[1]];
    return this.aValues;
  }

  getPhi(x: number, a: number, b: number, c: number): number{
    return a * Math.log(x) + b;
  }

  getPhi1(x: number): number{
    return this.aValues[0] * Math.log(x) + this.aValues[1];
  }

  getPhiString(aValues: number[]): string {
    if(isNaN(aValues[0]) || isNaN(aValues[1])){
      return 'ОДЗ';
    }
    const znak = aValues[1] > 0 ? ' + ' : '';
    return aValues[0].toFixed(3) + 'ln(x)' + znak + aValues[1].toFixed(3);
  }

}
