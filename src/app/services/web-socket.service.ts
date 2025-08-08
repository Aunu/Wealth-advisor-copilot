// web-socket.service.ts
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    // use your WebSocket server endpoint here
    this.socket$ = webSocket('wss://5x3d57xgtl.execute-api.us-east-1.amazonaws.com/production/');
  }

  public sendMessage(msg: any): void {
    this.socket$.next(msg);
  }

  public messages$(): Observable<any> {
    return this.socket$.asObservable();
  }

  public close(): void {
    this.socket$.complete();
  }
 
}
