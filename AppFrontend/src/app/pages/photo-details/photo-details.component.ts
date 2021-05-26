import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from 'src/app/models/image.model';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss'],
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
export class PhotoDetailsComponent implements OnInit {

  image: Image = new Image();
  likes: any = [];
  usersLikes: any = [];
  favorite: boolean = false;
  constructor(private imageService: ImagesService) { }

  ngOnInit(): void {
    this.image = this.imageService.getSelectedImage();
    this.likes = this.imageService.getSelectedImageLikes();
    this.favorite = this.favorite = true;
    
  }

}
