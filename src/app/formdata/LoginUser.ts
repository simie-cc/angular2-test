import {CodeName} from "app/vo/CodeName";
export class LoginUser{

  public name:string ;
  public password:string ;
  public token?:string ;
  public success?:boolean;
  public msg?:string;
  public roles?:CodeName[];

}
