
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { RestHandler, RequestMapping } from "app/services/servicebroker/DecoratorsDefine";
import { HttpMethod } from "app/services/servicebroker/HttpMethod";

@RestHandler({ baseUrl: "/api" })
export class ApiUserHandler{

  @RequestMapping({path:"/roles",method:HttpMethod.GET, timeout:1000})
  getAllRoles():Observable<any>{return null}

}
