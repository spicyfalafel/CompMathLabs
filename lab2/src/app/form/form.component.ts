import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {MathFunction} from '../models/MathFunction';
import {Method} from '../models/Method';
import {DataFromFormModel} from '../models/DataFromFormModel';
import {HalfMethod} from '../methods/HalfMethod';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() functions: MathFunction[];
  @Input() methods: Method[];

  dataForm: DataFromFormModel;

  @Output() dataChosen = new EventEmitter<DataFromFormModel>();

  ngOnInit(): void {
    this.dataForm = {
      func: {
        view: 'x³-3,125x²-3,5x+2,458',
        fnc: x => x * x * x - 3.125 * x * x - 3.5 * x + 2.458
      },
      method: new HalfMethod(),
      a: 0,
      b: 5,
      secants: [],
      eps: 0.001
    };
  }

  chooseFunction(func: MathFunction) {
    console.log('chose function');
    this.dataForm.func = func;
    this.dataChosen.emit(this.dataForm);
  }


  chooseMethod(meth: Method) {
    console.log("chose method");
    this.dataForm.method = meth;
    this.dataChosen.emit(this.dataForm);
  }

  chooseIntervalStart(start: number) {
    console.log("chose start");
    this.dataForm.a = start;
    this.dataChosen.emit(this.dataForm);
  }

  chooseIntervalEnd(end: number) {
    console.log("chose end")
    this.dataForm.b = end;
    this.dataChosen.emit(this.dataForm);
  }

  chooseEps(eps: number) {
    this.dataForm.eps = eps;
    this.dataChosen.emit(this.dataForm);
  }
}
