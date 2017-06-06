import { CodeName } from "app/vo/CodeName";

export class QuerySpec {
  label:string;
  dynamicType:string;
  name:string;
  options?:CodeName[];
  required?:boolean;
  disabled?:boolean;
  p?:string;
}

