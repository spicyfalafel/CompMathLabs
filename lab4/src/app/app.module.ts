import {Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {Lab5Component} from "../lab5/lab5.component";
import {Lab4Component} from "../lab4/lab4.component";

const appRoutes: Routes =[
  { path: 'lab5', component: Lab5Component},
  { path: '', component: AppComponent},
  {path: 'lab4', component: Lab4Component}

];

@NgModule({
  declarations: [
    AppComponent,
    Lab5Component,
    Lab4Component
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
