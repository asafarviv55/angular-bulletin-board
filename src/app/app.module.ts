import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdsComponent } from './ads/ads.component';
import { CategoryModule } from './category/category.module';
import { ProfileModule } from './profile/profile.module';
import { MessagingModule } from './messaging/messaging.module';
import { FavoritesModule } from './favorites/favorites.module';
import { SearchModule } from './search/search.module';

@NgModule({
  declarations: [
    AppComponent,
    AdsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CategoryModule,
    ProfileModule,
    MessagingModule,
    FavoritesModule,
    SearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
