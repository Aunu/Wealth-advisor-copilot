import { Component, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './../navbar/navbar.component';
import { HeroPanelComponent } from './../hero-panel/hero-panel.component';
import { SummaryCardsComponent } from './../summary-cards/summary-cards.component';
import { EntriesTableComponent } from './../entries-table/entries-table.component';
import { ChatComponent } from './../chat-component/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { EmailPreviewComponent } from './../Preview-component/email-preview.component';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dashboard-component',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    SummaryCardsComponent,
    HeroPanelComponent,
    EntriesTableComponent,
    ChatComponent,
    HttpClientModule,
    EmailPreviewComponent
  ],
  template: `
    <div class="min-h-screen bg-background">
      <app-navbar></app-navbar>
      
      <main class="w-100 px-6 py-8 space-y-8">
        <app-hero-panel ></app-hero-panel>
        <app-summary-cards mt-4></app-summary-cards>
        <app-entries-table mt-4></app-entries-table>
      </main>
    </div>
    <app-chat class="fixed bottom-0 right-0 m-6 w-80 bg-white shadow-lg rounded-lg"></app-chat>
    <email-preview #preview></email-preview>
  `,
  styles: []
})
export class DashboardComponent {
 @ViewChild('preview') preview!: EmailPreviewComponent;
  title = 'angular-dashboard';
  sub: Subscription = new Subscription();

  constructor(private ws: WebSocketService) {}

  ngOnInit() {
    this.sub = this.ws.messages$().subscribe(msg => {
      if(msg && (msg.agent_response && msg.task_data?.intent == 'email')) {
        const response = JSON.parse(msg.agent_response);
        this.preview.open(response.subject, response.body);
    }
    });
  
  }
}