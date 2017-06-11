import { Component, OnInit } from '@angular/core';
import { SpecService } from "app/services/service/SpecService";

@Component({
  selector: 'app-asset-registry',
  templateUrl: './asset-registry.component.html',
  styleUrls: ['./asset-registry.component.css']
})
export class AssetRegistryComponent implements OnInit {

  constructor(private specService:SpecService) { }

  ngOnInit() {
    console.log('Step2. 重置頁面元件參數');
    this.specService.initialPage();
    console.log('Step3. 依頁面參數重新初始化頁面元件');
    this.specService.initialQueryCIOptions();

  }

  createSubmit(queryForm){

  }

}
