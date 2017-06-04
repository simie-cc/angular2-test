import { Component, OnInit, Input } from '@angular/core';

/**
 * Available Glyphs
 * https://www.w3schools.com/bootstrap/bootstrap_ref_comp_glyphs.asp
 * 少打幾個字的元件，只需輸入 ex: glyphicon glyphicon-asterisk 在 - 之後的 asterisk 即可
 * ex: <icon p="asterisk"></icon>
 */

@Component({
  selector: 'icon',
  templateUrl: './glyphicon.component.html',
  styleUrls: ['./glyphicon.component.css']
})
export class GlyphiconComponent implements OnInit {

  @Input() private p:string ;
  private clazz:string ;

  constructor() { }

  ngOnInit() {
    this.clazz = 'glyphicon glyphicon-'+this.p ;
  }

}
