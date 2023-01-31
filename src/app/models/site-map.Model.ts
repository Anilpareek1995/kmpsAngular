import { login } from "./login.model";

export enum sitemap {
 

}

export function copyObject(a:any)
{
   return  JSON.parse(JSON.stringify(a));
}
export const tokenPath:string='belttokenpath';
export const defaultUser:login={
// BranchId:0  ,    
// BranchName: "",
// CompanyId:0,
// CompanyName:"",
// EmailId: "",
// ExpireOn: "",
// GeneratedOn: "",
// IP: "",
// IssueTo: "",
// MobileNo: "",
// Name: "",
// Password: "",
// UserDomain: "",
// UserID: 0,
// UserStatus: 0,
// UserTypeId: 0,
// UserTypeName: "",
// Username:""
USERTYPECODE :"",
USERTYPEDESC :"",
status :0,
createdon:new Date(),
createdby :"",
updatedon :new Date(),
updateby :"",
USERNAME :"",
USERloginCODE:0,
USERPWD :"",
USEROldPWD :"",
BmcCode :"",
MccCode :"",
PPCode :"",
PlantCode :"",
mobno :"",
MainPageNm :"",
ActionPageNm :"",
calltypeDispNm:"",
ActionDispNm :"",
Menu :"",
Allow :0,
UserId :0,
Company_Code: 0,
routecode: 0,
calltype :"",
Dump_Date: new Date(),
Shift :""
};








