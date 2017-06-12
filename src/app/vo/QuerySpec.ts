import { CodeName } from "app/vo/CodeName";
import { IMyDpOptions } from "mydatepicker";

export class QuerySpec {
  label:string; //UI title
  dynamicType:string; //元件種類
  name:string; //CI key

  required?:boolean;
  disabled?:boolean;
  p?:string; //icon style
  placeholder?:string; //input placeholder

  options?:CodeName[]; //下拉選單
  dateOptions?:IMyDpOptions; //日期設定
  optionsCom?:CodeName[] ; //LDAP選單
  optionsOrg?:CodeName[] ; //LDAP選單
  optionsUnit?:CodeName[] ; //LDAP選單
  comrequired?:boolean ;
  orgrequired?:boolean ;
  unitrequired?:boolean ;
  comdisabled?:boolean ;
  orgdisabled?:boolean ;
  unitdisabled?:boolean ;

}

