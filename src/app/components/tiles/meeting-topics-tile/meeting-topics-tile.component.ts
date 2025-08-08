import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartTileComponent, SmartTileConfig } from '../../smart-tile/smart-tile.component';
import { EmailPreviewComponent } from '../../Preview-component/email-preview.component';
import { DataService } from 'src/app/services/data-service';
import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface MeetingTopic {
  priority: string;
  topic: string;
  duration: string;
  type: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-meeting-topics-tile',
  standalone: true,
  imports: [CommonModule, SmartTileComponent],
  template: `
    <app-smart-tile [config]="tileConfig">
      <div class="space-y-3">
        <!-- Quick Actions -->
        <div class="flex space-x-2">
          <button class="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
            <svg class="h-3 w-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            Copy Agenda
          </button>
          <button class="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
            <svg class="h-3 w-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Export
          </button>
        </div>

        <!-- Meeting Topics -->
        <div class="space-y-2">
          <div *ngFor="let topic of meetingTopics; let i = index" class="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
            <div class="flex items-start justify-between mb-2">
              <div class="flex items-center space-x-2">
                <div class="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  {{ i + 1 }}
                </div>
                <h4 class="font-medium text-sm">{{ topic.task_title }}</h4>
              </div>
              <div class="flex items-center space-x-2">
                <span [class]="'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 ' + getStatusColor(topic.status)">
                  <ng-container [ngSwitch]="topic.status">
                    <svg *ngSwitchCase="'urgent'" class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    <svg *ngSwitchCase="'primary'" class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <svg *ngSwitchDefault class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </ng-container>
                  
                </span>
              </div>
            </div>
            <p class="text-xs text-muted-foreground mb-2 ml-7">{{ topic.task_description }}</p>
            
          </div>
        </div>

        <!-- Meeting Summary -->
        <div class="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
          <div class="flex items-center justify-between">
            <div class="text-sm font-medium">Call Preparation Complete</div>
            <span class="inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">Ready</span>
          </div>
          <div class="text-xs text-muted-foreground mt-1">
            All critical talking points identified and prioritized
          </div>
        </div>
      </div>
    </app-smart-tile>
  `,
  styles: []
})
export class MeetingTopicsTileComponent {

   meetingTopics: any = [
    
  ];

  @ViewChild('preview') preview!: EmailPreviewComponent;
    constructor(private dataService: DataService) { }
  
    ngOnInit() {
  
       timer(0, 40000).pipe(
        switchMap(() => this.dataService.getTaskDataForAClient("CL-000003"))
      ).subscribe({
        next: res => this.meetingTopics = res,
        error: err => console.error('API error:', err)
      });
  
    }
 

  

  

  get tileConfig(): SmartTileConfig {
    return {
      title: 'AI Meeting Agenda',
      subtitle: `${this.meetingTopics.length} topics • 45 min estimated`,
      aiSummary: 'AI-generated agenda prioritizes immediate action items (college planning, tax harvesting) followed by strategic discussions. Estimated 45-minute call optimized for client\'s conservative profile and current life stage.',
      urgencyLevel: 'high',
      icon: `<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>`
    };
  }

  getStatusColor(status: string): string {
    const colors = {
      urgent: 'bg-red-50 text-red-700',
      primary: 'bg-blue-50 text-blue-700',
      opportunity: 'bg-green-50 text-green-700'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-50 text-gray-700';
  }
}