export class GoodsRModel {

  GRId: number = 0;
  GRNo: string = "";
  GRDate: Date = new Date();
  SerialNo: string = "";
  EWayBillNo: string = "";
  EWayBillDate: Date = new Date();
  ConsignorId: number = 0;
  CrName: string = "";
  CrAddress: string = "";
  CrMobileNo: string = "";
  CrGSTNo: string = "";
  CrEmail: string = "";
  ConsigneeId: number = 0;
  CeName: string = "";
  CeAddress: string = "";
  CeMobileNo: string = "";
  CeGSTNo: string = "";
  CeEmail: string = "";
  StationFrom: number = 0;
  StationTo: number = 0;
  GrType: number = 0;
  FreightBy: number = 0;
  VehicleId: number = 0;
  VehicleNo: string = "";
  InvoiceNo: string = "";
  EInvoiceNo: string = "";
  InvoiceValue: number = 0;
  InvoiceDate: Date = new Date();
  AdvanceBy: number = 0;
  DueTo: number = 0;
  PaidBy: number = 0;
  Broker: number = 0;
  Freight: number = 0;
  GRCharge: number = 0;
  Labour: number = 0;
  Cartage: number = 0;
  OtherCharge: number = 0;
  Commission: number = 0;
  SubTotal: number = 0;
  TaxPaidBy: number = 0;
  Tax: number = 0;
  Total: number = 0;
  Advance: number = 0;
  RoundOff: number = 0;
  GrandTotal: number = 0;
  OTLSeal: string = "";
  Remark: string = "";
  PrivateMarka: string = "";
  GRTransaction: any[] = [
    // {
    //   TransactionId: 0,
    //   GRId: 0,
    //   Quantity: 0,
    //   ItemId: 0,
    //   ItemName: "",
    //   PackingId: 0,
    //   PackingName: "",
    //   AWeight: 0,
    //   CWeight: 0,
    //   FMethod: 0,
    //   FRate: 0
    // }
  ];
  UserId: number = 0;
  BranchId: number = 0;
  CompanyId: number = 0;
  UserTypeId: number = 0
}