import { HttpMethod } from "app/services/servicebroker/HttpMethod";
//這裡不須import 'reflect-metadata';，多次import會死掉，所以移至 ployfill.ts 統一 import

export const REST_METADATA = Symbol('_rest_metadata_');
export const DEFAULT_TIMEOUT:number = 5000 ;

//@RestHandler({baseUrl:'/api/hello'})
export function RestHandler(options:{baseUrl:string}){
  //console.log('RestHandler:'+JSON.stringify(options)) ;
  //target 會是掛載 @Web 的 class
  return function(target:any){
    //將掛載的內容存到 target 的 metadat 裡
    Reflect.defineMetadata(REST_METADATA, { baseUrl: options.baseUrl }, target) ;
  }
}

//@ResuestMapping({path:"/hello", method: HttpMethod.GET, timeout:3000})
export function RequestMapping(options:{path:string,method:HttpMethod,timeout?:number}){
  //console.log('RestMapping:'+JSON.stringify(options)) ;
  //target 會是掛載的method所屬的Class物件的prototype
  return Reflect.metadata(REST_METADATA, { path:options.path, method:options.method, timeout:options.timeout }) ;
}

