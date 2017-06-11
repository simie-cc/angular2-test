import { Component, OnInit, Input, Output, EventEmitter,forwardRef  } from '@angular/core';
import { CodeName } from "app/vo/CodeName";
import { ControlValueAccessor,NG_VALUE_ACCESSOR } from "@angular/forms";
import { IMyDpOptions } from "mydatepicker";
import { LDAP } from "app/vo/LDAP";

/**
 *  reference: http://blog.csdn.net/u010730126/article/details/70799099,
               https://dotblogs.com.tw/kinanson/2017/04/15/211606

    動態顯示不同種類的元件
 */

const noop = () => {};

export const EXE_COUNTER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DynamicHtmlComponent),
    multi: true
};

@Component({
  selector: 'dynamic-html',
  templateUrl: './dynamic-html.component.html',
  styleUrls: ['./dynamic-html.component.css'],
  providers: [EXE_COUNTER_VALUE_ACCESSOR]
})
export class DynamicHtmlComponent implements OnInit,ControlValueAccessor  {

  //提供給外部使用的必要屬性
  @Input() private dynamicType:string ; //元件類型
  @Input() private name:string; //元件名稱
  @Input() private required?:boolean=false; //元件必填屬性
  @Input() private disabled: boolean = false; //元件disabled屬性
  //提供給外部使用的其它非必要屬性
  @Input() private options?:CodeName[]=[] ; //下拉選單項目
  @Input() private p?:string=''; //icon style
  @Input() private placeholder?:string=''; //placeholder
  @Input() private label?:string='' ; //說明欄位
  @Input() private dateOptions:IMyDpOptions; //日期選單設定
  @Input() private optionsCom?:CodeName[]=[] ; //LDAP選單
  @Input() private optionsOrg?:CodeName[]=[] ; //LDAP選單
  @Input() private optionsUnit?:CodeName[]=[] ; //LDAP選單

  //以下是外部使用可監聽事件
  @Output() private dateChanged = new EventEmitter() ; //當datepicker日期有變化時
  @Output() private inputFieldChanged = new EventEmitter() ;
  @Output() private inputBlur = new EventEmitter() ; //當InputText輸入onBlur時
  @Output() private changeSelectOne = new EventEmitter() ; //當SelectOneMenu改變選項時
  @Output() private changeSelectMany = new EventEmitter() ; //當SelectManyMenu改變選項時
  @Output() private changeSelectCom = new EventEmitter() ;
  @Output() private changeSelectOrg = new EventEmitter() ;
  @Output() private changeSelectUnit = new EventEmitter() ;


  private icon_clazz:string ; //內部使用icon style
  private _value?:string =''; //內部使用輸入框值
  private _selected?:CodeName ; //內部使用單選下拉值
  private _selects?:CodeName[]=[] ; //內部使用多選下拉值
  private _dateModel?:Object ; //內部使用日期值
  private _ldapModel?:LDAP ; //內部使用LDAP值

  constructor() {}

  ngOnInit() {
    this.icon_clazz = 'glyphicon glyphicon-'+this.p ;
    if(!this.placeholder) this.placeholder='';
  }


  //以下實作ControlValueAccessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  writeValue(obj: any): void {
    // if(obj==null) return ; //不能return 會造成form.reset()無法清除
    if(this.dynamicType==='InputText') this._value = obj ;
    else if(this.dynamicType==='InputPasswordText') this._value = obj ;
    else if(this.dynamicType==='SelectOneMenu') this._selected = obj ;
    else if(this.dynamicType==='SelectManyMenu') this._selects = obj ;
    else if(this.dynamicType==='DatePicker') this._dateModel = obj ;
    else if(this.dynamicType==='SelectLDAP') this._dateModel = obj ;

  }
  registerOnChange(fn: any): void { this.onChangeCallback = fn ; }
  registerOnTouched(fn: any): void { this.onTouchedCallback = fn ; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  //提供給外部存取值欄位
  get value(): any { return this._value ; }
  set value(v: any) { if (v !== this._value) { this._value = v ; this.onChangeCallback(v); } }
  get selected():any{ return this._selected ; }
  set selected(v:any){ if (v != this._selected) { this._selected = v ; this.onChangeCallback(v); } }
  get selects():any{return this._selects ;}
  set selects(v:any){if (v != this._selects) { this._selects = v ; this.onChangeCallback(v); } }
  get dateModel():any{ return this._dateModel ; }
  set dateModel(v:any){ if (v != this._dateModel) { this._dateModel = v ; this.onChangeCallback(v); } }
  get ldapModel():any{ return this._ldapModel ; }
  set ldapModel(v:any){ if (v != this._ldapModel) { this._ldapModel = v ; this.onChangeCallback(v); } }

  //當元件裡面的元件有動作時，也要把事件往外發送
  onInputBlur(event){ this.onChangeCallback(event.target.value); this.inputBlur.emit(event); } //發送原生事件
  onChangeSelectOne(event){
    this.onChangeCallback(this._selected) ;
    this.changeSelectOne.emit(event)
  } //發送原生事件
  onChangeSelectMany(event){ this.onChangeCallback(this._selects) ; this.changeSelectMany.emit(event) } //發送原生事件
  onDateChanged(event){ this.onChangeCallback(this._dateModel) ; this.dateChanged.emit(event); } //發送mydate物件
  onInputFieldChanged(event){ this.onChangeCallback(this._dateModel) ; this.dateChanged.emit(event); }
  onChangeSelectCom(event){
    this.onChangeCallback(this._ldapModel) ;
    this.changeSelectCom.emit(event);
  }
  onChangeSelectOrg(event){
    this.onChangeCallback(this._ldapModel) ;
    this.changeSelectOrg.emit(event);
  }
  onChangeSelectUnit(event){
    this.onChangeCallback(this._ldapModel) ;
    this.changeSelectUnit.emit(event);
  }

}
