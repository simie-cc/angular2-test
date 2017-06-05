import { RestHandler, RequestMapping } from "app/services/servicebroker/DecoratorsDefine";
import { HttpMethod } from "app/services/servicebroker/HttpMethod";
import 'rxjs/Rx';
import {Observable} from 'rxjs';

@RestHandler({ baseUrl: "/test" })
export class ApiHelloWorldHandler{

  @RequestMapping({path:"/hello/{0}/",method:HttpMethod.GET})
  helloGet(word:string):Observable<any>{return null}

  @RequestMapping({path:"/hello/",method:HttpMethod.POST})
  helloPost(data:string):Observable<any>{return null}

  @RequestMapping({path:"",method:HttpMethod.GET})
  test():Observable<any>{return null}

}
