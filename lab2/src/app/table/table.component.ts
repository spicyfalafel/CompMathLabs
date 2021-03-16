import {Component, Input} from '@angular/core';

@Component({
  templateUrl:"./table.component.html",
  selector: "app-table"
})
export class TableComponent {
  @Input() headers: string[];
  @Input() rows: any[];
}
