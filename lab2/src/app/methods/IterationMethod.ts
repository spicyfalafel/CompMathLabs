import {Method} from '../models/Method';
import {MathFunction} from '../models/MathFunction';

export class IterationMethod implements Method {
  constructor() {
    this.name = 'Метод итераций';
  }
  name;
  a: number;
  b: number;
  eps: number;
  func: MathFunction;


  headers: string[];
  result: any[];

  solve(): any[] {
    return [];
  }

}
