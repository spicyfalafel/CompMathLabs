import {Component, OnInit} from '@angular/core';
import {Method} from './models/Method';
import {MathFunction} from './models/MathFunction';
import {HalfMethod} from './methods/HalfMethod';
import {IterationMethod} from './methods/IterationMethod';
import {SecantMethod} from './methods/SecantMethod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  functions = [
    {
      view: 'x³-3,125x²-3,5x+2,458',
      fnc: x => x * x * x - 3.125 * x * x - 3.5 * x + 2.458
    },
    {
      view: '3x³+4,75x²-1,5x+7,525',
      fnc: x => x * x * x * 3 + 4.76 * x * x - 1.5 * x + 7.525
    },
    {
      view: '-x³+1,625x²+10,5x-1,458',
      fnc: x => -x * x * x + 1.625 * x * x + 10.5 * x - 1.458
    }
  ];

  meth: Method;
  func: MathFunction = this.functions[0];
  headers: string[];
  rows: any[];
  methods: Method[];

  start: number;
  end: number;
  eps: number;

  result: number;
  getFunc(function1: MathFunction) {
    this.func = function1;
  }

  getMeth(method: Method) {
    this.meth = method;
    this.solve()
  }

  solve(){
    this.meth.a = this.start;
    this.meth.b = this.end;
    this.meth.eps = this.eps;
    this.meth.func = this.func;
    const res = this.meth.solve()
    this.result = res[res.length - 1].x;
    console.log('headers', this.meth.headers)
    this.headers = this.meth.headers;
    console.log('result', this.meth.result)
    this.rows = res;
    console.log("solved: ", this.result)
  }

  getStart(start: Number) {
    this.start = +start;
  }

  getEnd(end: Number) {
    this.end = +end;
  }

  getEps(eps: Number) {
    this.eps = +eps;
  }

  ngOnInit(): void {
    this.methods = [new HalfMethod(), new IterationMethod(), new SecantMethod()]
  }
}
