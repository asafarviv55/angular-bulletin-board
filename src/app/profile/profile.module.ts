import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ViewComponent } from './view/view.component';
import { ProfileService } from './profile.service';

@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  providers: [ProfileService]
})
export class ProfileModule { }
