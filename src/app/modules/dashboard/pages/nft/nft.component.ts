import { Component, OnInit } from '@angular/core';
import { Nft } from '../../models/nft';
import { NftSingleCardComponent } from '../../components/nft/nft-single-card/nft-single-card.component';
@Component({
    selector: 'app-nft',
    templateUrl: './nft.component.html',
    standalone: true,
    imports: [
        NftSingleCardComponent,
    ],
})
export class NftComponent implements OnInit {
  nft: Array<Nft>;

  constructor() {
    this.nft = [
      {
        id: 34356771,
        title: 'Girls of the Cartoon Universe',
        creator: 'Jhon Doe',
        instant_price: 4.2,
        price: 187.47,
        ending_in: '06h 52m 47s',
        last_bid: 0.12,
        image: './assets/images/img-01.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 1,
        title: 'ROLES.ADMIN',
        subtitle:'ROLES.TEXTLINE',
        image: './assets/icons/heroicons/outline/users.svg',
      },
      {
        id: 2,
        title: 'ROLES.HR',
        subtitle:'ROLES.TEXTLINE',
        image: './assets/icons/heroicons/outline/users.svg',
      },
      {
        id: 3,
        title: 'ROLES.FINANCE',
        subtitle:'ROLES.TEXTLINE',
        image: './assets/icons/heroicons/outline/users.svg',
      },
      {
        id: 4,
        title: 'ROLES.GUIDANCE',
        subtitle:'ROLES.TEXTLINE',
        image: './assets/icons/heroicons/outline/users.svg',
      },
    ];
  }

  ngOnInit(): void {}
}
