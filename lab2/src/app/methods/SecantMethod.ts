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
  pribl: number;
  errors = []
  xi1: number;
  xi: number;

  solve(): any[] {
    this.errors = [];
    if(this.pribl<this.a || this.pribl > this.b){
      this.errors.push("Выберите x0 из [a;b]")
    }
    this.xi1 = this.pribl;
    this.xi = this.pribl + this.eps;
    while (this.iteration(this.xi1, this.xi)) {
    }
    const t = this.result;
    console.log("t", t);
    this.result = [];
    this.iter = 0;
    return t;
  }


  private iteration(xi1: number, xi: number) {
    const fun = this.func.fnc;
    const f1 = fun(xi1);
    const f2 = fun(xi);
    const x = xi - ((xi - xi1) / (f2 - f1)) * f2;
    if(isNaN(x)){
      this.errors.push("Деление на 0")
    }
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
    console.log("x-xi", x-xi);
    console.log("Math.abs(x - xi) > this.eps", Math.abs(x - xi) > this.eps);
    return Math.abs(x - xi) > this.eps && Math.abs(fx) > this.eps;
  }

  setData(data: DataFromFormModel) {
    this.a = data.a;
    this.b = data.b;
    this.eps = data.eps;
    this.func = data.func;
    this.pribl = data.pribl;
  }
}
