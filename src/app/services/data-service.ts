import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private dashboardApiUrl = 'https://zpcn3yf2xw5asmqmhxdc3v7kym0pqrsk.lambda-url.us-east-1.on.aws/';

  private taskApiUrl = 'https://yl46a6gqaa.execute-api.us-east-1.amazonaws.com/prod/tasks?advisor_id=ADV-00001';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    return this.http.get<any>(this.dashboardApiUrl);
  }
  getTaskData(): Observable<any> {
    return this.http.get<any>(this.taskApiUrl);
  }
  generateEmailOfTask(item: any): Observable<any> {
    item.intent = 'email';
    
    return this.http.post<any>(`https://iowvl5horzg7s7zskhxojt7yte0klxko.lambda-url.us-east-1.on.aws/`, item);
  }
  getKYCFollowUpData(): Observable<any> {
    const item = {
      "task_id": "",
      "advisor_id": "",
      "client_id": "",
      "task_category": "KYC",
      "task_title": "",
      "task_description": "",
      "meeting_type": null,
      "tags": ["kyc", "update"],
      "notes": "",
      "intent": "service"
    }
    return this.http.post<any>('https://iowvl5horzg7s7zskhxojt7yte0klxko.lambda-url.us-east-1.on.aws/', item);
  }
}