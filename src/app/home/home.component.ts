import { Component, OnInit } from '@angular/core';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { Category, Item } from '../shared/model/Item.model';
import { ItemService } from '../shared/service/item.service';
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchText: string = '';
  categories: Category[] = [];
  items: Item[] = [];
  originalItems: Item[] = [];
  categoryListOptions: MatListOption[] = [];
  conditionListOptions: MatListOption[] = [];
  item_length: number = 0;
  min: number = 0;
  max: number = 0;
  start: number = 0;
  end: number = 10;

  constructor(
    public itemService: ItemService,
    private userService: UserService) { }

  ngOnInit() 
  {
    this.itemService.getAllCategory()
    .subscribe(
      res => this.categories = res
    );

    this.itemService.getAllItem()
    .subscribe(
      res => {
        this.originalItems = structuredClone(res);
        this.items = this.originalItems;
        this.item_length = this.originalItems.length;
        this.filter();
      }
    );
  }

  padgination(paginator?: MatPaginator)
  {
    if(paginator)
    {
      let pageSize = paginator.pageSize;
      let currentPage = paginator.pageIndex;
      this.start = currentPage * pageSize;
      this.end = this.start + pageSize;
      this.filter();
    }
  }

  filter()
  {
    let tempItems: Item[] = structuredClone(this.originalItems);
    
    if(this.categoryListOptions.length > 0)
      tempItems = tempItems.filter((item) => this.categoryListOptions.some((category) => item.categories.some((c) => c.name.toLowerCase() === category.value.toLowerCase())));
    
    if(this.conditionListOptions.length > 0)
      tempItems = tempItems.filter((item) => this.conditionListOptions.some((condition) => item.item_condition.toLowerCase() === condition.value.toLowerCase()));
    
    if(this.min && this.max && this.min <= this.max && this.min > 0 && this.max > 0)
    {
      tempItems = tempItems.filter((item) => {
        let price = item.price - item.discount_price;
        return price >= this.min && price <= this.max;
      })
    }

    //search bar
    if(this.searchText)
    {
      tempItems = tempItems.filter((item) => {
        return item.name.toLowerCase().indexOf(this.searchText) > -1 ||
               item.categories.some((category) => category.name.toLowerCase() === this.searchText) ||
               item.item_condition.toLowerCase() === this.searchText;
      })
    }

    // fillter banded item
    if(!this.userService.isLogin() || !(this.userService.isAdmin() || this.userService.isOwner()))
      tempItems = tempItems.filter((item) => item.status !== 'BANDED');
    
    this.item_length = tempItems.length;
    this.items = tempItems.slice(this.start, this.end);
  }

  filterCategory(matSlectionListT: MatSelectionList)
  {
    this.categoryListOptions = matSlectionListT.selectedOptions.selected;
    this.filter();
  }

  filterCondition(matSlectionListT: MatSelectionList)
  {
    this.conditionListOptions = matSlectionListT.selectedOptions.selected;
    this.filter();
  }

  

}
