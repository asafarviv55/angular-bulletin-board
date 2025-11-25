import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagingRoutingModule } from './messaging-routing.module';
import { InboxComponent } from './inbox/inbox.component';
import { MessagingService } from './messaging.service';

@NgModule({
  declarations: [
    InboxComponent
  ],
  imports: [
    CommonModule,
    MessagingRoutingModule
  ],
  providers: [MessagingService]
})
export class MessagingModule { }
