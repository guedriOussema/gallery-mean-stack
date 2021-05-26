import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Image } from 'src/app/models/image.model';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss'],
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
export class PhotosListComponent implements OnInit {

  images: Image[] = [];
  numberLikesArray: any[] = [];
  isPopular: boolean;

  constructor(private imagesService: ImagesService, private router: Router) {}

  ngOnInit(): void {
   
    this.isPopular = this.imagesService.getPopularOption();
    console.log(this.isPopular);

    this.imagesService.getImages().subscribe((response: any) => {

      for(let r of response){
        let img:Image = new Image();
        img.title = r.title;
        img.description = r.description;
        img.url = r.url;
        img.userId = r.userId;
        img._id = r._id;
        img.numberOfLikes = r.numberOfLikes;
        this.images.push(img);
      }

      this.images.reverse();
      if(this.images.length > 50){
        this.images.length = 50;
      }


  

      if(this.isPopular){
        this.images.sort(function(a, b) {
          return b.numberOfLikes - a.numberOfLikes;
        });
      }

    })

    
  }


  deleteImage(image: Image){
    let index = this.images.indexOf(image);
    this.imagesService.deleteImage(image).subscribe((response: any) => {
      console.log(response);
      this.images.splice(index,1);
    });
  }

 

  

}
