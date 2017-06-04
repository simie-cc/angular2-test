export class LoginUser{

  public name:string ;
  public password:string ;
  public token?:string ;
  public success?:boolean;
  public msg?:string;
  public roles?:{code:string,name:string}[];
    constructor(){

    }

}
