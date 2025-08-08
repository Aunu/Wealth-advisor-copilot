import { Component, inject, ViewChild  } from '@angular/core';
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
  imports: [CommonModule, LucideAngularModule,EmailPreviewComponent],
  template: `
    <div class="space-y-4" style = 'margin-top: 20px'>
      <div class="flex items-center justify-between">
        <h2>Quick action task</h2>
        <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
          Updated 2 min ago
        </span>
      </div>
      
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div 
          *ngFor="let item of summaryData" 
          class="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <h3 class="tracking-tight text-sm font-medium">{{item.task_title}}</h3>
            <div class="flex items-center space-x-2">
            <div class="group relative">
    <svg (click)="onMeetingClick(item)"
         xmlns="http://www.w3.org/2000/svg"
         class="w-6 h-6 text-green-600 hover:text-green-800 cursor-pointer"
         fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <!-- Replace with the actual meeting icon path -->
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 20h5V4H2v16h5m5-3h4m-6-3h6m-6-3h6" />
    </svg>
    <span class="absolute left-1/2 bottom-full mb-2 hidden transform -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
      Schedule Meeting
    </span>
  </div>

  <!-- Email Icon -->
  <div class="group relative">
    <svg *ngIf="!item.emailLoading" (click)="onEmailClick(item)"
         xmlns="http://www.w3.org/2000/svg"
         class="w-6 h-6 text-amber-500 hover:text-amber-700 cursor-pointer"
         fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18V8H3v8z" />
    </svg>
    <svg *ngIf="item.emailLoading"
       class="w-6 h-6 text-amber-500 animate-spin"
       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10"
            stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
  </svg>
    <span class="absolute left-1/2 bottom-full mb-2 hidden transform -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
      Send Email
    </span>
  </div>
            </div>
          </div>
          <div class="p-6 pt-0">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium">{{item.task_id}}</div>
                <p class="text-xs text-muted-foreground">
                  {{item.task_description}}
                </p>
              </div>
              <span 
                class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                [ngClass]="{
                  'border-transparent bg-primary text-primary-foreground hover:bg-primary/80': item.priority === 'positive',
                  'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80': item.priority === 'negative',
                  'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80': item.priority === 'neutral'
                }"
              >
               
                {{item.priority}}
              </span>
            </div>
          </div>
        </div>
      </div>
      <email-preview #preview></email-preview>
    </div>
    
  `
})
export class SummaryCardsComponent {
  TrendingUpIcon = TrendingUp;
  summaryData : any = [];
  emailRequestSent = false;

   private toast = inject(TauiToastService);
  @ViewChild('preview') preview!: EmailPreviewComponent;
  constructor(private dataService: DataService) { }

  ngOnInit() {

     timer(0, 40000).pipe(
      switchMap(() => this.dataService.getTaskData())
    ).subscribe({
      next: res => {this.summaryData = res; this.summaryData.forEach((item:any) => {
        item.emailLoading = false;
      })},
      error: err => console.error('API error:', err)
    });

  }
  onMeetingClick(item:any) {
    this.toast.showToast({
      type: 'success',                  // 'info' | 'success' | 'warning' | 'error'
      message: 'Meeting setup launched!',
      duration: 3000                    // Optional, defaults to 5000 ms
    });
    item.status = 'completed';
    this.summaryData = this.summaryData.filter((task:any) => task.status === 'pending');
  }
  onEmailClick(item:any) {
    // Call the data service to generate the email content
    console.log('Generating email for item:', item);
    if(item && !this.emailRequestSent ) {
        item.emailLoading = true; // Show loading state
        this.emailRequestSent = true; // Prevent multiple requests
         item.intent = 'email';
        this.dataService.generateEmailOfTask(item).subscribe(
        data => {
          this.emailRequestSent = false; 
          const response = JSON.parse(data.agent_response);
          this.preview.open(response.emails[0].subject, response.emails[0].body);
          item.status = 'completed';
          this.summaryData = this.summaryData.filter((task:any) => task.status === 'pending');
        },
      error => console.error('Error loading data', error)
    );
  }
}

}