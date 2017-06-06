import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { RestHandler, RequestMapping } from "app/services/servicebroker/DecoratorsDefine";
import { HttpMethod } from "app/services/servicebroker/HttpMethod";
import { CodeName } from "app/vo/CodeName";

@RestHandler({ baseUrl: "/api" })
export class ApiSpecHandler{

  //依據哪一個作業功能查詢可選擇的CI種類
  @RequestMapping({path:"/uiqueryoptions/{0}",method:HttpMethod.GET})
  getSelectOptions(page:string):Observable<any>{return null;}

  //依據選擇的CI種類查詢對應的規格
  @RequestMapping({path:"/uiqueryspec/{0}",method:HttpMethod.GET})
  getUIQuerySpec(selectedCI:CodeName):Observable<any>{return null;}

}
