import { Component, Input, OnInit, inject } from '@angular/core';
import { Nft } from '../../../models/nft';
import { NgStyle, CurrencyPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: '[nft-single-card]',
    templateUrl: './nft-single-card.component.html',
    standalone: true,
    imports: [NgStyle, CurrencyPipe,AngularSvgIconModule,TranslateModule],
})
export class NftSingleCardComponent implements OnInit {
  @Input() nft: Nft = <Nft>{};

  translate:TranslateService = inject(TranslateService);

  constructor() {}

  ngOnInit(): void {}
}
