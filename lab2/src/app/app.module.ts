import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ChartComponent} from './chart/chart.component';
import {FormComponent} from './form/form.component';
import {TableComponent} from './table/table.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';
import {MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    FormComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatRadioModule,
    FormsModule,
    CheckboxModule,
    MatTableModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
