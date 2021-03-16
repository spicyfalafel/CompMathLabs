import {Method} from '../models/Method';
import {MathFunction} from '../models/MathFunction';

export class HalfMethod implements Method {

  constructor() {
    this.name = 'Метод половинного деления';
    this.iter = 0;
    this.headers = ['Итерация','a', 'b', 'x', 'F(a)', 'F(b)', 'F(x)', '|a-b|'];
  }

  name: string;
  result = [];
  headers: string[];
  a: number;
  b: number;
  eps: number;
  func: MathFunction;
  iter: number;

  solve(): any[] {
    while (this.iteration() > this.eps) {
    }
    return this.result;
  }

  iteration(): number {
    const fun = this.func.fnc;
    const fa = fun(this.a);
    const fb = fun(this.b);
    const x = (fa + fb) / 2.0;
    this.result.push({
      i: ++this.iter,
      a: this.a,
      b: this.b,
      x: x,
      fa: fa,
      fb: fb,
      fx: fun(x),
      absAMinusB: Math.abs(this.a - this.b)
    });
    return (fa + fb) / 2.0;
  }
}
