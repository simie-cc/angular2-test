import { LDAP } from "app/vo/LDAP";
import { Component, OnInit, Input, Output, EventEmitter,forwardRef  } from '@angular/core';
import { CodeName } from "app/vo/CodeName";
import { ControlValueAccessor,NG_VALUE_ACCESSOR } from "@angular/forms";

const noop = () => { };

export const EXE_COUNTER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LdapMenuComponent),
    multi: true
};

/**
 * 呈現LDAP組織階層選單
 */
@Component({
  selector: 'ldap-menu',
  templateUrl: './ldap-menu.component.html',
  styleUrls: ['./ldap-menu.component.css'],
  providers: [EXE_COUNTER_VALUE_ACCESSOR]
})
export class LdapMenuComponent implements OnInit, ControlValueAccessor {

  @Input() private comrequired?:boolean=false;
  @Input() private orgrequired?:boolean=false;
  @Input() private unitrequired?:boolean=false;

  @Input() private comdisabled?:boolean=false;
  @Input() private orgdisabled?:boolean=false;
  @Input() private unitdisabled?:boolean=false;

  private _ldap:LDAP ={ com:{code:"",name:""}, org:{code:"",name:""}, unit:{code:"",name:""} };

  @Input() private optionsCom:CodeName[] ;
  @Input() private optionsOrg:CodeName[] ;
  @Input() private optionsUnit:CodeName[] ;

  constructor() { }

  ngOnInit() {
  }


  //以下實作ControlValueAccessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  writeValue(obj:LDAP): void {
    if(obj==null) return ;
    this._ldap = obj ;
  }
  registerOnChange(fn: any): void { this.onChangeCallback = fn ; }
  registerOnTouched(fn: any): void { this.onTouchedCallback = fn ; }
  setDisabledState(isDisabled: boolean): void {
    this.comdisabled = isDisabled ;
    this.orgdisabled = isDisabled ;
    this.unitdisabled = isDisabled ;
  }

  get modelCom(){
    return this._ldap.com ;
  }
  set modelCom(v:CodeName){
    if(v.code !== this._ldap.com.code){
          this._ldap.com = v ;
      }
      this.onChangeCallback(v);
  }
  get modelOrg(){
    return this._ldap.org ;
  }
  set modelOrg(v:CodeName){
    if(v.code !== this._ldap.org.code){
          this._ldap.org = v ;
      }
      this.onChangeCallback(v);
  }
  get modelUnit(){
    return this._ldap.unit ;
  }
  set modelUnit(v:CodeName){
    if(v.code !== this._ldap.unit.code){
          this._ldap.unit = v ;
      }
      this.onChangeCallback(v);
  }

  @Output() private changeSelectCom = new EventEmitter() ;
  @Output() private changeSelectOrg = new EventEmitter() ;
  @Output() private changeSelectUnit = new EventEmitter() ;

  onChangeSelectCom(event){
    // console.log('onChangeSelectCom value:'+JSON.stringify(this._ldap));
    this.onChangeCallback(this._ldap);
    this.changeSelectCom.emit(event) ;
  }

  onChangeSelectOrg(event){
    // console.log('onChangeSelectOrg value:'+JSON.stringify(this._ldap));
    this.onChangeCallback(this._ldap);
    this.changeSelectOrg.emit(event) ;
  }

  onChangeSelectUnit(event){
    // console.log('onChangeSelectUnit value:'+JSON.stringify(this._ldap));
    this.onChangeCallback(this._ldap);
    this.changeSelectUnit.emit(event) ;
  }

}
