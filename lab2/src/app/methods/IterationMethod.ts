import {Method} from '../models/Method';
import {MathFunction} from '../models/MathFunction';
import {DataFromFormModel} from '../models/DataFromFormModel';

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

  setData(data: DataFromFormModel) {
    this.a = data.a;
    this.b = data.b;
    this.eps = data.eps;
    this.func = data.func;
  }

}
