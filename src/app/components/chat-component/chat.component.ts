// chat.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { expandCollapse } from './expandCollapse';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  animations: [ expandCollapse ],
  imports: [
      CommonModule,
      FormsModule
    ],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: Array<{ action: string, input_text: string, text: string, time: Date }> = [];
  newMsg = '';
  currentUser = 'me';
  isOpen = false;
  requestSent = false;
  sub: Subscription = new Subscription();

  constructor(private ws: WebSocketService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit() {
    this.sub = this.ws.messages$().subscribe(msg => {
      if(msg && (msg.input_text || msg.text)) {
        this.requestSent = false;
      this.messages.push(msg);
      setTimeout(() => {
        const el = document.querySelector('.messages-container');
        el?.scrollTo(0, el.scrollHeight);
      }, 0);
    }
    });
  
  }

  send() {
    if (!this.newMsg) return;
    const action  = this.newMsg.toLowerCase() == 'yes' ? 'executeTask' : 'createTask';
    const msg = { action, input_text: this.newMsg, text: this.newMsg, time: new Date() };
    this.messages.push(msg);
    this.ws.sendMessage(msg);
    this.requestSent = true;
    this.newMsg = '';
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.ws.close();
  }
}
