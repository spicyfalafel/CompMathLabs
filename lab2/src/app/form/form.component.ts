import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {MathFunction} from '../models/MathFunction';
import {Method} from '../models/Method';
import {DataFromFormModel} from '../models/DataFromFormModel';
import {HalfMethod} from '../methods/HalfMethod';
import {ExceptionsService} from '../util/ExceptionsService';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss'],
  providers: [ExceptionsService]
})
export class FormComponent implements OnInit {
  @Input() functions: MathFunction[];
  @Input() methods: Method[];
  @Input() errorMessage;

  dataForm: DataFromFormModel;

  @Output() dataChosen = new EventEmitter<DataFromFormModel>();

  constructor(public exceptionsService: ExceptionsService) {
  }
  ngOnInit(): void {
    this.dataForm = {
      func: {
        view: 'x³-3,125x²-3,5x+2,458',
        fnc: x => x * x * x - 3.125 * x * x - 3.5 * x + 2.458,
        derivative: x => 3 * x * x - 6.25 * x - 3.5,
        secondDerivative: x => 6 * x - 6.25
      },
      method: new HalfMethod(),
      a: 0,
      b: 5,
      eps: 0.001,
      pribl: 1
    };
  }

  chooseFunction(func: MathFunction) {
    console.log('chose function');
    this.dataForm.func = func;
    this.dataChosen.emit(this.dataForm);
  }


  chooseMethod(meth: Method) {
    console.log('chose method');
    this.dataForm.method = meth;
    this.dataChosen.emit(this.dataForm);
  }

  chooseIntervalStart(start: number) {
    console.log('chose start');
    this.dataForm.a = start;
    this.dataChosen.emit(this.dataForm);
  }

  chooseIntervalEnd(end: number) {
    console.log('chose end');
    this.dataForm.b = end;
    this.dataChosen.emit(this.dataForm);
  }

  chooseEps(eps: number) {
    this.dataForm.eps = eps;
    this.dataChosen.emit(this.dataForm);
  }

  choosePribl(pribl: number) {
    this.dataForm.pribl = pribl;
    this.dataChosen.emit(this.dataForm);
  }

  file: File;
  fileInput: any;
  errorInFile: any;
  justError: any

  onChangeFile(event): void {
    this.errorInFile = false;
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
    this.file.text().then((result) => {
      try {
        const params = JSON.parse(result);
        this.dataForm.a = parseFloat(params.a);
        this.dataForm.b = parseFloat(params.b);
        this.dataForm.pribl = parseFloat(params.pribl);
        this.dataForm.eps = parseFloat(params.eps);
        this.dataChosen.emit(this.dataForm);
      } catch (e) {
        console.log('exception in onChangeFile');
        this.errorInFile = true;
      }
    });
  }
}
