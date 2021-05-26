import { Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from '../models/image.model';
import { AuthService } from '../services/auth.service';
import { ImagesService } from '../services/images.service';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent implements OnInit {

  isLike: any;
  isFavorite: any;
  canDelete: any = false;
  likes: any = [];

  favorite: boolean = false;

  @Input() image: Image = new Image();
  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();
  numberLikes: any;


  constructor(private imagesService:ImagesService, private authService: AuthService, private router: Router) {
    let userId = this.authService.getUserDetails()._id;

   
   }

  ngOnInit(): void {

   this.favorite = this.imagesService.getFavorite();
   
   let userId = this.authService.getUserDetails()._id;
   let imageId = this.image._id;

   if(userId == this.image.userId){
    this.canDelete = true;
  }

   
   this.imagesService.getFavorites(userId,imageId).subscribe((res: any)=>{
     if(res.length > 0){
      this.isFavorite = true;
     } else {
       this.isFavorite = false;
     }
   })


   this.imagesService.getLikes(userId,imageId).subscribe((res: any)=>{
    if(res.length > 0){
      this.isLike = true;
    } else {
      this.isLike = false;
    }
  })

    this.imagesService.getLikesOfImage(imageId).subscribe((res:any)=>{
      for(let r of res){
        this.likes.push(r.username);
      }
      this.numberLikes = this.likes.length;
      this.image.numberOfLikes = this.numberLikes;
    })
  

  }

  async onLike(){

    let userId = this.authService.getUserDetails()._id;
    let username = this.authService.getUserDetails().username;
    let imageId = this.image._id;
    if(this.isLike == false){
      await this.imagesService.addLike(userId, username, imageId).subscribe(async (res: any)=>{
        this.isLike = true;
        this.numberLikes +=1;
        this.image.numberOfLikes = this.numberLikes;

        await this.imagesService.patchImage(this.image._id, this.numberLikes).subscribe((res)=>{
          console.log(res);
        },
        (err)=>{
          console.log(err);
        })

      })
    } else{
      this.imagesService.deleteLike(userId, imageId).subscribe((res:any)=>{
        this.isLike = false;
        this.numberLikes -=1;
        this.image.numberOfLikes = this.numberLikes;

        this.imagesService.patchImage(this.image._id, this.numberLikes).subscribe((res)=>{
          console.log(res);
        },
        (err)=>{
          console.log(err);
        })

      })
    }

  }

  onFavorite(){
    let userId = this.authService.getUserDetails()._id;
    let imageId = this.image._id;
    let title = this.image.title;
    let description = this.image.description;
    let url = this.image.url;
    
    if(this.isFavorite == false){
      this.imagesService.addFavorite(userId, imageId, title, description, url).subscribe((res: any)=>{
        this.isFavorite = true;
      })
    } else{
      this.imagesService.deleteFavorite(userId, imageId).subscribe((res:any)=>{
        this.isFavorite = false;
      })
    }
  }


  onXButtonClick() {
    this.deleteEvent.emit();
  }

  onGoToDetails(){
    this.imagesService.setSelectedImage(this.image);
    this.imagesService.setSelectedImageLikes(this.likes);
    this.router.navigateByUrl('/home/details');
  }

}
