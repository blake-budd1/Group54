import { Component } from '@angular/core';
import { FileHandle } from '../model/file-handle';
import {DomSanitizer} from '@angular/platform-browser';
import { Buisness } from '../model/business.model';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  constructor(private sanitizer: DomSanitizer) {}
  buisness: Buisness = {
    buisnessImages: []
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
      this.buisness.buisnessImages.push(fileHandle);
    }
    }

  }
  removeImage(i: number) {
    this.buisness.buisnessImages.splice(i, 1);    
  }
}
