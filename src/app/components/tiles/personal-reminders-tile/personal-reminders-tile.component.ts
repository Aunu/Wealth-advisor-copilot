import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartTileComponent, SmartTileConfig } from '../../smart-tile/smart-tile.component';

interface ReminderItem {
  type: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  iconType: string;
}

@Component({
  selector: 'app-personal-reminders-tile',
  standalone: true,
  imports: [CommonModule, SmartTileComponent],
  template: `
    <app-smart-tile [config]="tileConfig">
      <div class="space-y-3">
        <div *ngFor="let reminder of reminders" class="p-3 rounded-lg border bg-card">
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center space-x-2">
              <ng-container [ngSwitch]="reminder.iconType">
                <svg *ngSwitchCase="'heart'" class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <svg *ngSwitchCase="'calendar'" class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <svg *ngSwitchCase="'gift'" class="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                </svg>
              </ng-container>
              <h4 class="font-medium text-sm">{{ reminder.title }}</h4>
            </div>
            <span [class]="'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 ' + getPriorityBadgeColor(reminder.priority)">
              {{ reminder.priority }}
            </span>
          </div>
          <p class="text-xs text-muted-foreground mb-2">{{ reminder.description }}</p>
          <div class="flex items-center justify-between">
            <span class="inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10">
              {{ reminder.type }}
            </span>
            <div class="flex items-center space-x-1 text-xs text-muted-foreground">
              <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ reminder.dueDate }}</span>
            </div>
          </div>
        </div>
      </div>
    </app-smart-tile>
  `,
  styles: []
})
export class PersonalRemindersTileComponent {
  tileConfig: SmartTileConfig = {
    title: 'Personal Reminders',
    subtitle: 'Client-specific notes & priorities',
    aiSummary: 'Lead with college planning discussion - this is top of mind for Sarah. Address retirement timeline changes and provide holiday market reassurance as secondary topics.',
    urgencyLevel: 'high',
    icon: `<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
    </svg>`
  };

  reminders: ReminderItem[] = [
    {
      type: 'Personal',
      title: 'Daughter\'s College Fund',
      description: 'Sarah mentioned wanting to start saving for Emma\'s education (age 14)',
      priority: 'High',
      dueDate: 'Next call',
      iconType: 'heart'
    },
    {
      type: 'Lifecycle',
      title: 'Retirement Timeline Review',
      description: 'Client considering early retirement at 62 instead of 65',
      priority: 'High',
      dueDate: 'Q1 2025',
      iconType: 'calendar'
    },
    {
      type: 'Personal',
      title: 'Holiday Market Concerns',
      description: 'Historically anxious about market volatility during holidays',
      priority: 'Medium',
      dueDate: 'Ongoing',
      iconType: 'gift'
    }
  ];

  getPriorityBadgeColor(priority: string): string {
    return priority === 'High' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-700';
  }
}