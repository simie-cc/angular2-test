import { RestHandler, RequestMapping } from "app/services/servicebroker/DecoratorsDefine";
import { HttpMethod } from "app/services/servicebroker/HttpMethod";
import 'rxjs/Rx';
import {Observable} from 'rxjs';

@RestHandler({ baseUrl: "/api" })
export class ApiCiRelationdHandler{

  // @RequestMapping({path:"/hello/{0}/",method:HttpMethod.GET})
  // helloGet(word:string):Observable<any>{return null}

  @RequestMapping({path:"/queryCiData/{0}/",method:HttpMethod.POST})
  queryCiData(selectedCI:string,data:any){ return null ;}

}
