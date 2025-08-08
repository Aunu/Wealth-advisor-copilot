import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileComponent } from '../client-profile/client-profile.component';
import { MarketRisksTileComponent } from '../tiles/market-risks-tile/market-risks-tile.component';
import { PortfolioAnalysisTileComponent } from '../tiles/portfolio-analysis-tile/portfolio-analysis-tile.component';
import { PersonalRemindersTileComponent } from '../tiles/personal-reminders-tile/personal-reminders-tile.component';
import { ClientSummaryTileComponent } from '../tiles/client-summary-tile/client-summary-tile.component';
import { MeetingTopicsTileComponent } from '../tiles/meeting-topics-tile/meeting-topics-tile.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ClientProfileComponent,
    MarketRisksTileComponent,
    PortfolioAnalysisTileComponent,
    PersonalRemindersTileComponent,
    ClientSummaryTileComponent,
    MeetingTopicsTileComponent
  ],
  template: `
    <div class="min-h-screen bg-background p-6">
      <!-- Client Profile Header -->
      <app-client-profile></app-client-profile>
      
      <!-- Call Preparation Status Bar -->
      <div class="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 rounded-lg border bg-card text-card-foreground shadow-sm">
        <div class="p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <svg class="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span class="font-medium text-sm">Next Call: Today 2:00 PM</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-sm text-muted-foreground">45 min prep time</span>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span class="inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">Ready to Call</span>
              <span class="text-sm text-muted-foreground">6/6 areas reviewed</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Intelligent Tile Layout - Optimized for Quick Consumption -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Priority Column - High Impact Items -->
        <div class="space-y-6">
          <div class="text-sm font-medium text-muted-foreground mb-3 flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-red-500"></div>
            <span>IMMEDIATE ATTENTION</span>
          </div>
          <app-personal-reminders-tile></app-personal-reminders-tile>
          <app-market-risks-tile></app-market-risks-tile>
        </div>

        <!-- Analysis Column - Portfolio Information -->
        <div class="space-y-6">
          <div class="text-sm font-medium text-muted-foreground mb-3 flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>PORTFOLIO ANALYSIS</span>
          </div>
          <app-client-summary-tile></app-client-summary-tile>
          <app-portfolio-analysis-tile></app-portfolio-analysis-tile>
        </div>

        <!-- Action Column - Meeting Preparation -->
        <div class="space-y-6">
          <div class="text-sm font-medium text-muted-foreground mb-3 flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            <span>CALL PREPARATION</span>
          </div>
          <app-meeting-topics-tile></app-meeting-topics-tile>
        </div>
      </div>

      <!-- Quick Navigation Footer -->
      <div class="mt-8 p-4 rounded-lg border bg-card">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <span class="text-sm font-medium">Call Readiness:</span>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              <span class="text-sm text-green-600">All systems ready</span>
            </div>
          </div>
          <div class="flex items-center space-x-2 text-xs text-muted-foreground">
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
            <span>Last updated: 2 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
   
  `,
  styles: []
})
export class ClientDetailsComponent {
  title = 'wealth-management-dashboard';
}