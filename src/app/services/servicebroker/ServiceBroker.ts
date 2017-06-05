import { Injectable } from "@angular/core";
import { REST_METADATA, DEFAULT_TIMEOUT } from "app/services/servicebroker/DecoratorsDefine";
import { environment } from "environments/environment";
import { RestTemplate } from "app/services/util/RestTemplate";
import { HttpMethod } from "app/services/servicebroker/HttpMethod";
import 'rxjs/Rx';
import {Observable} from 'rxjs';
//這裡不須import 'reflect-metadata';，多次import會死掉，所以移至 ployfill.ts 統一 import

type Constructor<T> = Function & { prototype: T };

@Injectable()
export class ServiceBroker{

  constructor(private restTemplate: RestTemplate){}

  getApiHandler<T>(clazz:Constructor<T>): T {

    let rest = this.restTemplate ;

    let className = clazz.name;
    //console.log(className);
    let classDesc = Reflect.getMetadata(REST_METADATA, clazz); //從這個class上取得rest的metadata
    //console.log('classMetadata:'+JSON.stringify(classDesc)) ; //{"baseUrl":"/api"}

    let url = this.getHostUri()+classDesc.baseUrl; //http://localhost:8080/api

    //回傳代理
    let proxy = <T> new Proxy({},{
        //當取得物件屬性時會呼叫get定義的function ex: obj.hello 則會呼叫此function
        //get 再回傳一個function，則當 obj.hello() 時，就會執行回傳的這個function
        //reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
        get: (target: any, property: PropertyKey) => { //target is {}
          let funcName = property.toString();
          let funcDesc = Reflect.getMetadata(REST_METADATA, clazz.prototype, property.toString()); //取得clazz.prototype上的metadata
          let httpMethod = funcDesc.method ;
          //console.log('function Name:'+funcName) ; //hello
          //console.log('functtion Metadata:'+JSON.stringify(funcDesc)); //{"path":"/hello/${0}","method":0, "timeout": 3000}
          let timeout:number = (funcDesc.timeout==undefined? DEFAULT_TIMEOUT:funcDesc.timeout) ; //設定預設timeout時間

          return function():Observable<any>{
              //console.log('arguments'+JSON.stringify(arguments)) ;
              let fullUrl = url+funcDesc.path ; //http://localhost:8080/api/hello/{0}
              let args = Array.from(arguments);
              //console.log('full url:'+fullUrl);

              if(httpMethod === HttpMethod.GET){
                  args.forEach( (arg,idx)=> fullUrl=fullUrl.replace(`{${idx}}`,arg) )  //依序取代掉網址上的變數
                  console.log('call get method:'+fullUrl) ;
                  return rest.get(fullUrl,timeout) ;
              }else if(httpMethod === HttpMethod.POST){
                  console.log('call post method:'+fullUrl+', and data:'+JSON.stringify(args[0])) ;
                  return rest.post(fullUrl,args[0],timeout) ;
              }else if(httpMethod === HttpMethod.PUT){
                  console.log('call put method:'+fullUrl+', and data:'+JSON.stringify(args[0])) ;
                  return rest.put(fullUrl,args[0],timeout) ;
              }else if(httpMethod === HttpMethod.GET){
                  args.forEach( (arg,idx)=> fullUrl=fullUrl.replace(`{${idx}}`,arg) )  //依序取代掉網址上的變數
                  console.log('call delete method:'+fullUrl) ;
                  return rest.delete(fullUrl,timeout) ;
              }

          };
        }
      }
    );

    return proxy ;

  }

  private getHostUri():string {
    return environment.apiserver ;
  }

}
