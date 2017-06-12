import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { RestHandler, RequestMapping } from "app/services/servicebroker/DecoratorsDefine";
import { HttpMethod } from "app/services/servicebroker/HttpMethod";
import { CodeName } from "app/vo/CodeName";

@RestHandler({ baseUrl: "/api" })
export class ApiLdapHandler{

  //依據哪一個作業功能查詢可選擇的CI種類
  @RequestMapping({path:"/getChtUnitsForUI/{0}/{1}",method:HttpMethod.GET})
  getChtUnitsForUI(directoryDN:string,directoryValue:string):Observable<any>{return null;}


}
