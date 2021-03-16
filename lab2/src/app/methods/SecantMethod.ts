import {Method} from '../models/Method';
import {MathFunction} from '../models/MathFunction';

export class SecantMethod implements Method {
  constructor() {
    this.name = "Метод секущих";
  }
  name: string;


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
