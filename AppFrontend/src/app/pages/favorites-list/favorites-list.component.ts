import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Favorite } from 'src/app/models/favorite.model';
import { Image } from 'src/app/models/image.model';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';


@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      
      transition('void => *', [
        
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
        
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*',
        })),
        animate(68)
      ]),
  
      transition('* => void', [
       
        animate(50, style({
          transform: 'scale(1.05)'
        })),
       
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        animate('120ms ease-out', style({
          opacity: 0,
          transform: 'scale(0.68)', 
        })),
        
        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom:0,
          paddingRight: 0,
          paddingLeft:0,
          'margin-bottom': '0',
        }))
      ])
    ]),
  
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0,
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  
  ]
})

export class FavoritesListComponent implements OnInit {

 
  images: Array<Favorite> = [];
  favorite = true;

  constructor(private imagesService: ImagesService, private authService: AuthService,private router: Router) {}

  ngOnInit(): void {

    let userId = this.authService.getUserDetails()._id;
   

    this.imagesService.getFavoriteImages(userId).subscribe((response: any) => {

      this.images = response;

      this.images.reverse();
      if(this.images.length > 50){
        this.images.length = 50;
      }

    })



    
  }


  deleteImage(image: Favorite){
    let index = this.images.indexOf(image);
    this.imagesService.deleteImage(image).subscribe((response: any) => {
      console.log(response);
      this.images.splice(index,1);
    });
  }


}
