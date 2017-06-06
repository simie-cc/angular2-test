import { Injectable } from "@angular/core";
import { BlockUI, NgBlockUI } from "ng-block-ui";

/**
 * 存放資產查詢的結果與相關查詢資產資料的服務
 */
@Injectable()
export class QueryAssetService{

  @BlockUI() blockUI: NgBlockUI;

}
