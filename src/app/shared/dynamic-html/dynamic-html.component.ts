import { Component, OnInit, Input, Output, EventEmitter,forwardRef  } from '@angular/core';
import { CodeName } from "app/vo/CodeName";
import { ControlValueAccessor,NG_VALUE_ACCESSOR } from "@angular/forms";

/**
 *  reference: http://blog.csdn.net/u010730126/article/details/70799099,
               https://dotblogs.com.tw/kinanson/2017/04/15/211606

    動態顯示不同種類的元件
 */

const noop = () => { };

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

  //元件類型
  @Input() private dynamicType:string ;
  //元件id
  @Input() private id?:string;
  //元件名稱(必填，須給ngModel綁定)
  @Input() private name:string;
  //元件必填屬性
  @Input() private required?:boolean=false;
  @Input() private disabled: boolean = false;
  @Input() private defaultValue ;

  //輸入框值
  @Input() private _value?:string ='';
  //單選下拉值
  @Input() private _selected?:CodeName ;
  //多選下拉值
  @Input() private _selects?:CodeName[]=[] ;


  //下拉選單項目
  @Input() private options?:CodeName[]=[] ;
  //icon style
  @Input() private p?:string='';
  //placeholder
  @Input() private placeholder?:string='';
  //說明欄位
  @Input() private label?:string='' ;

  private icon_clazz:string ;


  constructor() { }

  ngOnInit() {
    this.icon_clazz = 'glyphicon glyphicon-'+this.p ;
  }



  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;


  writeValue(obj: any): void {
    if(this.dynamicType==='InputText') this._value = obj ;
    else if(this.dynamicType==='InputPasswordText') this._value = obj ;
    else if(this.dynamicType==='SelectOneMenu') this._selected = obj ;
    else if(this.dynamicType==='SelectManyMenu') this._selects = obj ;

  }
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn ;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn ;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get value(): any {
    return this._value ;
  }

  set value(v: any) {
    console.log("set:"+v);
    if (v !== this._value) {
      this._value = v ;
      this.onChangeCallback(v);
    }
  }

  get selected():any{
    return this._selected ;
  }

  set selected(v:any){
    if (v != this._selected) {
      this._selected = v ;
      this.onChangeCallback(v);
    }
  }

  get selects():any{
    return this._selects ;
  }

  set selects(v:any){
    if (v != this._selects) {
      this._selects = v ;
      this.onChangeCallback(v);
    }
  }

  //當元件裡面的元件有動作時，也要通知外部一起更新
  blur(event){
    this._value = event.target.value ;
    console.log("change:"+this._value);
    this.onChangeCallback(event.target.value);
  }

  changeSelectOne(event){
    //改變了，也要把值向外通知
    this.onChangeCallback(this._selected) ;

  }

  changeSelectMany(event){
    this.onChangeCallback(this._selects) ;
  }



}
