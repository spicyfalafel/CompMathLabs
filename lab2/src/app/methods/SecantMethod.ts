import {Method} from '../models/Method';
import {MathFunction} from '../models/MathFunction';
import {DataFromFormModel} from '../models/DataFromFormModel';

export class SecantMethod implements Method {

  constructor() {
    this.name = 'Метод секущих';
    this.iter = 0;
    this.headers = ['i',
      'xIminus1',
      'xi',
      'x',
      'fxiPlus1',
      'absMinus'];
    this.result = [];
  }

  name: string;


  a: number;
  b: number;
  eps: number;
  func: MathFunction;
  headers: string[];
  result: any[];
  iter: number;

  solve(): any[] {
    this.xi1 = this.a;
    this.xi = this.b;
    while (this.iteration(this.xi1, this.xi)) {
    }
    const t = this.result;
    this.result = [];
    this.iter = 0;
    return t;
  }

  xi1: number;
  xi: number;

  private iteration(xi1: number, xi: number) {
    const fun = this.func.fnc;
    const f1 = fun(xi1);
    const f2 = fun(xi);

    const x = xi - ((xi - xi1) / (f2 - f1) * f2);
    console.log('x is ', x);
    const fx = fun(x);
    this.result.push({
      i: ++this.iter,
      xIminus1: xi1,
      xi: xi,
      x: x,
      fxiPlus1: fx,
      absMinus: Math.abs(x - xi)
    });
    this.xi = x;
    this.xi1 = xi;
    return Math.abs(x - xi) > this.eps && Math.abs(fx) > this.eps;
  }

  setData(data: DataFromFormModel) {
    this.a = data.a;
    this.b = data.b;
    this.eps = data.eps;
    this.func = data.func;
  }
}
