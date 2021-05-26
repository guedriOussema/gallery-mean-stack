import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';
import { Image } from 'src/app/models/image.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  description:string;
}

@Component({
  selector: 'app-add-multiple-images',
  templateUrl: './add-multiple-images.component.html',
  styleUrls: ['./add-multiple-images.component.scss']
})
export class AddMultipleImagesComponent implements OnInit {
  image1Added: boolean = false;
  image2Added: boolean = false;
  image3Added: boolean = false;
  image4Added: boolean = false;

 

  constructor( public dialog: MatDialog, 
    private imagesService: ImagesService, 
    private authService: AuthService, private router: Router) { }

   

  descriptionDialog:any;

  selectedFile1 = null;
  url1: any;
  title1: any;
  description1: any = "";
  largeSize1: any = false;
  invalidFileType1: any = false;
  validFileType1: any = false;

  selectedFile2 = null;
  url2: any;
  title2: any;
  description2: any = "";
  largeSize2: any = false;
  invalidFileType2: any = false;
  validFileType2: any = false;

  selectedFile3 = null;
  url3: any;
  title3: any;
  description3: any = "";
  largeSize3: any = false;
  invalidFileType3: any = false;
  validFileType3: any = false;

  selectedFile4 = null;
  url4: any;
  title4: any;
  description4: any = "";
  largeSize4: any = false;
  invalidFileType4: any = false;
  validFileType4: any = false;

  



  openDialog(component, height) {
    let config = new MatDialogConfig();
    config = {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: height,
      width: '50%',
    };
    const dialogRef = this.dialog.open(component,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

   

  ngOnInit(): void {
  }

  onFileSelected1(event){
    this.selectedFile1 = event.target.files[0];
    let type = event.target.files[0].type.split("/", 1)[0];
  
    if(type == "image"){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      
      reader.onload = (_event) => {
        this.url1 = reader.result;
        this.largeSize1 = false;
        this.invalidFileType1 = false;
        this.validFileType1 = true;
        this.title1 = event.target.files[0].name;
        
      }
    } else {
      this.invalidFileType1 = true;
      this.validFileType1 = false;
    }
  
  }


  onFileSelected2(event){
    this.selectedFile2 = event.target.files[0];
    let type = event.target.files[0].type.split("/", 1)[0];
  
    if(type == "image"){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      
      reader.onload = (_event) => {
        this.url2 = reader.result;
        this.largeSize2 = false;
        this.invalidFileType2 = false;
        this.validFileType2 = true;
        this.title2 = event.target.files[0].name;
        
      }
    } else {
      this.invalidFileType2 = true;
      this.validFileType2 = false;
    }
  
  }



  onFileSelected3(event){
    this.selectedFile3 = event.target.files[0];
    let type = event.target.files[0].type.split("/", 1)[0];
  
    if(type == "image"){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      
      reader.onload = (_event) => {
        this.url3 = reader.result;
        this.largeSize3 = false;
        this.invalidFileType3 = false;
        this.validFileType3 = true;
        this.title3 = event.target.files[0].name;
        
      }
    } else {
      this.invalidFileType3 = true;
      this.validFileType3 = false;
    }
  
  }


  onFileSelected4(event){
    this.selectedFile4 = event.target.files[0];
    let type = event.target.files[0].type.split("/", 1)[0];
  
    if(type == "image"){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      
      reader.onload = (_event) => {
        this.url4 = reader.result;
        this.largeSize4 = false;
        this.invalidFileType4 = false;
        this.validFileType4 = true;
        this.title4 = event.target.files[0].name;
        
      }
    } else {
      this.invalidFileType1 = true;
      this.validFileType1 = false;
    }
  
  }




  

  onUpload(){

    if(this.selectedFile1){
    let image1: Image = new Image();
    image1.title = this.title1;
    image1.description = this.description1;
    image1.url = this.url1;
    image1.userId = this.authService.getUserDetails()._id;
    image1.numberOfLikes = 0;

    if(!this.description1){

      if(confirm("Are you sure to upload the image" + " 1 " + "without description ?")){
        this.imagesService.addImage(image1).subscribe((res)=>{
          console.log(res);
          this.selectedFile1 = null;
          this.description1 = null;
          this.image1Added = true;
        },
        ()=>{
          this.largeSize1 = true;
        })
      }
      
    } else {
      this.imagesService.addImage(image1).subscribe((res)=>{
        console.log(res);
        this.selectedFile1 = null;
        this.description1 = null;
        this.image1Added = true;
      },
      ()=>{
        this.largeSize1 = true;
      })
    }

    }



    if(this.selectedFile2){
      let image2: Image = new Image();
    image2.title = this.title2;
    image2.description = this.description2;
    image2.url = this.url2;
    image2.userId = this.authService.getUserDetails()._id;
    image2.numberOfLikes = 0;

    if(!this.description2){
      if(confirm("Are you sure to upload the image" + " 2 " + "without description ?")){
        this.imagesService.addImage(image2).subscribe((res)=>{
          console.log(res);
          this.selectedFile2 = null;
          this.description2 = null;
          this.image2Added = true;
        },
        ()=>{
          this.largeSize2 = true;
        })
      }
      } else {
        this.imagesService.addImage(image2).subscribe((res)=>{
          console.log(res);
          this.selectedFile2 = null;
          this.description2 = null;
          this.image2Added = true;
        },
        ()=>{
          this.largeSize2 = true;
        })
      }
    
    }


    if(this.selectedFile3){
      let image3: Image = new Image();
    image3.title = this.title2;
    image3.description = this.description3;
    image3.url = this.url3;
    image3.userId = this.authService.getUserDetails()._id;
    image3.numberOfLikes = 0;

    if(!this.description3){
     if(confirm("Are you sure to upload the image" + " 3 " + "without description ?")){
        this.imagesService.addImage(image3).subscribe((res)=>{
          console.log('add image');
          console.log(res);
          this.selectedFile3 = null;
          this.description3 = null;
          this.image3Added = true;
        },
        ()=>{
          this.largeSize3 = true;
        })
      }
      } else {
        this.imagesService.addImage(image3).subscribe((res)=>{
          console.log('add image');
          console.log(res);
          this.selectedFile3 = null;
          this.description3 = null;
          this.image3Added = true;
        },
        ()=>{
          this.largeSize3 = true;
        })
      }
    
    }



    if(this.selectedFile4){
      let image4: Image = new Image();
    image4.title = this.title4;
    image4.description = this.description4;
    image4.url = this.url4;
    image4.userId = this.authService.getUserDetails()._id;
    image4.numberOfLikes = 0;

    if(!this.description4){
     if(confirm("Are you sure to upload the image" + " 4 " + "without description ?")){
        this.imagesService.addImage(image4).subscribe((res)=>{
          console.log(res);
          this.selectedFile4 = null;
          this.description4 = null;
          this.image4Added = true;
        },
        ()=>{
          this.largeSize4 = true;
        })
      }
      } else {
        this.imagesService.addImage(image4).subscribe((res)=>{
          console.log(res);
          this.selectedFile4 = null;
          this.description4 = null;
          this.image4Added = true;
        },
        ()=>{
          this.largeSize4 = true;
        })
      }
    }

    

    }



}
