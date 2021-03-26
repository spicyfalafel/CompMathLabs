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
      view: 'x³-3,125x²-3,5x+2,458',
      fnc: x => x * x * x - 3.125 * x * x - 3.5 * x + 2.458,
      derivative: x => 3 * x * x - 6.25 * x - 3.5,
      secondDerivative: x => 6 * x - 6.25
    },
    {
      view: '3x³+4,75x²-1,5x+7,525',
      fnc: x => x * x * x * 3 + 4.76 * x * x - 1.5 * x + 7.525,
      derivative: x => 9 * x * x + 9.52 * x - 1.5,
      secondDerivative: x => 18 * x + 9.52
    },
    {
      view: '-x³+1,625x²+10,5x-1,458',
      fnc: x => -x * x * x + 1.625 * x * x + 10.5 * x - 1.458,
      derivative: x => -3 * x * x + 2.35 * x + 10.5,
      secondDerivative: x => -6 * x + 2.35
    }
  ];
  dataFormForm: DataFromFormModel;
  headers: string[];
  rows: any[];
  methods: Method[];

  result: number;

  errors: string[];


  changeData(data) {
    if ((isNaN(parseFloat(data.a)) ||
      isNaN(parseFloat(data.b)) ||
      isNaN(parseFloat(data.eps)) ||
      isNaN(parseFloat(data.pribl)))) {
      this.errors = ['Please use only numbers'];
      this.changeDetection.detectChanges();
    }else{
      this.dataFormForm = data;
      this.dataFormForm.method.setData(this.dataFormForm);
      console.log('changed dataFormForm: ', this.dataFormForm);
    }
  }

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
    this.result = res[res.length - 1].x;
    this.headers = this.dataFormForm.method.headers;
    if (this.dataFormForm.method.errors) {
      this.errors = this.dataFormForm.method.errors;
    }
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
