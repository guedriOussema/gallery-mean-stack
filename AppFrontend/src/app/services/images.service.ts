import { Injectable } from '@angular/core';
import { Favorite } from '../models/favorite.model';
import { Like } from '../models/like.model';
import { Image } from '../models/image.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  

  selectedImage: any;
  selectedDescription: any;
  selectedImageLikes: any = [];
  isPopular: boolean = false;
  favorite: boolean = false;


  constructor(private webReqService: WebRequestService) { }

  addSelectedDescription(description){
    this.selectedDescription = description;
  }

  patchImage(id:string, numberLikes: any){
    let obj = {numberOfLikes: numberLikes}
    return this.webReqService.patch('images/' + id , obj);
  }

  getSelectedDescription(){
    return this.selectedDescription;
  }

  getFavorite(){
    return this.favorite;
  }

  setFavorite(f: boolean){
    this.favorite = f;
  }

  addImage(image: Image){
    return this.webReqService.post('images', image);
  }

  getImages(){
    return this.webReqService.get('images');
  }

  getFavoriteImages(userId: string){
    return this.webReqService.get('favorites/'+userId);
  }

  deleteImage(image){
    return this.webReqService.delete(`images/${image._id}`);
  }

  getImageById(id: string){
    return this.webReqService.getElementById(`images/${id}`);
  }

  addFavorite(userId: string, imageId:string, title:string, desciption: string, url: string){
    let favorite: Favorite = new Favorite();
    favorite.title = title;
    favorite.description = desciption;
    favorite.url = url;
    favorite._imageId = imageId;
    favorite.userId = userId;
    return this.webReqService.post(`favorites/${userId}/${imageId}`, favorite);
  }

  getFavorites(userId: string, imageId: string){
    return this.webReqService.get(`favorites/${userId}/${imageId}`);
  }

  deleteFavorite(userId: string, imageId: string){
    return this.webReqService.delete(`favorites/${userId}/${imageId}`);
  }

  addLike(userId: string, username: string,imageId:string){
    let like: Like = new Like();
    like.imageId = imageId;
    like.userId = userId;
    like.username = username;
    return this.webReqService.post(`likes/${userId}/${imageId}`, like);
  }

  getLikes(userId: string, imageId: string){
    return this.webReqService.get(`likes/${userId}/${imageId}`);
  }

  getLikesOfImage(imageId: string){
    return this.webReqService.get(`likes/${imageId}`);
  }

  deleteLike(userId: string, imageId: string){
    return this.webReqService.delete(`likes/${userId}/${imageId}`);
  }


  setSelectedImage(image){
    this.selectedImage = image;
  }

  getSelectedImage(){
    return this.selectedImage;
  }

  getSelectedImageLikes(): any {
    return this.selectedImageLikes
  }
  setSelectedImageLikes(likes: any) {
    this.selectedImageLikes = likes;
  }
  

  setPopularOption(popularOption: boolean){
    this.isPopular = popularOption;
  }

  getPopularOption(){
    return this.isPopular;
  }


}