import {Component, ElementRef, OnInit} from "@angular/core";
import {LagrangeMethod} from "../math/LagrangeMethod";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Point} from "../models/Point";
import {Chart} from 'chart.js';
import {NewtonMethod} from "../math/NewtonMethod";

@Component({
    selector: 'lab5',
    templateUrl: './lab5.component.html',
    styleUrls: ['./lab5.component.css']
})
export class Lab5Component implements OnInit {

    xCoords = /*[0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8]*/[];
    yCoords = /*[1.532, 2.5356, 3.5406, 4.5462, 5.5504, 6.5559, 7.5594]*/[];


    /*
     FORM
     */

    pointsForm: FormGroup;
    points: Point[] = [];
    private readonly MIN_POINTS_COUNT = 5;
    private readonly MAX_POINTS_COUNT = 20;

    fromFile: boolean = false;

    constructor(private elementRef: ElementRef) {
    }


    /*
    CHART
     */

    chart: any;


    addPoint(): void {
        (this.pointsForm.controls.xValues as FormArray).push(new FormControl('', Validators.required));
        (this.pointsForm.controls.yValues as FormArray).push(new FormControl('', Validators.required));
    }

    removePoint(): void {
        const xValues: FormArray = this.pointsForm.controls.xValues as FormArray;
        const yValues: FormArray = this.pointsForm.controls.yValues as FormArray;
        xValues.removeAt(xValues.length - 1);
        yValues.removeAt(yValues.length - 1);
    }

    initializeForm(): void {
        const xValues = new FormArray(Array(this.MIN_POINTS_COUNT).fill(0)
            .map(() => new FormControl('', Validators.required)));
        const yValues = new FormArray(Array(this.MIN_POINTS_COUNT).fill(0)
            .map(() => new FormControl('', Validators.required)));

        this.pointsForm = new FormGroup({
            xValues,
            yValues,
            X: new FormControl(),
            sin: new FormControl(),
            e: new FormControl(),
            x3: new FormControl(),
            xnumber: new FormControl()
        });
    }

    setXYToPoints(): void {
        this.pointsForm.controls.xValues.setValue(this.points.map(p => p.x));
        this.pointsForm.controls.yValues.setValue(this.points.map(p => p.y));
    }



    draw() {
        const htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
        if(this.chart){
            this.chart.destroy();
        }
        this.chart = new Chart(htmlRef, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Исходные',
                        data: this.points,
                        showLine: true,
                        fill: false,
                        pointRadius: 5,
                        borderColor: 'rgba(0, 200, 0, 1)'
                    },
                    {
                        label: 'Ньютонные',
                        data: this.newtonPoints,
                        showLine: true,
                        pointRadius: 10,
                        fill: false,
                        borderColor: 'rgba(200, 0, 0, 1)'
                    }
                ]
            },
            options: {
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
            }
        })
    }

    ngOnInit(): void {
        this.initializeForm();
    }


    ans: number;
    inputType: number;
    newtonPoints: Point[] = [];
    lagrangeY: number;
    newtonY: number;

    addAndSort(arr: number[], val: number): number[] {
        arr.push(val);
        for (let i = arr.length - 1; i > 0 && arr[i] < arr[i - 1]; i--) {
            var tmp = arr[i];
            arr[i] = arr[i - 1];
            arr[i - 1] = tmp;
        }
        return arr;
    }

    solve(): void {
        this.getXY();
        const x: number = this.pointsForm.controls.X.value;
        for (let i = 0; i < this.xCoords.length; i++) {
            const p: Point = {x: this.xCoords[i], y: this.yCoords[i]};
            this.points.push(p)
        }
        this.lagrangeY = LagrangeMethod.getLn(x, this.points);
        let one = true;
        for (let p of this.points) {
            if (p.x >= x && one) {
                this.newtonY = NewtonMethod.getN(x, this.points);
                this.newtonPoints.push({x: x, y: this.newtonY});
                this.xCoords = this.addAndSort(this.xCoords, x);
                one = false;
            }
            const newtonY = NewtonMethod.getN(p.x, this.points);
            this.newtonPoints.push({x: p.x, y: newtonY});
        }
        this.draw();
    }

    getXY(): void {

        if (this.inputType == 0) {
            const xValues: FormArray = this.pointsForm.controls.xValues as FormArray;
            const yValues: FormArray = this.pointsForm.controls.yValues as FormArray;
            this.points = Array(xValues.length).fill(0)
                .map((v, i) => {
                    return {x: xValues.at(i).value, y: yValues.at(i).value};
                });
        } else if (this.inputType == 1) {
            let f: any;
            if (this.pointsForm.controls.sin.value == true) {
                f = x => Math.sin(x);
            } else if (this.pointsForm.controls.e.value == true) {
                f = x => Math.exp(x)
            } else if (this.pointsForm.controls.x3.value == true) {
                f = x => x * x * x;
            }
            const k = this.pointsForm.controls.xnumber.value;
            this.points = [];
            for(let i = 0; i<k;i++){
                console.log({x: i, y: f(i)})
                this.points.push({x: i, y: f(i)});
            }
        }
    }

    /*
        FILE
     */

    file: File;
    errorMessage: string;

    onChangeFile(event): void {
        const eventObj: MSInputMethodContext = event as MSInputMethodContext;
        const target: HTMLInputElement = eventObj.target as HTMLInputElement;
        const files: FileList = target.files;
        this.file = files[0];
        this.file.text().then((result) => {
            try {
                const params = JSON.parse(result);
                const xValues: number[] = params.xValues.filter((x) => !isNaN(parseFloat(x)));
                const yValues: number[] = params.yValues.filter((y) => !isNaN(parseFloat(y)));
                if (xValues.length === yValues.length && xValues.length <= this.MAX_POINTS_COUNT &&
                    xValues.length >= this.MIN_POINTS_COUNT) {
                    this.points = xValues.map((x, i) => ({x, y: yValues[i]}));
                    this.setXYToPoints();
                    this.errorMessage = '';
                } else {
                    this.errorMessage = 'проверка по длине не пройдена';
                }
            } catch (e) {
                this.errorMessage = 'ошибка во время чтения файла';
            }
        });
    }

}
