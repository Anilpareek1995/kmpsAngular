import { Component, ElementRef, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Rate_Detail } from 'src/app/models/Rate_Detail.model';
import { RouteModel } from 'src/app/models/RouteModel';
import { BmcService } from 'src/app/services/bmc.service';
import { MccService } from 'src/app/services/mcc.service';
import { MppService } from 'src/app/services/mpp.service';
import { PlantService } from 'src/app/services/plant.service';
import { RateDetailService } from 'src/app/services/rate-detail.service';
import { RouteService } from 'src/app/services/route.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedService } from 'src/app/services/shared.service';
import { SelectionModel } from '@angular/cdk/collections';
import * as XLSX from 'xlsx';
import { MatSelectionList } from '@angular/material/list';
import * as JSZip from 'jszip';
import { zip } from 'rxjs';
import { date } from 'ngx-custom-validators/src/app/date/validator';
@Component({
  selector: 'app-create-rate',
  templateUrl: './create-rate.component.html',
  styleUrls: ['./create-rate.component.scss']
})
export class CreateRateComponent implements OnInit {
  @ViewChild('Society_Code') mySelectionList!: MatSelectionList;
  @ViewChild('excelUpload') inputName: any;


  formData = new Rate_Detail()
  btnTxt = "";
  listRateStructure: any[] = []
  ismilk: boolean = false
  RateDetailList: any[] = [];
  RouteCodeIds: any;
  pageSize = 5;
  page = 1;
  isExcel: boolean = false;
  UploadExcelRateListCow: any[] = [];
  UploadExcelRateListBuff: any[] = [];
  UploadExcelRateListMix: any[] = [];
  isMapping: boolean = false;
  ExcelMppList: any;
  Excelkeys: any[] = [];
  PlantList: any[] = [];
  filterPlantList: any[] = [];
  MccList: any[] = [];
  filterMccList: any[] = [];
  BmcList: any[] = [];
  filterBmcList: any[] = [];
  RouteCodeList: any[] = [];
  filterRouteCodeList: any[] = [];
  MppList: any[] = [];
  filterMppList: any[] = [];
  RouteData = new RouteModel();
  refNo: any;
  selectedMpp: string[] = [];
  selectedOptions: string[] = [];
  isexport: boolean = false
  // fileformat:string=''
  // define selectAll boolean variable and SelectionModel
  selectAll = false;
  selection = new SelectionModel<string>(true, []);
  zip: JSZip = new JSZip();

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<CreateRateComponent>,
    private sharedService: SharedService, private rateservice: RateDetailService,
    private sessionservice: SessionService, private plantService: PlantService,
    private mccService: MccService,
    private BmcService: BmcService,
    private mppService: MppService, private RouteService: RouteService, private elementRef: ElementRef, private ngZone: NgZone
  ) {

  }


  ngOnInit(): void {
    const selectionList = new MatSelectionList(this.elementRef, this.ngZone);
    this.formData = this.data.formData
    this.btnTxt = this.data.btnTxt
    this.Load_Rate_Type()
    this.getAllPlant()
    this.getAllMcc()
    this.getBmcAll()
    // this.getMppAll()



  }


  Load_Rate_Type() {
    this.formData.Action = 'Load_Rate_Type'
    this.formData.Company_Code = this.sessionservice.getCurrentUser().value.CompanyCode
    this.rateservice.getRateAll(this.formData).subscribe((res: any) => {
      if (res.result.Table1.length > 0) {
        this.listRateStructure = res.result.Table1
      }
      if (res.status == 200) {
        console.log(res.result.Table)

        this.RateDetailList = res.result.Table

      }
    })

  }

  SameRateForAll() {
    this.formData.Is_Mixed_Milk_Only = false;
    this.formData.Is_SameRateForAll_MilkType = true;

  }


  mixedmilk() {

    this.formData.Is_SameRateForAll_MilkType = false;
    this.formData.Is_Mixed_Milk_Only = true;

  }

  add() {
    this.formData.Action = 'Create_Rate_Type'
    this.formData.Company_Code = this.sessionservice.getCurrentUser().value.companyCode
    this.formData.User_Id = this.sessionservice.getCurrentUser().value.UserId
    this.rateservice.getRateAll(this.formData).subscribe((res: any) => {
      if (res.status == 200) {

        this.sharedService.openSnackBar(res.result.Table[0].message)
        this.reset()
        this.Load_Rate_Type()
      }
      else {
        this.sharedService.openSnackBar(res.result.Table[0].message)
      }
    })



  }
  close() {

    this.dialogRef.close();
  }

  // onClick of Edit 
  onEditUser(data: any) {

  }

  reset() {
    this.formData.Description = ""
    this.formData.Is_SameRateForAll_MilkType = false;
    this.formData.Is_Mixed_Milk_Only = false;
  }
  // onClick of Upload 
  onUploadexcel(data: any) {
    this.isExcel = true
    this.isMapping = false
    this.mappingdetails(data)

  }
  // onClick of Mapping 
  onMappingBack(data: any) {
    this.isExcel = false
    this.isMapping = false
    console.log('data-mapping', data)


  }

  onCloseExcel() {
    this.isExcel = false
  }
  // onClick of Import 
  onFileChange(evt: any) {

    this.ExcelMppList = [];
    this.Excelkeys = [];
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      var ratetype = ''
      wb.SheetNames.forEach((v, i) => {
        if (i == 0) {
          ratetype = 'C'
        }
        else if (i == 1) { ratetype = 'B' }
        else if (i == 2) { ratetype = 'M' }
        else ratetype = ''
        if (ratetype != '') {
          const wsname: string = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          this.formData.Type = ratetype
          /* save data */
          this.ExcelMppList = XLSX.utils.sheet_to_json(ws, { header: 0 });
          /* this.Excelkeys = Object.keys(this.ExcelMppList[0]);*/

          this.UploadExcel(this.ExcelMppList);
        }

      }
      )
    };
    reader.readAsBinaryString(target.files[0]);
  }

  // Upload Excel File
  UploadExcel(data: any[]) {
    var fat = 0;
    for (let i = 0; i < data.length; i++) {

      const element = data[i]
      var dt = data[i]
      for (let key in element) {
        //console.log("      key:", key, "value:", element[key]);
        fat = element[0]
        if (key != "0") {
          if (this.formData.Type == 'C') {
            this.UploadExcelRateListCow.push({
              Fat: fat,
              SNF: key,
              Rate: element[key],
            });
          }
          else if (this.formData.Type == 'B') {
            this.UploadExcelRateListBuff.push({
              Fat: fat,
              Snf: parseFloat(key),
              Rate: element[key],
            });
          }
          else if (this.formData.Type == 'M') {
            this.UploadExcelRateListMix.push({
              Fat: fat,
              Snf: parseFloat(key),
              Rate: element[key],
            });
          }
        }
      }

    }

    //console.log(element)

  }
  // on Upoad Button
  onSaveUploadedMpp() {
    this.SaveRateDetails(this.UploadExcelRateListCow, 'C')
    this.SaveRateDetails(this.UploadExcelRateListBuff, 'B')
    this.SaveRateDetails(this.UploadExcelRateListMix, 'M')
  }
  //Save Rate File
  SaveRateDetails(rate: any, ctype: any) {
    this.formData.Action = 'Add_Rate_Details'
    this.formData.Company_Code = this.sessionservice.currentUser.value.companyCode
    this.formData.User_Id = this.sessionservice.currentUser.value.UserId
    this.formData.Rate_BO_SP = rate
    this.formData.Type = ctype
    this.rateservice.getRateAll(this.formData).subscribe((res: any) => {
      if (res.status == 200) {
        this.sharedService.openSnackBar(res.result.Table[0].message + '-' + ctype)
        this.formData.Rate_BO_SP = []
        this.formData.Type = ""


      }
      else {
        this.sharedService.openSnackBar(res.result.Table[0].message)
      }
    })
  }
  //On Clik Mapping
  onMapping(data: any) {
    this.isMapping = true
    this.isexport = false
    this.mappingdetails(data)


  }
  /*Load Plant*/
  getAllPlant() {

    this.PlantList = [];
    this.filterPlantList = [];
    this.MccList = [];
    this.filterMccList = [];
    this.BmcList = [];
    this.filterBmcList = [];
    this.RouteCodeList = [];
    this.filterRouteCodeList = [];
    this.MppList = [];
    this.filterMppList = [];
    var companyCode = this.sessionservice.getCurrentUser().value.CompanyCode;
    var request = { Action: "Get_Data_Onload", Company_Code: companyCode }
    this.plantService.getplantAll(request).subscribe((res: any) => {
      if (res.status == 200) {
        console.log("plant", res.result.Table)
        this.PlantList = res.result.Table;
        this.filterPlantList = this.PlantList.slice();
      }
    })
  }
  /*Load Mcc*/
  getAllMcc() {

    console.log("plant id ", this.formData.Plant_Id)
    console.log("mcc id ", this.formData.MCC_Id)
    this.MccList = [];
    this.filterMccList = [];
    this.BmcList = [];
    this.RouteCodeList = [];
    this.filterRouteCodeList = [];
    this.filterBmcList = [];
    this.MppList = [];
    this.filterMppList = [];


    var companyCode = this.sessionservice.getCurrentUser().value.CompanyCode;
    var request = { Company_Code: companyCode, Action: "Get_Data_Onload" }
    this.mccService.getMccAll(request).subscribe((res: any) => {
      if (res.status == 200 && res.result.Table1.length > 0) {
        this.MccList = res.result.Table1;
        this.filterMccList = this.MccList
      }
      else {
        this.sharedService.openSnackBar("No Data found");
      }
    })
  }
  /*Load Bmc*/
  getBmcAll() {
    this.BmcList = [];
    this.filterBmcList = [];
    this.MppList = [];
    this.filterMppList = [];
    var CompanyCode = this.sessionservice.getCurrentUser().value.CompanyCode;
    var request = { Comapny_Code: CompanyCode, Action: "Get_All_Center" }
    this.BmcService.getBmcAll(request).subscribe((res: any) => {
      if (res.status == 200 && res.result.Table1.length > 0) {
        this.BmcList = res.result.Table;
        this.filterBmcList = this.BmcList;
      }
      else {
        this.sharedService.openSnackBar("No Data found");
      }
    })
  }
  /*Load Route*/
  getAllRoute() {
    this.RouteCodeList = [];
    this.filterRouteCodeList = [];
    this.MppList = [];
    this.filterMppList = [];
    // this.SelectedBmcCode = e.value;
    this.RouteData.Center_Code = this.formData.Center_Code.toString() //this.SelectedBmcCode
    this.RouteData.Company_Code = this.sessionservice.getCurrentUser().value.CompanyCode;
    this.RouteData.Action = 'Get_All_Route';
    this.RouteService.getAllRoute(this.RouteData).subscribe((res: any) => {
      console.log("Get_All_Route", res);
      if (res.status == 200) {
        this.RouteCodeList = res.result.Table;
        this.filterRouteCodeList = this.RouteCodeList.slice();
      }
    })
  }

  /*Load Mpp*/
  getMppAll(e: any) {

    this.RouteCodeIds = e.value;
    console.log("route codes", this.RouteCodeIds);
    // var routeCods:any[]= this.formData.Route_Code;
    this.MppList = [];
    this.filterMppList = [];
    this.formData.Action = 'Load_Dropdowns_for_Mapping'
    var CompanyCode = this.sessionservice.getCurrentUser().value.CompanyCode;

    this.rateservice.getRateAll(this.formData).subscribe((res: any) => {
      if (res.status == 200) {
        var listMpp = res.result.Table4;
        this.MppList = listMpp.filter((item: any) => {
          return this.RouteCodeIds.some((data: any) => item.Route_Code == data
          );

        });
        console.log("MppList", this.MppList)
        this.filterMppList = this.MppList.slice();
      }
      else {
        this.MppList = [];
        this.filterMppList = [];

        this.sharedService.openSnackBar("No Data found");
      }
    })


    //var request = {Company_Code:CompanyCode,Center_Code:this.formData.Center_Code,Action:"Get_All_Societies"}

  }

  getMpp(data: any) {
    console.log('check', data)
    console.log('check', this.MppList);
    this.filterMppList = this.MppList.filter((res: any) => { res.Route_Code == data });

    console.log("filter mpp", this.filterMppList);
  }

  /*On Mpp Selection */
  setMpp(e: any) {

    this.selectedMpp = e.value

    console.log('this.formData.Society_Code', this.selectedMpp.join(","))
  }
  /*Creating Rate Mapping*/
  addMaping() {
    this.formData.Company_Code = this.sessionservice.getCurrentUser().value.CompanyCode
    console.log('Mapping', this.formData.Company_Code)
    this.formData.User_Id = this.sessionservice.getCurrentUser().value.UserId
    this.formData.Action = 'Society_Rate_Mapping'
    this.formData.Society_Code = this.selectedMpp.join(",")
    this.rateservice.getRateAll(this.formData).subscribe((res: any) => {
      if (res.status == 200) {
        this.sharedService.openSnackBar(res.result.Table[0].message)
      }
      else {
        this.sharedService.openSnackBar(res.result.Table[0].message)
      }
    })


  }

  mappingdetails(data: any) {
    this.setformdatafromtable(data)
  }


  onExportBack() {
    this.isexport = false
  }
  btnExport() {
    //console.log(this.fileformat)
    this.formData.fileformat;
    this.formData.Company_Code = this.sessionservice.getCurrentUser().value.companyCode
    this.formData.User_Id = this.sessionservice.getCurrentUser().value.UserId
    this.formData.Action = 'Export_ratechart'
    var ext = ''
    ext = this.formData.fileformat == 'x' ? '.csv' : '.txt'
    this.rateservice.ExportRateAll(this.formData).subscribe((res: any) => {
      if (res.status == 200) {
        console.log(res.result.Table1[0].B)
        // this.downloadunzipfile(res.result.Table1[0].B, 'E_Ratechart_R2'+ext)
        // this.downloadunzipfile(res.result.Table1[0].C, 'E_Ratechart_R1'+ext)
        this.createZipfile(res.result.Table1[0].B, 'E_Ratechart_R2' + ext)
        this.createZipfile(res.result.Table1[0].C, 'E_Ratechart_R3' + ext)
        res.result.Table1[0].X != undefined ? this.createZipfile(res.result.Table1[0].X, 'E_Ratechart_R3' + ext) : ''
        this.downloadtextfile()
        this.sharedService.openSnackBar(res.result.Table1)
      }
    })
  }

  createZipfile(b: any, f_name: any) {
    const blob = new Blob([b], { type: 'text/csv' });
    this.zip.file(f_name, blob)

  }
  downloadtextfile() {
    this.zip.generateAsync({ type: 'blob' }).then((content: Blob) => {
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'RateFiles.zip';
      a.click();
    });

  }

  downloadunzipfile(d: any, f_name: any) {
    const blob = new Blob([d], { type: 'text/csv' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = f_name;
    document.body.appendChild(a);
    a.click();
  }
  Export(data: any) {
    this.isexport = true
    this.isMapping = false
    this.isExcel = false
    this.formData.Rate_Code = data.Rate_Code
    this.formData.Rate_Type = data.Rate_Type
    this
  }

  onFormatSelect(data: any) {
    this.formData.fileformat = data.value
  }

  setformdatafromtable(data: any) {
    this.formData.Rate_structure_id = data.RateStructureId
    this.formData.Other_Code = data.Other_Code
    this.formData.Rate_Code = data.Rate_Code
    this.formData.Rate_Type = data.Rate_Type
    this.formData.Is_Active = data.Is_Active == 'Yes' ? 1 : 0
    this.formData.Is_SameRateForAll_MilkType = data.Is_SameRateForAll_MilkType == 'Yes' ? true : false
    this.formData.Is_SameRateForAll_Shift = data.Is_SameRateForAll_Shift == 'Yes' ? true : false
    this.formData.Is_Mixed_Milk_Only = data.Is_Mixed_Milk_Only == 'Yes' ? true : false
    this.formData.Shift = this.formData.Shift == 'Morninig' ? 'M' : 'E'


  }
}





