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

/**
 * <ldap-menu name="abc" id="abc" (selectOrg)="handleOrg($event)" ...
 * value="{com:1,org:2,unit:3}" ></ldap-menu>
 */

  @Input() private name:string ;
  @Input() private id?:string ;

  @Input() private comrequired?:boolean=false;
  @Input() private orgrequired?:boolean=false;
  @Input() private unitrequired?:boolean=false;

  @Input() private comdisabled?:boolean=false;
  @Input() private orgdisabled?:boolean=false;
  @Input() private unitdisabled?:boolean=false;

  private _selectCom:CodeName ;
  private _selectOrg:CodeName ;
  private _selectUnit:CodeName ;

  private optionsCom:CodeName[] ;
  private optionsOrg:CodeName[] ;
  private optionsUnit:CodeName[] ;

  private _comname:string ;
  private _orgname:string;
  private _unitname:string;

  constructor() { }

  ngOnInit() {
    console.log('Ldap-Menu Component ngOnInit') ;
    this.optionsCom = [{code:"1",name:"A"},{code:"2",name:"B"},{code:"3",name:"C"}] ;
    this.optionsOrg = [{code:"4",name:"D"},{code:"5",name:"E"},{code:"6",name:"F"}] ;
    this.optionsUnit = [{code:"7",name:"G"},{code:"8",name:"H"},{code:"9",name:"I"}] ;
    console.log('write value:'+JSON.stringify(this.value))
    this._comname = 'com_'+this.name;
    this._orgname = 'org_'+this.name;
    this._unitname = 'unit_'+this.name;
  }


  //以下實作ControlValueAccessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  writeValue(obj:LDAP): void {
    console.log(obj) ;
    if(obj==null) return ;
    this._selectCom = obj.com ;
    this._selectOrg = obj.org ;
    this._selectUnit = obj.unit ;
    console.log('write value:'+JSON.stringify(this._selectCom))
    console.log('write value:'+JSON.stringify(this._selectOrg))
    console.log('write value:'+JSON.stringify(this._selectUnit))
  }
  registerOnChange(fn: any): void { this.onChangeCallback = fn ; }
  registerOnTouched(fn: any): void { this.onTouchedCallback = fn ; }
  setDisabledState(isDisabled: boolean): void {
    this.comdisabled = isDisabled ;
    this.orgdisabled = isDisabled ;
    this.unitdisabled = isDisabled ;
  }

  get value(){
    console.log('get value:'+JSON.stringify({ com:this._selectCom, org:this._selectOrg, unit:this._selectUnit }) );
    return { com:this._selectCom, org:this._selectOrg, unit:this._selectUnit } ;
  }

  set value(v:any){
    console.log('set value:'+JSON.stringify(v));
    if(this.value != v)this.value = v ;
    this.onChangeCallback(this.value);
  }

  @Output() private changeSelectCom = new EventEmitter() ;
  @Output() private changeSelectOrg = new EventEmitter() ;
  @Output() private changeSelectUnit = new EventEmitter() ;

  onChangeSelectCom(event){
    console.log('onChangeSelectCom value:'+JSON.stringify(this.value));
    this.onChangeCallback(this.value);
    this.changeSelectCom.emit(this.value) ;
  }

  onChangeSelectOrg(event){
    console.log('onChangeSelectOrg value:'+JSON.stringify(this.value));
    this.onChangeCallback(this.value);
    this.changeSelectCom.emit(this.value) ;
  }

  onChangeSelectUnit(event){
    console.log('onChangeSelectUnit value:'+JSON.stringify(this.value));
    this.onChangeCallback(this.value);
    this.changeSelectCom.emit(this.value) ;
  }

}
