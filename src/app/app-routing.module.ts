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
  { path: 'adsList', loadChildren: './pages/ads-list/ads-list.module#AdsListPageModule', canActivate: [SubscriptionGuard] },
  { path: 'chatList', loadChildren: './pages/chat-list/chat-list.module#ChatListPageModule', canActivate: [SubscriptionGuard] },
  { path: 'chatHost', loadChildren: './pages/chat-host/chat-host.module#ChatHostPageModule', canActivate: [SubscriptionGuard] },
  { path: 'chatRoomsList', loadChildren: './pages/chat-rooms-list/chat-rooms-list.module#ChatRoomsListPageModule' },
  { path: 'chatRoom/:cat', loadChildren: './pages/chat-room/chat-room.module#ChatRoomPageModule', canActivate: [AuthGuard] },
  { path: 'latest', loadChildren: './pages/latest/latest.module#LatestPageModule' },
  { path: 'news', loadChildren: './pages/news/news.module#NewsPageModule' },
  { path: 'suggestions', loadChildren: './pages/suggestions/suggestions.module#SuggestionsPageModule' },
  { path: 'legal', loadChildren: './pages/legal/legal.module#LegalPageModule' },
  { path: 'postAd', loadChildren: './pages/post-ad/post-ad.module#PostAdPageModule', canActivate: [SubscriptionGuard] },
  { path: 'editAd', loadChildren: './pages/edit-ad/edit-ad.module#EditAdPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
