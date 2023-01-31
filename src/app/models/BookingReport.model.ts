export class BookingReportModel{
    FromDate: Date=new Date();
    ToDate: Date=new Date();
    IsCancelled: number=0;
    UserId: number=0;
    BranchId: number=0;
    CompanyId: number=0;
    UserTypeId: number=0;
    UserName: string="";
    BranchName: string="";
    CompanyName: string="";
    UserTypeName: string="";
  }