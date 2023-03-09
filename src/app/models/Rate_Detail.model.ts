import { number } from "ngx-custom-validators/src/app/number/validator"

export class Rate_Detail{
    Rate_Code: Number = 0;
    Other_Code: String = "";
    Company_Code: Number = 0;
    Plant_Id: Number = 0;
    MCC_Id: Number = 0;
    Center_Code: Number = 0;
    Route_Code: Number = 0;
    Society_Code: String = "";
    Effective_Date: String ="";
    User_Id: Number = 0;
    Type: String = "";
    Shift: String = "";
    Rate_Type: Number = 0;
    Ip_Address: String = "";
    Action: String = "";
    Description: String = "";
    Is_SameRateForAll_MilkType: boolean = false;
    Is_SameRateForAll_Shift: boolean = false;
    Is_Mixed_Milk_Only: boolean = false;
    Is_Active: Number = 0;
    Is_Delete: Number = 0;
    SIM_No: String = "";
    IMEI_No: String = "";
    Is_Mixed: Number = 0;
    Rate_structure_id: Number = 0;
    buffCommission: Number = 0;
    cowCommission: Number = 0;
    Rate_BO_SP:any[]=[];
    fileformat:string='p'
}


        