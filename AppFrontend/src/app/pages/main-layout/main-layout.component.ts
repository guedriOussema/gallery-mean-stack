import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private imagesService: ImagesService) { }

  ngOnInit(): void {
  }

  onNavigateToHome(){
    this.imagesService.setFavorite(false);
    this.imagesService.setPopularOption(false);
    this.router.navigateByUrl('home/recents');
  }

  logout(){
    this.authService.logout();
  }

  onAddImage(){
    this.imagesService.setFavorite(false);
    this.router.navigateByUrl('home/new');
  }

  onGetPopular(){
    this.imagesService.setFavorite(false);
    this.imagesService.setPopularOption(true);
    this.router.navigateByUrl('home/popular');
  }

  onGetFavorites(){
    this.imagesService.setFavorite(true);
    this.router.navigateByUrl('home/favorites');
  }

}
