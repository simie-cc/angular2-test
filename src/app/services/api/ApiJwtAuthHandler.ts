
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { RestHandler, RequestMapping } from "app/services/servicebroker/DecoratorsDefine";
import { HttpMethod } from "app/services/servicebroker/HttpMethod";
import { LoginUser } from "app/formData/LoginUser";

@RestHandler({ baseUrl: "/api" })
export class ApiJwtAuthHandler{

  @RequestMapping({path:"/auth",method:HttpMethod.POST, timeout:1000})
  auth(data:LoginUser):Observable<any>{return null}

}
