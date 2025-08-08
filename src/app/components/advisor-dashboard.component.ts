// Angular AdvisorDashboard Component Reference (without charts)
// This cannot run in the current React environment

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricCardComponent } from './metric-card.component';
import { ActivityFeedComponent } from './activity-feed.component';

interface AdvisorPerformance {
  name: string;
  revenue: number;
  clients: number;
  conversion: number;
}

@Component({
  selector: 'app-advisor-dashboard',
  standalone: true,
  imports: [CommonModule, MetricCardComponent, ActivityFeedComponent],
  template: `
    <div class="min-h-screen bg-background p-6">
      <div class="">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <div>
            <h1>Advisor Performance Dashboard</h1>
            <p class="text-muted-foreground">
              Track and monitor your team's performance in real-time
            </p>
          </div>
          <div class="flex items-center gap-3">
            <select class="flex h-9 w-40 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
              <option value="this-week">This Week</option>
              <option value="this-month" selected>This Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="this-year">This Year</option>
            </select>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              Filter
            </button>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
              <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Export
            </button>
          </div>
        </div>

        <!-- Key Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style="margin: 10px 0px;">
          <app-metric-card
            title="Total Revenue"
            value="$1.24M"
            [change]="12.5"
            changeType="positive"
            subtitle="vs last month"
            iconType="dollar">
          </app-metric-card>
          
          <app-metric-card
            title="Active Clients"
            value="342"
            [change]="8.2"
            changeType="positive"
            subtitle="vs last month"
            iconType="users">
          </app-metric-card>
          
          <app-metric-card
            title="Conversion Rate"
            value="68.5%"
            [change]="-2.1"
            changeType="negative"
            subtitle="vs last month"
            iconType="target">
          </app-metric-card>
          
          <app-metric-card
            title="Avg. Deal Size"
            value="$18.2K"
            [change]="15.3"
            changeType="positive"
            subtitle="vs last month"
            iconType="trending">
          </app-metric-card>
        </div>

        <!-- Main Content Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6" style="margin: 10px 0px;">
          <!-- Top Performers -->
          <div class="lg:col-span-3 bg-card text-card-foreground rounded-lg border shadow-sm">
            <div class="flex flex-col space-y-1.5 p-6">
              <h3>Top Performing Advisors</h3>
            </div>
            <div class="p-6 pt-0">
              <div class="space-y-4">
                <div 
                  *ngFor="let advisor of advisorPerformance; let i = index" 
                  class="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div class="flex items-center gap-3">
                    <div class="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                      #{{ i + 1 }}
                    </div>
                    <div>
                      <p class="font-medium">{{ advisor.name }}</p>
                      <p class="text-sm text-muted-foreground">
                        {{ advisor.clients }} clients • {{ advisor.conversion }}% conversion
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold">\${{ advisor.revenue | number:'1.0-0' }}</p>
                    <p class="text-sm text-muted-foreground">Revenue</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

         
        </div>

        <!-- Goals and Progress -->
        <div class="bg-card text-card-foreground rounded-lg border shadow-sm">
          <div class="flex flex-col space-y-1.5 p-6">
            <h3>Recommendation for GMM</h3>
          </div>

            <div class="space-y-2">
              
              
              <p class="text-xs text-muted-foreground" style="margin: 0px 20px 20px 20px;">Run a 7-day HNI upsell campaign targeting idle cash; expect quick wins in PMS/AIF allocations. Assign a product specialist to high-risk books for four joint meetings to improve client confidence and reduce churn.</p>
            </div>
       
        </div>
      </div>
    </div>
  `,
  styleUrls: []
})
export class AdvisorDashboardComponent {
  advisorPerformance: AdvisorPerformance[] = [
    { name: 'Sarah Ramirez', revenue: 245000, clients: 32, conversion: 68 },
    { name: 'Michael Chen', revenue: 220000, clients: 28, conversion: 72 },
    { name: 'Emily Rodriguez', revenue: 195000, clients: 25, conversion: 65 },
    { name: 'David Kim', revenue: 180000, clients: 22, conversion: 70 },
    { name: 'Lisa Thompson', revenue: 165000, clients: 20, conversion: 63 },
  ];
}