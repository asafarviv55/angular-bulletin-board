import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { IndexComponent } from './index/index.component';
import { FavoritesService } from './favorites.service';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule
  ],
  providers: [FavoritesService]
})
export class FavoritesModule { }
