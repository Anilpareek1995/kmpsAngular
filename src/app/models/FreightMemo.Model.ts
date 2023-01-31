export class freightMemoModel{
    FMId: number = 0;
    FMNo: string= "";
    FMDate: Date = new Date()
    FMSerialNo: string= "";
    VehicleId: number = 0;
    TruckFreight: number = 0;
    FreightMethod: number = 0;
    Rate: number = 0;
    Advance: number = 0;
    AdvanceBy: number = 0;
    TDS: number = 0;
    Brokerage: number = 0;
    GRIds: string= "";
    FMTransaction: any[
    //   {
    //     FMTransactionId: number = 0;
    //     FMId: number = 0;
    //     AddLessRemark: string= "";
    //     AddLessAmount: number = 0;
    //   }
    ] = [];
    UserId: number = 0;
    BranchId: number = 0;
    CompanyId: number = 0;
    UserTypeId: number = 0;
    UserName: string= "";
    BranchName: string= "";
    CompanyName: string= "";
    UserTypeName: string = "";
  }