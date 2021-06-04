import {Component, ElementRef, OnInit} from "@angular/core";
import {Point} from "../models/Point";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ResearchResult} from "../models/ResearchResult";
import {ApproximationResearcher} from "../math/lab4/ApproximationResearcher";
import {Chart} from 'chart.js';
import {LinearApproximation} from "../math/lab4/LinearApproximation";

@Component({
    selector: 'lab4',
    templateUrl: './lab4.component.html',
    styleUrls: ['./lab4.component.css']
})
export class Lab4Component implements OnInit {
    constructor(private elementRef: ElementRef) {
    }

    private readonly MIN_POINTS_COUNT = 12;
    private readonly MAX_POINTS_COUNT = 20;
    chart: any;
    points: Point[];
    fileType: boolean;

    pirson: number;
    pointsForm: FormGroup;

    numberOfPoints: number = this.MIN_POINTS_COUNT;
    errorMessage: string;
    results: ResearchResult[];
    bestResult: ResearchResult;
    private file: File;


    data;


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
            yValues
        });
    }

    setXYToPoints(): void {
        this.pointsForm.controls.xValues.setValue(this.points.map(p => p.x));
        this.pointsForm.controls.yValues.setValue(this.points.map(p => p.y));
    }

    ngOnInit(): void {
        this.initializeForm();


        const x = [1,2,3];
        const y = [2,4,8];

        const yLn = y.map(val => Math.log(val));
        const xLn = x.map(val => Math.log(val));

        const ab = new LinearApproximation().getAValues(xLn, yLn);

        console.log('ab', ab);
        console.log('a', ab[0]);
        console.log('b', ab[1]);

        const aValues = [Math.exp(ab[1]), ab[0]];
        console.log(aValues);

        console.log(aValues[0].toFixed(3) + 'x^' + aValues[1].toFixed(3));



    }


    solveClick(): void {
        const xValues: FormArray = this.pointsForm.controls.xValues as FormArray;
        const yValues: FormArray = this.pointsForm.controls.yValues as FormArray;
        this.points = Array(xValues.length).fill(0)
            .map((v, i) => {
                return {x: xValues.at(i).value, y: yValues.at(i).value};
            });
        this.results = ApproximationResearcher.research(this.points);

        this.pickBestApproximation();

        this.pirson = this.findPirson(this.points.map(p => p.x), this.points.map(p => p.y));

        this.draw();
    }

    findPirson(xValues: number[], yValues: number[]): number {
        const xAvg = xValues.reduce((a, b) => a + b, 0) / xValues.length;
        const yAvg = yValues.reduce((a, b) => a + b, 0) / yValues.length;

        let sumUP = 0;
        let sumBottomY = 0;
        let sumBottomX = 0;
        for (let i = 0; i < xValues.length; i++) {
            const xi = xValues[i];
            const yi = yValues[i];
            sumUP += (xi - xAvg) * (yi - yAvg);
            sumBottomX += (xi - xAvg) * (xi - xAvg);
            sumBottomY += (yi - yAvg) * (yi - yAvg);
        }
        return sumUP / Math.sqrt(sumBottomX * sumBottomY);
    }

    pickBestApproximation(): void {
        this.bestResult = this.results[0];
        for (const t of this.results) {
            if (t.srOtkl < this.bestResult.srOtkl) {
                this.bestResult = t;
            }
        }
    }

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

    isInvalidInput(): boolean {
        return this.pointsForm.invalid;
    }

    private draw(): void {
        const xses = this.points.map(p => p.x);
        const min = Math.min(...xses);
        const max = Math.max(...xses);
        xses.push(max + 1);
        xses.unshift(min - 1);
        this.data = {
            labels: xses,
            datasets: []
        };

        for (const res of this.results) {
            function getRandomInt(maxn: number): number {
                return Math.floor(Math.random() * maxn);
            }

            this.data.datasets.push({
                label: res.view,
                function: res.fnc,
                a: res.a,
                b: res.b,
                c: res.c,
                data: [],
                borderColor: 'rgba(' + getRandomInt(256) + ', ' +
                    getRandomInt(256) + ',' + getRandomInt(256) + ', 1)',
                fill: false
            });
        }
        console.log('data', this.data);
        Chart.pluginService.register({
            beforeInit(chart): void {
                // We get the chart data
                const data = chart.config.data;

                // For every dataset ...
                for (let i = 0; i < data.datasets.length; i++) {

                    // For every label ...
                    for (let j = 0; j < data.labels.length; j++) {

                        // We get the dataset's function and calculate the value
                        const fct = data.datasets[i].function;
                        const x = data.labels[j];
                        const y = fct(x, data.datasets[i].a, data.datasets[i].b, data.datasets[i].c);
                        // Then we add the value to the dataset data
                        data.datasets[i].data.push(y);
                    }
                }
            }
        });
        const htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
        this.chart = new Chart(htmlRef, {
            type: 'line',
            data: this.data,
            options: {
                legend: {
                    display: true
                },
                animation: {
                    duration: 2000
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}
