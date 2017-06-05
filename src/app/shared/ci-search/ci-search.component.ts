import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ci-search',
  templateUrl: './ci-search.component.html',
  styleUrls: ['./ci-search.component.css']
})
export class CiSearchComponent implements OnInit {

  private name:string ;
  private options=[{code:'1',name:'A'},{code:'2',name:'B'},{code:'3',name:'C'}]; //for test
  test(f){
    console.log(f.value);
  }
  doLogin(f){
    console.log(f.value);
  }
  testInput(e){
    console.log(e);
  }
  changeSelectOne(e){
    console.log(e);
  }

  constructor() { }

  ngOnInit() {
  }

}
