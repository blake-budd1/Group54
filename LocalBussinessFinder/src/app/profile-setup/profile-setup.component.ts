import { Component, OnInit } from '@angular/core';
import { FileHandle } from '../model/file-handle';
import {DomSanitizer} from '@angular/platform-browser';
import { Buisness } from '../model/business.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { userSignedIn } from '../lfile';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.css']
})
export class ProfileSetupComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {
    //get business info from backend

  }
  popup = false;
  username: string = "NULL";
  img_Files : File[] =  []; 
  buisness: Buisness = {
    buisnessName: "",
    buisnessAddress: "",
    buisnessImages: [],
    buisnessImageNames: [],
    buisnessDescription: "",
    username: "",
    buisnessTags: []
  }
  selected_Buis: Buisness = {
    buisnessName: "",
    buisnessAddress: "",
    buisnessImages: [],
    buisnessImageNames: [],
    buisnessDescription: "",
    buisnessTags: [],
    username: ""
  }
  replaceImage(event: { target: any; }) {
    const defaultImage = 'data:image/png;base64,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';
    const imgElement = event.target;
    imgElement.src = defaultImage;
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
    userSignedIn.bussinessName = val;
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
  tagMap = [{}]
  dropdownSettings = {};






  getBuis() {
    let buildUrl = 'api/user=' + userSignedIn.currentUser;
    console.warn(buildUrl);
    this.http.get(buildUrl).pipe(
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    ).subscribe(response => {
      console.log(response);
      const obj = Object.assign(response)
      this.selected_Buis.buisnessName = obj.BuisnessText.buisnessName;
      this.selected_Buis.buisnessTags = obj.BuisnessText.buisnessTags;
      this.selected_Buis.buisnessAddress = obj.BuisnessText.buisnessAddress; 
      this.selected_Buis.buisnessDescription = obj.BuisnessText.buisnessDescription; 
      this.selected_Buis.buisnessTags= obj.BuisnessText.buisnessTags.split(";");
      console.warn(this.selected_Buis.buisnessName);
    })

    this.http.get(buildUrl).pipe(
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    ).subscribe(response => {
      //console.log(response);
      const obj = Object.assign(response)
      //console.warn(response)
      let BimageInfo = obj.ImageInfo.imageHolder; 
      //console.log(BimageInfo)
      //console.log("THIS")
      this.selected_Buis.buisnessImageNames.splice(0);
      for (let index = 0; index < BimageInfo.length; index++) {
        let imageInfoCopy = Object.assign(BimageInfo[index])
        //console.warn(imageInfoCopy.encodedImg); 
        this.selected_Buis.buisnessImageNames.push("data:image/png;base64," + imageInfoCopy.encodedImg); 
        //console.warn(this.selected_Buis.buisnessImageNames[index]);
      }

    })



  }
  currentImageIndex = 0;
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.selected_Buis.buisnessImageNames.length;
  }
  ngOnInit() {
    this.dropdownList = this.getData();
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      enableCheckAll: false,
      limitSelection: 5
    }

    console.log(userSignedIn.currentUser)
  
    //USER SIGNED IN WORKED! 

    let buildUrl = `api/user=` + userSignedIn.currentUser
  

    this.http.get(buildUrl).pipe(
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    ).subscribe(response => {
      console.log(response);
      const obj = Object.assign(response)
      console.warn(response)
      this.buisness.buisnessName = obj.BusinessText.buisnessName;
      this.buisness.buisnessTags = obj.BusinessText.buisnessTags;
      this.buisness.buisnessAddress = obj.BusinessText.buisnessAddress; 
      this.buisness.buisnessDescription = obj.BusinessText.buisnessDescription; 
      this.buisness.buisnessTags= obj.BusinessText.buisnessTags.split(";")
      this.buisness.username = obj.BuisnessText.user;
      console.log(this.buisness.buisnessName )
      console.log(this.buisness.buisnessTags )
      console.log(this.buisness.buisnessAddress )
      console.log(this.buisness.buisnessDescription )
      console.log(this.buisness.buisnessTags )

     }); 




    console.log(userSignedIn.currentUser)
     
    //USER SIGNED IN WORKED! 

    buildUrl = `api/user=` + userSignedIn.currentUser
  

    this.http.get(buildUrl).pipe(
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    ).subscribe(response => {
      console.log(response);
      const obj = Object.assign(response)
      console.warn(response)
      this.buisness.buisnessName = obj.BuisnessText.buisnessName;
      this.buisness.buisnessAddress = obj.BuisnessText.buisnessAddress; 
      this.buisness.buisnessDescription = obj.BuisnessText.buisnessDescription; 

      let BimageInfo = obj.ImageInfo.imageHolder; 
      console.log(BimageInfo)


      let tagList = obj.BuisnessText.buisnessTags.split(";")

      for(let i = 0 ; i < tagList.length; i++){
        let subList = tagList[i].split("_")
        let numMap = subList[0]
        let stringVal = subList[1]
        this.tagMap.push({item_id : numMap, item_text :  stringVal})
      }
      this.tagMap.shift()


      console.log(this.buisness)
      console.log(this.tagMap)
     }); 
     



  }
  //does not remove any
  onTagSelect(item: any) {
    let word = item.item_text;
    this.buisness.buisnessTags.push(word);
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
    console.warn(this.buisness.buisnessTags.length);
    this.buisness.buisnessTags.forEach(element => {
      console.warn(element);
    });
    for (let index = 0; index < this.buisness.buisnessImages.length; index++){
      this.img_Files.push(this.buisness.buisnessImages[index].file);
    }
    
    let buildUrl = `api/user=` + this.buisness.username + '/'
    return this.http.put(buildUrl, this.buisness).pipe(
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    ).subscribe(response => {
      console.log(response);
      const obj = Object.assign(response)

      for(let i = 0; i < this.img_Files.length; i++){
        const formData = new FormData()
        formData.append('business_img', this.img_Files[i])
        this.http.post(buildUrl + "images",  formData).pipe(
        catchError(error => {
          console.error(error);
          return throwError(error)
        })
        ).subscribe(response => {
          console.log(response)
        });
      }
    
      //console.log(obj.buisnessName)
      
      
    });
  }
  
};
