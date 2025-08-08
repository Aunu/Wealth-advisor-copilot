// Angular MetricCard Component Reference
// This cannot run in the current React environment

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  subtitle?: string;
  iconType?: 'dollar' | 'users' | 'target' | 'trending';
}

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-card text-card-foreground rounded-lg border shadow-sm">
      <div class="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <h3 class="text-sm font-medium">{{ title }}</h3>
        <div *ngIf="iconType" class="text-muted-foreground">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <!-- Dollar Icon -->
            <path *ngIf="iconType === 'dollar'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            <!-- Users Icon -->
            <path *ngIf="iconType === 'users'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197v1a6 6 0 013-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            <!-- Target Icon -->
            <path *ngIf="iconType === 'target'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            <!-- Trending Icon -->
            <path *ngIf="iconType === 'trending'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
          </svg>
        </div>
      </div>
      <div class="p-6 pt-0">
        <div class="space-y-2">
          <div class="text-2xl font-bold">{{ value }}</div>
          <div *ngIf="change !== undefined" class="flex items-center gap-1">
            <span 
              class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
              [ngClass]="getChangeColor()"
            >
              <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <!-- Trending Up -->
                <path *ngIf="changeType === 'positive'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                <!-- Trending Down -->
                <path *ngIf="changeType === 'negative'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                <!-- Minus -->
                <path *ngIf="changeType === 'neutral'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
              </svg>
              {{ change > 0 ? '+' : '' }}{{ change }}%
            </span>
          </div>
          <p *ngIf="subtitle" class="text-xs text-muted-foreground">{{ subtitle }}</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: []
})
export class MetricCardComponent {
  @Input() title!: string;
  @Input() value!: string | number;
  @Input() change?: number;
  @Input() changeType: 'positive' | 'negative' | 'neutral' = 'neutral';
  @Input() subtitle?: string;
  @Input() iconType?: 'dollar' | 'users' | 'target' | 'trending';

  getChangeColor(): string {
    switch (this.changeType) {
      case 'positive':
        return 'text-green-600 bg-green-50';
      case 'negative':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  }
}