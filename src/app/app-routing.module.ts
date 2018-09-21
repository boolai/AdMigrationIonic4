import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
  { path: 'chatClient/:id', loadChildren: './pages/chat-client/chat-client.module#ChatClientPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}