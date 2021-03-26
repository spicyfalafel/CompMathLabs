import {Method} from '../models/Method';
import {MathFunction} from '../models/MathFunction';
import {DataFromFormModel} from '../models/DataFromFormModel';

export class IterationMethod implements Method {
  constructor() {
    this.name = 'Метод итераций';
    this.headers = ['i','xi', 'xiPlus1', 'phixiPlus1', 'fxiplus1', 'absMinus'];
    this.iter = 0;
  }

  name;
  a: number;
  b: number;
  eps: number;
  func: MathFunction;
  pribl: number;

  iter: number;
  headers: string[];
  result: any[] = [];

  errors: string[];

  solve(): any[] {
    this.errors = [];
    const derivativeAMoreThanB: boolean = Math.abs(this.func.derivative(this.a))
      > Math.abs(this.func.derivative(this.b));

    const lambda = -1 /
      ((derivativeAMoreThanB) ? this.func.derivative(this.a) : this.func.derivative(this.b));
    const phiFunc = (x: number) => x + lambda * this.func.fnc(x);
    const xFuncDerivative = (x: number) => 1 + lambda * this.func.derivative(x);

    const q = Math.max(Math.abs(xFuncDerivative(this.a)), Math.abs(xFuncDerivative(this.b)));
    const numberToCompare = q <= 0.5 ? this.eps : (1 - q) * this.eps / q;
    if (q >= 1) {
      this.errors = ['Достаточное условие метода не выполняется']
      return;
    }

    let x = this.pribl;
    let diff = 10000000000000;
    do {
      const nextX = phiFunc(x);
      diff = Math.abs(nextX - x);
      this.result.push({
        i: ++this.iter,
        xi: x,
        x: nextX,
        phixiPlus1: phiFunc(nextX),
        fxiplus1: this.func.fnc(nextX),
        absMinus: diff
      });
      x = nextX;
    } while (diff > numberToCompare);
    const t = this.result;
    this.result = [];
    this.iter = 0;
    return t;
  }

  setData(data: DataFromFormModel) {
    this.a = data.a;
    this.b = data.b;
    this.eps = data.eps;
    this.func = data.func;
    this.pribl = data.pribl;
  }
}
