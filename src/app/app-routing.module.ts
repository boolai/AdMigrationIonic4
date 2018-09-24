import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { SubscriptionGuard } from './guards/subscription.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  { path: 'categoriesModal', loadChildren: './pages/categories-modal/categories-modal.module#CategoriesModalPageModule' },
  { path: 'ad/:id', loadChildren: './pages/ad/ad.module#AdPageModule' },
  { path: 'map', loadChildren: './pages/map/map.module#MapPageModule' },
  { path: 'galleryModal', loadChildren: './pages/gallery-modal/gallery-modal.module#GalleryModalPageModule' },
  { path: 'chatClient/:id', loadChildren: './pages/chat-client/chat-client.module#ChatClientPageModule', canActivate: [AuthGuard] },
  { path: 'authorization', loadChildren: './pages/authorization/authorization.module#AuthorizationPageModule' },
  { path: 'authorization/:returnPath/:data', loadChildren: './pages/authorization/authorization.module#AuthorizationPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuard] },
  { path: 'logout', loadChildren: './pages/logout/logout.module#LogoutPageModule', canActivate: [AuthGuard] },
  { path: 'adsList', loadChildren: './pages/ads-list/ads-list.module#AdsListPageModule', canActivate: [SubscriptionGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
