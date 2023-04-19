import { Component, Inject } from '@angular/core';
import { LoginList, userSignedIn, PopupUse } from '../lfile';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
//For each type of error, give the following output:
//invalid username: User
//invalid password: Pass
//invalid email: Email
//Passwords dont match: NotMatch
//User already in use: UserUsed
@Component({  selector: 'app-error_popup',
  templateUrl: './error_popup.component.html',
  styleUrls: ['./error_popup.component.css']
})
export class error_popup{
    constructor(
        public dialogRef: MatDialogRef<error_popup>,
        @Inject(MAT_DIALOG_DATA) public data: PopupUse
        ) {
            this.popupChoice = data.useCase;
            this.chooseDisplay();
        }
    popupChoice: string = "";
    displayUserWrong: boolean = false;
    displayPassWrong: boolean = false;
    displayEmailWrong: boolean = false;
    displayNotMatch: boolean = false;
    displayUserUsed: boolean = false;
    displayDataSub: boolean = false;
    chooseDisplay(){
        if(this.popupChoice == "User"){
            this.displayUserWrong = true;
        }else if(this.popupChoice == "Pass"){
            this.displayPassWrong = true;
        }else if(this.popupChoice == "Email"){
            this.displayEmailWrong = true;
        }else if(this.popupChoice == "NotMatch"){
            this.displayNotMatch = true;
        }else if(this.popupChoice == "UserUsed"){
            this.displayUserUsed = true;
        }else if(this.popupChoice == "DataSubmitted"){
            this.displayDataSub = true;
        }
    }
    closeDialog() {
        this.dialogRef.close('Close');
    }
}