import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { LoginPageComponent } from './pages/auth-pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/auth-pages/signup-page/signup-page.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MainLayoutAuthenticationComponent } from './pages/main-layout-authentication/main-layout-authentication.component';
import { HttpClientModule } from '@angular/common/http';
import { PhotosListComponent } from './pages/photos-list/photos-list.component';
import { AddPhotoComponent } from './pages/add-photo/add-photo.component';
import { PhotoCardComponent } from './photo-card/photo-card.component';
import { PhotoDetailsComponent } from './pages/photo-details/photo-details.component';
import { FavoritesListComponent } from './pages/favorites-list/favorites-list.component';
import { FavoriteCardComponent } from './pages/favorite-card/favorite-card.component';
import { AddMultipleImagesComponent } from './pages/add-multiple-images/add-multiple-images.component';
import { AngularMaterialModule } from './angular-material.module';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginPageComponent,
    SignupPageComponent,
    UserDetailsComponent,
    MainLayoutAuthenticationComponent,
    PhotosListComponent,
    AddPhotoComponent,
    PhotoCardComponent,
    PhotoDetailsComponent,
    FavoritesListComponent,
    FavoriteCardComponent,
    AddMultipleImagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    MatDialogModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
