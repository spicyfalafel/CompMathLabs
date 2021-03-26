import {Method} from '../models/Method';
import {MathFunction} from '../models/MathFunction';
import {DataFromFormModel} from '../models/DataFromFormModel';

export class HalfMethod implements Method {

  constructor() {
    this.name = 'Метод половинного деления';
    this.iter = 0;
    this.headers = ['i', 'a', 'b', 'x', 'fa', 'fb', 'fx', 'absAMinusB'];
  }

  a: number;
  b: number;
  eps: number;
  func: MathFunction;
  secantsX: { x1: number, x2: number }[];

  setData(data: DataFromFormModel) {
    this.a = data.a;
    this.b = data.b;
    this.eps = data.eps;
    this.func = data.func;
    console.log('data func', data.func);
  }

  name: string;
  result: any[] = [];
  headers: string[];
  iter: number;

  solve(): any[] {

    this.errors = ['Нет корня на промежутке'];
    console.log('a', this.a, 'b', this.b);
    for (let i = this.a; i < this.b; i += (this.b- this.a) / 30) {
      if (!this.sameZnak(this.func.fnc(i), this.func.fnc(this.a))) {
        this.errors = [];
        break;
      }
    }

    while (this.iteration()) {
    }
    const t = this.result;
    this.result = [];
    this.iter = 0;
    return t;
  }

  sameZnak(a: number, b: number) {
    return (a >= 0 && b >= 0) || (a <= 0 && b <= 0);
  }

  errors: string[];

  iteration(): boolean {
    const fun = this.func.fnc;
    const fa = fun(this.a);
    const fb = fun(this.b);
    const x = (this.a + this.b) / 2.0;
    const fx = fun(x);
    this.result.push({
      i: ++this.iter,
      a: this.a,
      b: this.b,
      x: x,
      fa: fa,
      fb: fb,
      fx: fx,
      absAMinusB: Math.abs(this.a - this.b)
    });
    if (this.sameZnak(fa, fx)) {
      if (this.sameZnak(fb, fx)) {

        console.log(this.errors);
        return false;
      }
      this.a = x;
    } else {
      this.b = x;
    }
    return fx > this.eps || Math.abs(this.a - this.b) > this.eps;
  }
}
