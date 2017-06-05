import { Component, OnInit, Input, Output, EventEmitter,forwardRef  } from '@angular/core';
import { CodeName } from "app/vo/CodeName";
import { ControlValueAccessor,NG_VALUE_ACCESSOR } from "@angular/forms";


//reference: https://segmentfault.com/a/1190000009070500

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

  @Input() private dynamicType:string ;
  @Input() private id?:string;
  @Input() private name?:string;
  @Input() private required?:boolean=false;

  //輸入框
  @Input() private _value?:string ='';

  //下拉選單
  @Input() private _selected?:CodeName ;
  @Input() private _selects?:CodeName[]=[] ;
  @Input() private options?:CodeName[]=[] ;

  @Input() private p?:string='';
  @Input() private placeholder?:string='';
  @Input() private label?:string='' ;

  private icon_clazz:string ;


  constructor() { }

  ngOnInit() {
    this.icon_clazz = 'glyphicon glyphicon-'+this.p ;
  }



  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private disabled: boolean = false;

  writeValue(obj: any): void {
    this._value = obj ;
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
    if (v !== this._value) {
      this._value = v ;
      this.onChangeCallback(v);
    }
  }

  get selected():any{
    return this._selected ;
  }

  set selected(v:any){
    if (v !== this._selected) {
      this._selected = v ;
      this.onChangeCallback(v);
    }
  }

  //當元件裡面的元件有動作時，也要通知外部一起更新
  input(event){
    this._value = event.target.value ;
    this.onChangeCallback(event.target.value);
  }

  changeSelectOne(event){
    console.log('改變了~~~'+JSON.stringify(this._selected));
    console.log('改變了改變了~~~'+typeof event.target.value);
    // this._selected = event.target.value ;
    this.onChangeCallback(event.target) ;
  }

  changeSelectMany(event){
    this.onChangeCallback(event.target) ;
  }



}
