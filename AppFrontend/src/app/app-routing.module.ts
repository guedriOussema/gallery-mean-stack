import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AddMultipleImagesComponent } from './pages/add-multiple-images/add-multiple-images.component';
import { AddPhotoComponent } from './pages/add-photo/add-photo.component';
import { LoginPageComponent } from './pages/auth-pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/auth-pages/signup-page/signup-page.component';
import { FavoritesListComponent } from './pages/favorites-list/favorites-list.component';
import { MainLayoutAuthenticationComponent } from './pages/main-layout-authentication/main-layout-authentication.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { PhotoDetailsComponent } from './pages/photo-details/photo-details.component';
import { PhotosListComponent } from './pages/photos-list/photos-list.component';

const routes: Routes = [
  {path: '', redirectTo:'auth/login', pathMatch: 'full'},

  {path:'auth', component:MainLayoutAuthenticationComponent,children:[
    {path:'login', component: LoginPageComponent},
    {path:'signup', component: SignupPageComponent}
  ]},

  {path: 'home', component: MainLayoutComponent, canActivate: [AuthGuard], children:[
    {path:'', redirectTo:'recents', pathMatch: 'full'},
    {path:'recents', component: PhotosListComponent},
    {path:'popular', component: PhotosListComponent},
    {path:'new', component: AddPhotoComponent},
    {path:'details', component: PhotoDetailsComponent},
    {path:'favorites', component: FavoritesListComponent},
    {path:'add-multiple-photos', component: AddMultipleImagesComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
