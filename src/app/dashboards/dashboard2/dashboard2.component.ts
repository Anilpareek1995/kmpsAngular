import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss'],
})
export class Dashboard2Component {
  // This is for the table responsive
  constructor() {}
}
