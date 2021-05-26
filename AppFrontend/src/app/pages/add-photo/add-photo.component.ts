import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { Image } from 'src/app/models/image.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {

  selectedFile = null;
  url: any;
  title: any;
  description: any = "";
  largeSize: any = false;
  invalidFileType: any = false;
  validFileType: any = false;

  constructor(private imagesService: ImagesService, private authService: AuthService, private router: Router) { }

ngOnInit(): void {

 

}

onFileSelected(event){
  this.selectedFile = event.target.files[0];
  let type = event.target.files[0].type.split("/", 1)[0];

  if(type == "image"){
    var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.url = reader.result;
      this.largeSize = false;
      this.invalidFileType = false;
      this.validFileType = true;
      this.title = event.target.files[0].name;
      
		}
  } else {
    this.invalidFileType = true;
    this.validFileType = false;
  }

}

onUpload(){
    let image: Image = new Image();
    image.title = this.title;
    image.description = this.description;
    image.url = this.url;
    image.userId = this.authService.getUserDetails()._id;
    image.numberOfLikes = 0;

    if(!this.description){
      if(confirm("Are you sure to upload the image without description ?")){
        this.imagesService.addImage(image).subscribe((res)=>{
          console.log('add image');
          console.log(res);
          this.router.navigateByUrl('/home');
        },
        (err)=>{
          this.largeSize = true;
        })

      }
    } else {
      this.imagesService.addImage(image).subscribe((res)=>{
        console.log('add image');
        console.log(res);
        this.router.navigateByUrl('/home');
      },
      (err)=>{
        this.largeSize = true;
      })
    }

    
}

onCancel(){
  this.router.navigateByUrl('home');
}

onAddMultiplePhotos(){
  this.router.navigateByUrl('home/add-multiple-photos'); 
}


}
