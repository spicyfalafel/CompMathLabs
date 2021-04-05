import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Method} from './models/Method';
import {HalfMethod} from './methods/HalfMethod';
import {IterationMethod} from './methods/IterationMethod';
import {SecantMethod} from './methods/SecantMethod';
import {DataFromFormModel} from './models/DataFromFormModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private changeDetection: ChangeDetectorRef) {
  }

  functions = [
    {
      view: 'x³-3,125cos(x)-3,5x+2,458',
      fnc: x => x * x * x - 3.125 * Math.cos(x) - 3.5 * x + 2.458,
      derivative: x => 3 * x * x + 6.25 * Math.sin(x) - 3.5,
      secondDerivative: x => 6 * x + 6.25 * Math.cos(x)
    },
    {
      view: '3x³+4,75 sin(x)-1,5x-50.5',
      fnc: x => x * x * x * 3 + 4.75 * Math.sin(x) - 1.5 * x - 50.5,
      derivative: x => 9 * x * x + 4.75 * Math.cos(x) - 1.5,
      secondDerivative: x => 18 * x - 4.75 / Math.sin(x)
    },
    {
      view: 'x^3-3,125x^2-3,5x+2,458',
      fnc: x => x * x * x - 3.125 * x * x - 3.5 * x + 2.458,
      derivative: x => 3 * x * x - 6.25 * x - 3.5,
      secondDerivative: x => 6 * x - 6.25
    }
  ];
  dataFormForm: DataFromFormModel;
  headers: string[];
  rows: any[];
  methods: Method[];

  result: number;

  errors: string[];
  errors2: string[];

  changeData(data) {
    this.errors2 = [];
    if ((isNaN(parseFloat(data.a)) ||
      isNaN(parseFloat(data.b)) ||
      isNaN(parseFloat(data.eps)) ||
      isNaN(parseFloat(data.pribl)))) {
      this.errors2 = ['Please use only numbers'];
      this.changeDetection.detectChanges();
      console.log('was nan');
    } else {
      this.dataFormForm = data;
      this.dataFormForm.method.setData(this.dataFormForm);
      console.log('changed dataFormForm: ', this.dataFormForm);
    }
  }

  i:number;
  f: number;
  fxiPlus1: number;
  solve() {
    this.errors = [];
    this.changeDetection.detectChanges();

    console.log('errors', this.errors);

    if (!this.dataFormForm.method) {
      return;
    }

    if (!this.dataFormForm.eps) {
      this.dataFormForm.eps = 0.001;
    }
    const res = this.dataFormForm.method.solve();

    this.headers = this.dataFormForm.method.headers;
    if (this.dataFormForm.method.errors) {
      this.errors = this.dataFormForm.method.errors;
    }
    this.result = res[res.length - 1].x;
    this.i = res[res.length - 1].i;
    this.f = res[res.length - 1].fx
    this.fxiPlus1 = res[res.length-1].fxiPlus1;
    console.log(res);
    this.rows = res;
    console.log('solved: ', this.result);
    console.log('errors', this.errors);
  }

  ngOnInit(): void {
    this.methods = [new HalfMethod(), new IterationMethod(), new SecantMethod()];
    this.dataFormForm = {
      a: 0,
      b: 5,
      eps: 0.0001,
      func: this.functions[0],
      method: this.methods[0],
      pribl: 0
    };
  };
}
