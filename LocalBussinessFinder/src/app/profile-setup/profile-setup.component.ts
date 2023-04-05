
import { Component, OnInit } from '@angular/core';
import { FileHandle } from '../model/file-handle';
import {DomSanitizer} from '@angular/platform-browser';
import { Buisness } from '../model/business.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.css']
})
export class ProfileSetupComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}
  buisness: Buisness = {
    buisnessName: "",
    buisnessAddress: "",
    buisnessImages: [],
    buisnessImageNames: [],
    buisnessDescription: "",
    username: "",
    buisnessTags: []
  }
  
  onFileSelected(event: any){
    console.log(event)
    if (event.target.files) {
    const file = event.target.files[0];

    const fileHandle: FileHandle = {
      file: file,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      )
    }
    if(this.buisness.buisnessImages.length < 8) {
      this.buisness.buisnessImages.push(fileHandle)
      //should this be a string?!
      this.buisness.buisnessImageNames.push(event.target.files[0].name);
    }
    }

  }
  removeImage(i: number) {
    this.buisness.buisnessImages.splice(i, 1);    
  }
  setBuisName(val: string) {
    this.buisness.buisnessName = val;
    console.warn(val);
  }
  setBuisAddy(val2: string) {
    this.buisness.buisnessAddress = val2;
    console.warn(val2);
  }
  setBuisDesc(val3: string) {
    this.buisness.buisnessDescription = val3;
    console.warn(val3);
  }
  setUSERNAMETEMP(val4: string) {
    this.buisness.username = val4;
    console.warn(val4);
  }

  dropdownList = [{}];
  dropdownSettings = {};
  ngOnInit() {
    this.dropdownList = this.getData();
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      enableCheckAll: false,
      limitSelection: 5
    }
  }
  //does not remove any
  onTagSelect(item: any) {
    this.buisness.buisnessTags.push(item.item_text);
    console.warn(item.item_text);
    for (let index = 0; index < this.buisness.buisnessTags.length; index++) {
      console.warn(this.buisness.buisnessTags[index]);
    }
  }
  onTagDeSelect(item: any) {
    let word = item.item_text;
    console.warn(word);
    for (let index = 0; index < this.buisness.buisnessTags.length; index++) {
      if (this.buisness.buisnessTags[index] == word) {
        this.buisness.buisnessTags.splice(index,1);
      }
    }
    for (let index = 0; index < this.buisness.buisnessTags.length; index++) {
      console.warn(this.buisness.buisnessTags[index]);
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

    console.warn('buisnessName is...' + this.buisness.buisnessName);
    var buildUrl = `api/user=` + this.buisness.username + '/'
    
    console.warn(this.buisness.buisnessTags.length);
    this.buisness.buisnessTags.forEach(element => {
      console.warn(element);
    });
    async sendData() {

    console.warn('buisnessName is...' + this.buisness.buisnessName);
    console.warn(this.buisness.buisnessTags.length);
    this.buisness.buisnessTags.forEach(element => {
      console.warn(element);
    });
    
    let buildUrl = `api/user=` + this.buisness.username + '/'
    return this.http.put(buildUrl, this.buisness).pipe(
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    ).subscribe(response => {
      console.log(response);
      const obj = Object.assign(response)

      //console.log(obj.buisnessName)
      
    });
    
  }
};
};
