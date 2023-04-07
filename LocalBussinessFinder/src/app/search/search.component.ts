import { Component, OnInit } from '@angular/core';
import { Buisness } from '../model/business.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private http: HttpClient){}
  
  public buisnesses: Array<Buisness> = [
    {buisnessName: "Tea Stori",
    buisnessAddress: "3550 SW 34th St, Gainesville, FL 32608",
    buisnessImages: [],
    buisnessImageNames: [],
    buisnessDescription: "Chain cafe serving Taiwanese bubble teas & snacks such as fried popcorn chicken.",
    username: "tiger_Fresh",
    buisnessTags: ["Boba", "Food", "Cafe"]},
    {
      buisnessName: "Tea Stori2",
      buisnessAddress: "3550 SW 34th St, Gainesville, FL 32608",
      buisnessImages: [],
      buisnessImageNames: [],
      buisnessDescription: "Chain cafe serving Taiwanese bubble teas & snacks such as fried popcorn chicken.",
      username: "tiger_Fresh",
      buisnessTags: ["Boba", "Food", "Cafe"]
    }
  ]
  // backend_Businesses: Array<Buisness>;
  popup = false;
  selectedTags:String[] = [];
  dropdownList = [{}];
  dropdownSettings = {};
  ngOnInit() {
    this.dropdownList = this.getData();
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      enableCheckAll: false
    }
    return this.http.get<any>('/api/').subscribe(response => {
      // how to do for each?
      this.buisnesses.push(Object.assign(response));
    })
  }
  //does not remove any
  onTagSelect(item: any) {
    let word = item.item_text;
    this.selectedTags.push(word);
    console.warn(item.item_text);
    for (let index = 0; index < this.selectedTags.length; index++) {
      console.warn(this.selectedTags[index]);
    }
  }
  onTagDeSelect(item: any) {
    let word = item.item_text;
    console.warn(word);
    for (let index = 0; index < this.selectedTags.length; index++) {
      if (this.selectedTags[index] == word) {
        this.selectedTags.splice(index,1);
      }
    }
    for (let index = 0; index < this.selectedTags.length; index++) {
      console.warn(this.selectedTags[index]);
    }
  }
  getData() {
    return [
      { item_id: 1, item_text: 'Food' },
      { item_id: 2, item_text: 'Clothing' },
      { item_id: 3, item_text: 'Thrift' },
      { item_id: 4, item_text: 'Pet-friendly' },
      { item_id: 5, item_text: 'Cafe' },
      { item_id: 6, item_text: 'Boba' },
      { item_id: 7, item_text: 'Bakery' },
      { item_id: 8, item_text: 'Free Wifi'},
      { item_id: 9, item_text: 'Vintage'},
      { item_id:10, item_text: 'Jewelry'},
      { item_id: 11, item_text: 'Men\'s Fashion'},
      { item_id:12, item_text: 'Women\'s Fashion'},
      { item_id:13, item_text: 'Athletics'},
      { item_id:14, item_text: 'Shoes'},
      { item_id:15, item_text: 'Non-GMO'},
      { item_id:16, item_text: 'Vegan'},
      { item_id:17, item_text: 'Vegetarian'}
    ]
  };
  async sendData() {
    // backend stuff
    console.warn(this.selectedTags);
  }
}
