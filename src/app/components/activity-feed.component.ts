// Angular ActivityFeed Component Reference
// This cannot run in the current React environment

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Activity {
  id: string;
  advisor: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  client?: string;
  amount?: string;
  timestamp: string;
  type: 'call' | 'meeting' | 'sale' | 'contact';
}

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-card text-card-foreground rounded-lg border shadow-sm h-full">
      <div class="flex flex-col space-y-1.5 p-6">
        <h3>Recent Activity</h3>
      </div>
      <div class="p-6 pt-0 space-y-4">
        <div *ngFor="let activity of mockActivities" class="flex items-start space-x-3">
          <div class="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
            <span class="flex h-full w-full items-center justify-center rounded-full bg-muted text-xs">
              {{ activity.advisor.initials }}
            </span>
          </div>
          <div class="flex-1 space-y-1">
            <div class="flex items-center gap-2">
              <p class="text-sm font-medium">{{ activity.advisor.name }}</p>
              <span 
                class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                [ngClass]="getActivityColor(activity.type)"
              >
                <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <!-- Call Icon -->
                  <path *ngIf="activity.type === 'call'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  <!-- Meeting Icon -->
                  <path *ngIf="activity.type === 'meeting'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h8a2 2 0 012 2v4m0 0a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11h14"></path>
                  <!-- Sale Icon -->
                  <path *ngIf="activity.type === 'sale'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  <!-- Contact Icon -->
                  <path *ngIf="activity.type === 'contact'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                {{ activity.type }}
              </span>
            </div>
            <p class="text-sm text-muted-foreground">
              {{ activity.action }}
              <span *ngIf="activity.client" class="font-medium text-foreground"> with {{ activity.client }}</span>
            </p>
            <div class="flex items-center justify-between">
              <p class="text-xs text-muted-foreground">{{ activity.timestamp }}</p>
              <span 
                *ngIf="activity.amount" 
                class="inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium text-green-600 border-green-200"
              >
                {{ activity.amount }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: []
})
export class ActivityFeedComponent {
  mockActivities: Activity[] = [
    {
      id: '1',
      advisor: { name: 'Sarah Johnson', initials: 'SJ' },
      action: 'Closed new client deal',
      client: 'Tech Solutions Inc',
      amount: '$45,000',
      timestamp: '2 hours ago',
      type: 'sale'
    },
    {
      id: '2',
      advisor: { name: 'Michael Chen', initials: 'MC' },
      action: 'Completed client call',
      client: 'Global Ventures LLC',
      timestamp: '3 hours ago',
      type: 'call'
    },
    {
      id: '3',
      advisor: { name: 'Emily Rodriguez', initials: 'ER' },
      action: 'Scheduled follow-up meeting',
      client: 'Innovation Partners',
      timestamp: '5 hours ago',
      type: 'meeting'
    },
    {
      id: '4',
      advisor: { name: 'David Kim', initials: 'DK' },
      action: 'Added new prospect',
      client: 'StartUp Hub',
      timestamp: '6 hours ago',
      type: 'contact'
    },
    {
      id: '5',
      advisor: { name: 'Lisa Thompson', initials: 'LT' },
      action: 'Client portfolio review',
      client: 'Wealth Management Co',
      timestamp: '8 hours ago',
      type: 'meeting'
    }
  ];

  getActivityColor(type: string): string {
    switch (type) {
      case 'call':
        return 'bg-blue-100 text-blue-800';
      case 'meeting':
        return 'bg-purple-100 text-purple-800';
      case 'sale':
        return 'bg-green-100 text-green-800';
      case 'contact':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}