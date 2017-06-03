
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { RestHandler, RequestMapping } from "app/services/servicebroker/DecoratorsDefine";
import { HttpMethod } from "app/services/servicebroker/HttpMethod";

@RestHandler({ baseUrl: "/api" })
export class ApiJwtAuthHandler{

  @RequestMapping({path:"/auth",method:HttpMethod.POST})
  auth(data:{name:string,password:string}):Observable<any>{return null}

}
