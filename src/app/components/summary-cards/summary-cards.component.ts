import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TauiToastService } from '@ngx-tailwind-ui/toast';
import { switchMap } from 'rxjs/operators';
import { timer, Subscription } from 'rxjs';
import {
  LucideAngularModule,
  TrendingUp
} from 'lucide-angular';
import { DataService } from 'src/app/services/data-service';
import { EmailPreviewComponent } from '../Preview-component/email-preview.component';
import { MeetingSchedulerComponent } from '../meeting-component/meeting-preview.component';

interface SummaryItem {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  description: string;
  icon: any;
}

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  templateUrl: './summary-cards.component.html',
  imports: [CommonModule, LucideAngularModule, EmailPreviewComponent, MeetingSchedulerComponent]
})
export class SummaryCardsComponent {
  TrendingUpIcon = TrendingUp;
  summaryData: any = [];
  emailRequestSent = false;

  private toast = inject(TauiToastService);
  @ViewChild('preview') preview!: EmailPreviewComponent;
  @ViewChild('meetingPreview') meetingPreview!: MeetingSchedulerComponent;
  constructor(private dataService: DataService) { }

  ngOnInit() {

    timer(0, 20000000).pipe(
      switchMap(() => this.dataService.getTaskData())
    ).subscribe({
      next: res => {
        this.summaryData = res; this.summaryData.forEach((item: any) => {
          item.emailLoading = false;
        })
      },
      error: err => console.error('API error:', err)
    });

  }
  onMeetingClick(item: any) {
    this.dataService.generateMeetingOfTask(item).subscribe(data => {
      const response = JSON.parse(data.agent_response);
      console.log(response);
      item.status = 'completed';
      this.summaryData = this.summaryData.filter((task: any) => task.status === 'pending');
    })
    // this.toast.showToast({
    //   type: 'success',                  // 'info' | 'success' | 'warning' | 'error'
    //   message: 'Meeting setup launched!',
    //   duration: 3000                    // Optional, defaults to 5000 ms
    // });
    // item.status = 'completed';
    // this.summaryData = this.summaryData.filter((task:any) => task.status === 'pending');
  }
  onEmailClick(item: any) {
    // Call the data service to generate the email content
    console.log('Generating email for item:', item);
    if (item && !this.emailRequestSent) {
      item.emailLoading = true; // Show loading state
      this.emailRequestSent = true; // Prevent multiple requests
      this.dataService.generateEmailOfTask(item).subscribe(
        data => {
          this.emailRequestSent = false;
          const response = JSON.parse(data.agent_response);
          this.preview.open(response.emails[0].subject, response.emails[0].body);
          item.status = 'completed';
          this.summaryData = this.summaryData.filter((task: any) => task.status === 'pending');
        },
        error => console.error('Error loading data', error)
      );
    }
  }

  takeAction(item: any) {
    item.loading = true;
    this.dataService.generateAction(item).subscribe(data => {
      let res = data.agent_response;
      try {
        const response = JSON.parse(data.agent_response);
        console.log(response);
        if (response.emails) {
          this.preview.open(response.emails[0].subject, response.emails[0].body);
        } else if (response.meetings) {
          this.meetingPreview.open(response.meetings[0].date, response.meetings[0].time, response.meetings[0].location, response.meetings[0].meetingTopic);
        } else {
          const response = data.agent_response;
          const subjectMatch = response.match(/"subject"\s*:\s*"([^"]*)"/s);
          const bodyMatch = response.match(/"body"\s*:\s*"([\s\S]*?)"\s*,\n\s*"origin"/);
          const timeMatch = response.match(/"time"\s*:\s*"([^"]*)"/s);
          const dateMatch = response.match(/"date"\s*:\s*"([^"]*)"/s);
          const meetingDate = dateMatch ? dateMatch[1] : null;

          // Extract time

          const meetingTime = timeMatch ? timeMatch[1] : null;

          if (subjectMatch && bodyMatch) {
            const subject = subjectMatch ? subjectMatch[1] : null;
            const body = bodyMatch ? bodyMatch[1] : null;
            this.preview.open(subject, body);
          } else if (meetingDate && meetingTime) {
            this.meetingPreview.open(meetingDate, meetingTime, 'Zoom', 'Meeting');
          }
        }
      } catch (err) {
        const response = data.agent_response;
        const subjectMatch = response.match(/"subject"\s*:\s*"([^"]*)"/s);
        const bodyMatch = response.match(/"body"\s*:\s*"([\s\S]*?)"\s*,\n\s*"origin"/);
        const timeMatch = response.match(/"time"\s*:\s*"([^"]*)"/s);
        const dateMatch = response.match(/"date"\s*:\s*"([^"]*)"/s);
        const meetingDate = dateMatch ? dateMatch[1] : null;

        // Extract time

        const meetingTime = timeMatch ? timeMatch[1] : null;

        if (subjectMatch && bodyMatch) {
          const subject = subjectMatch ? subjectMatch[1] : null;
          const body = bodyMatch ? bodyMatch[1] : null;
          this.preview.open(subject, body);
        } else if (meetingDate && meetingTime) {
          this.meetingPreview.open(meetingDate, meetingTime, 'Zoom', 'Meeting');
        }
      }
      item.status = 'completed';
      this.summaryData = this.summaryData.filter((task: any) => task.task_id !== item.task_id);
    })
  }

}