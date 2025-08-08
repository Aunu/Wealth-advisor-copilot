import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SmartTileConfig {
  title: string;
  subtitle?: string;
  aiSummary: string;
  hasNewContent?: boolean;
  urgencyLevel?: 'low' | 'medium' | 'high';
  icon?: string;
}

@Component({
  selector: 'app-smart-tile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer group rounded-lg border bg-card text-card-foreground shadow-sm">
      <!-- New Content Ribbon -->
      <div *ngIf="config.hasNewContent" class="absolute top-0 right-0 z-10">
        <div class="bg-gradient-to-l from-green-500 to-emerald-600 text-white px-3 py-1 text-xs font-medium transform rotate-12 translate-x-3 -translate-y-1 shadow-lg">
          NEW
        </div>
      </div>

      <!-- Urgency Indicator -->
      <div *ngIf="config.urgencyLevel !== 'low'" class="absolute top-3 left-3 z-10">
        <div [class]="'w-3 h-3 rounded-full animate-pulse ' + getUrgencyColor()"></div>
      </div>

      <div class="flex flex-col space-y-1.5 p-6 pb-3">
        <div class="flex items-start justify-between">
          <div class="flex items-center space-x-2">
            <div *ngIf="config.icon" class="text-primary" [innerHTML]="config.icon"></div>
            <div>
              <h3 class="text-lg flex items-center space-x-2">
                <span>{{ config.title }}</span>
                <span *ngIf="config.urgencyLevel !== 'low'" 
                      [class]="'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 ' + getUrgencyBadgeColor()">
                  {{ getUrgencyLabel() }}
                </span>
              </h3>
              <p *ngIf="config.subtitle" class="text-sm text-muted-foreground mt-1">{{ config.subtitle }}</p>
            </div>
          </div>
          <button *ngIf="onNavigate" 
                  (click)="onNavigate.emit()"
                  class="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="p-6 pt-0 space-y-4">
        <!-- Main Content -->
        <div [class]="showSummary ? 'opacity-50' : 'opacity-100'">
          <ng-content></ng-content>
        </div>

        <!-- AI Summary Toggle -->
        <div class="border-t pt-3">
          <button
            (click)="toggleSummary()"
            class="w-full justify-center inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
            <svg class="h-4 w-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"></path>
            </svg>
            {{ showSummary ? 'Hide' : 'AI' }} Quick Summary
          </button>
          
          <div *ngIf="showSummary" class="mt-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <div class="flex items-start space-x-2">
              <svg class="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"></path>
              </svg>
              <p class="text-sm text-gray-700 italic">{{ config.aiSummary }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SmartTileComponent {
  @Input() config!: SmartTileConfig;
  @Output() onNavigate = new EventEmitter<void>();
  
  showSummary = false;

  toggleSummary() {
    this.showSummary = !this.showSummary;
  }

  getUrgencyColor(): string {
    const colors = {
      low: 'bg-blue-500',
      medium: 'bg-amber-500',
      high: 'bg-red-500'
    };
    return colors[this.config.urgencyLevel || 'low'];
  }

  getUrgencyBadgeColor(): string {
    const colors = {
      low: 'bg-blue-50 text-blue-700',
      medium: 'bg-amber-50 text-amber-700', 
      high: 'bg-red-50 text-red-700'
    };
    return colors[this.config.urgencyLevel || 'low'];
  }

  getUrgencyLabel(): string {
    const labels = {
      low: 'Info',
      medium: 'Review',
      high: 'Urgent'
    };
    return labels[this.config.urgencyLevel || 'low'];
  }
}