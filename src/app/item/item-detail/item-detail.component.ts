import { Component, OnInit } from '@angular/core';
import { Image, Item } from 'src/app/shared/model/Item.model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit 
{
  editable: boolean = false;
  item?: Item;
  images: Image[] = [];

  constructor() { }

  ngOnInit(): void 
  {
    for(let i = 0; i < 15; i++)
    {
      this.images.push({
        id:        1,
        url:       'https://aws-vincent-frontend-demo.s3.amazonaws.com/files/user8-cat.png',
        file_name: 'cat',
        size:      100,
      });
    }

    if(this.item === undefined)
      this.editable = true;
  }

}
