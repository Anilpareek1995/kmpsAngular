import { Component } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BookingReportModel } from 'src/app/models/BookingReport.model';
import { ReportService } from 'src/app/services/report.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { FilterPopupComponent } from '../filter-popup/filter-popup.component';

@Component({
  selector: 'app-booking-report',
  templateUrl: './booking-report.component.html',
  styleUrls: ['./booking-report.component.scss']
})
export class BookingReportComponent {
  BookingReportList: any[] = [];
  dataSource: any;
  displayedColumns = ['CompanyName', 'GRDate', 'GRNO', 'InvoiceNo'];

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  formData = new BookingReportModel();
  btnTxt = "GET";
  constructor(private dialog: MatDialog,
    private SharedService: SharedService,
    private reportService: ReportService,
    private sessionService: SessionService) {

  }

  showPopup() {
    this.dialog.open(FilterPopupComponent, {
      data: {
        formData: this.formData,
        btnTxt: this.btnTxt
      }
    }).afterClosed().subscribe(data => {

      this.getBookingReport(data);
      this.reset();

    })
  }

  reset() {
    this.formData.FromDate = new Date();
  }

  getBookingReport(formData: any) {
    this.reportService.GetBookingReport(formData).subscribe((res: any) => {
      if (res.Success && res.Status == 200) {
        this.BookingReportList = res.Result
        this.dataSource = new MatTableDataSource<Element>(this.BookingReportList);
      }
    })
  }
}
