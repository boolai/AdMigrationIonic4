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
  { path: 'galleryModal', loadChildren: './pages/gallery-modal/gallery-modal.module#GalleryModalPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}