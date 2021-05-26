import { Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Favorite } from 'src/app/models/favorite.model';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';


@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent implements OnInit {

  
  isLike: any;
  isFavorite: any;
  canDelete: any = false;
  likes: any = [];

  favorite: boolean = false;

  @Input() image: Favorite = new Favorite();
  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();
  numberLikes: any;


  constructor(private imagesService:ImagesService, private authService: AuthService, private router: Router) {
    let userId = this.authService.getUserDetails()._id;

   
   }

  ngOnInit(): void {

   this.favorite = this.imagesService.getFavorite();
   
   let userId = this.authService.getUserDetails()._id;
   let imageId = this.image._imageId;

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
    })
  

  }

 

  onFavorite(){
    let userId = this.authService.getUserDetails()._id;
    let imageId = this.image._imageId;
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
