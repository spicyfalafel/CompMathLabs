import {Component, Output, EventEmitter, Input} from '@angular/core';
import {MathFunction} from '../models/MathFunction';
import {Method} from '../models/Method';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss']
})
export class FormComponent {
  @Output() chosenFunction = new EventEmitter<MathFunction>();
  @Output() chosenMethod = new EventEmitter<Method>();
  @Input() functions: MathFunction[];
  @Input() methods: Method[];
  @Output() start = new EventEmitter<Number>();
  @Output() end = new EventEmitter<Number>()
  @Output() eps = new EventEmitter<Number>();

  chooseFunction(func: MathFunction) {
    console.log('chose function');
    this.chosenFunction.emit(func);
  }

  chooseMethod(meth: Method) {
    this.chosenMethod.emit(meth);
  }

  chooseIntervalStart(start:number) {
    this.start.emit(start);
  }

  chooseIntervalEnd(end:number) {
    this.end.emit(end);
  }

  chooseEps(eps: number) {
    this.eps.emit(eps);
  }
}
