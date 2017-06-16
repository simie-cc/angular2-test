import { Component, OnInit, Input, Output, EventEmitter,forwardRef  } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR } from "@angular/forms";
import { ServiceBroker } from "app/services/servicebroker/ServiceBroker";
import { ApiLdapHandler } from "app/services/api/ApiLdapHandler";

const noop = () => { };

export const EXE_COUNTER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LdapPickerComponent),
    multi: true
};


@Component({
  selector: 'ldap-picker',
  templateUrl: './ldap-picker.component.html',
  styleUrls: ['./ldap-picker.component.css'],
  providers:[
    EXE_COUNTER_VALUE_ACCESSOR
  ]
})
export class LdapPickerComponent implements OnInit,ControlValueAccessor{

  _model:{
    com:{code:string,name:string},
    org:{code:string,name:string},
    unit:{code:string,name:string}
  } = {
    com:{code:'',name:''},
    org:{code:'',name:''},
    unit:{code:'',name:''}
  }

  optionsCom:{code:string,name:string}[] =[
    {code:'o=cht;0000',name:'=====請選擇====='},
    {code:'o=cht,c=tw;0100',name:'中華電信公司'},
    {code:'o=cht,c=tw;8080',name:'中華電信研究院'}
  ] ;
  optionsOrg:{code:string,name:string}[] ;
  optionsUnit:{code:string,name:string}[] ;

  constructor(private sb:ServiceBroker) { }

  ngOnInit() {
  }

  @Output() private changeSelectCom = new EventEmitter() ;
  @Output() private changeSelectOrg = new EventEmitter() ;
  @Output() private changeSelectUnit = new EventEmitter() ;

  onChangeSelectCom(event){
    let api:ApiLdapHandler = this.sb.getApiHandler(ApiLdapHandler)
    let splits = this._model.com.code.split(";")
    api.getChtUnitsForUI(splits[0],splits[1]).subscribe(
      (orgOptions:{code:string,name:string}[])=>{
        console.log('收到資料:'+JSON.stringify(orgOptions))
        this.optionsOrg = orgOptions ;
      },
      (error)=>{
        //TODO 發出error事件
      }
    )
    this.onChangeCallback(this._model);
    this.changeSelectCom.emit(event);
  }

  onChangeSelectOrg(event){
    let api:ApiLdapHandler = this.sb.getApiHandler(ApiLdapHandler)
    let splits = this._model.org.code.split(";")
    api.getChtUnitsForUI(splits[0],splits[1]).subscribe(
      (unitOptions:{code:string,name:string}[])=>{
        console.log('收到資料:'+JSON.stringify(unitOptions))
        this.optionsUnit = unitOptions ;
      },
      (error)=>{
        //TODO 發出error事件
      }
    )
    this.onChangeCallback(this._model);
    this.changeSelectOrg.emit(event) ;
  }

  onChangeSelectUnit(event){
    this.onChangeCallback(this._model);
    this.changeSelectUnit.emit(event) ;
  }

  compareCode(e1:{code:string,name:string},e2:{code:string,name:string}){
    if(e1==null && e2!=null) return false ;
    else if(e2==null && e1!=null) return false ;
    else if(e1==null && e2==null) return true ;
    else return e1.code === e2.code ;
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  writeValue(obj: any): void {
    console.log('寫回資料:'+JSON.stringify(obj)) ;
    this._model = obj ;
  }
  registerOnChange(fn: any): void { this.onChangeCallback = fn ; }
  registerOnTouched(fn: any): void { this.onTouchedCallback = fn ; }
  setDisabledState(isDisabled: boolean): void {

  }

  get model(){
    return this._model ;
  }

  set model(m:any){
    this._model = m ;
  }

}
