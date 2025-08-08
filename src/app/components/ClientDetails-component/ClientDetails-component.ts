import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileComponent } from '../client-profile/client-profile.component';
import { MarketRisksTileComponent } from '../tiles/market-risks-tile/market-risks-tile.component';
import { PortfolioAnalysisTileComponent } from '../tiles/portfolio-analysis-tile/portfolio-analysis-tile.component';
import { PersonalRemindersTileComponent } from '../tiles/personal-reminders-tile/personal-reminders-tile.component';
import { ClientSummaryTileComponent } from '../tiles/client-summary-tile/client-summary-tile.component';
import { MeetingTopicsTileComponent } from '../tiles/meeting-topics-tile/meeting-topics-tile.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data-service';
import { DocumentSectionComponent } from '../document-section.component';

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
    MeetingTopicsTileComponent,
    DocumentSectionComponent
  ],
  template: `
    <div class="min-h-screen bg-background p-6">
      <!-- Client Profile Header -->
      <app-client-profile></app-client-profile>
      
      <!-- Call Preparation Status Bar -->
      <div class="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 rounded-lg border bg-card text-card-foreground shadow-sm">
        <div class="p-4">
          <div class="flex items-center justify-between">
            
            
          </div>
        </div>
      </div>

      <!-- Intelligent Tile Layout - Optimized for Quick Consumption -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Priority Column - High Impact Items -->
        <div class="space-y-6">
          <div class="text-sm font-medium text-muted-foreground mb-3 flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-red-500"></div>
            <span>Document Summary</span>
          </div>
          <app-document-section></app-document-section>
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

    
    </div>
   
  `,
  styles: []
})
export class ClientDetailsComponent {
  title = 'wealth-management-dashboard';
  clientId: string | null = null;
  clientData: any[] = [];
  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   this.clientId = params['id'] || null;
    // });

     this.clientId = this.route.snapshot.queryParamMap.get('id') || '';
     this.dataService.getClientData(this.clientId).subscribe(
      data => {this.clientData = data
        console.log('Client Data:', this.clientData);
      },
      error => console.error('Error loading data', error)
    );
  }
}