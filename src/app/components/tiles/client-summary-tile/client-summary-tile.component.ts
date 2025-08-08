import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartTileComponent, SmartTileConfig } from '../../smart-tile/smart-tile.component';
import { Chart } from 'chart.js';

interface PortfolioItem {
  category: string;
  percentage: number;
  value: string;
  color: string;
}

@Component({
  selector: 'app-client-summary-tile',
  standalone: true,
  imports: [CommonModule, SmartTileComponent],
  template: `
    <app-smart-tile [config]="tileConfig">
      <div class="space-y-4">
        <!-- Key Metrics -->
        <div class="grid grid-cols-2 gap-2">
          <div class="p-2 rounded bg-muted/50">
            <div class="text-lg font-semibold">$147,500,000.0</div>
            <div class="text-xs text-muted-foreground">Total AUM</div>
          </div>
          <div class="p-2 rounded bg-muted/50">
            <div class="text-lg font-semibold text-green-600">+8.7%</div>
            <div class="text-xs text-muted-foreground">YTD Return</div>
          </div>
        </div>

        <!-- Portfolio Allocation Visual -->
        <div class="flex items-center space-x-3">
          <div class="w-16 h-16">
            <canvas #portfolioChart></canvas>
          </div>
          <div class="flex-1">
            <div class="text-sm font-medium">Asset Allocation</div>
            <div class="text-xs text-muted-foreground">Well-diversified conservative mix</div>
          </div>
        </div>

        <!-- Client Profile -->
        <div class="space-y-2">
          <h4 class="font-medium text-sm">Profile</h4>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span class="text-muted-foreground">Risk: </span>
              <span class="inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10">{{ clientProfile.riskTolerance }}</span>
            </div>
            <div>
              <span class="text-muted-foreground">Horizon: </span>
              <span class="font-medium">{{ clientProfile.timeHorizon }}</span>
            </div>
            <div class="col-span-2">
              <span class="text-muted-foreground">Goal: </span>
              <span class="font-medium">{{ clientProfile.primaryGoal }}</span>
            </div>
          </div>
        </div>

        <!-- Top Holdings Summary -->
        <div class="space-y-2">
          <h4 class="font-medium text-sm">Top Allocations</h4>
          <div class="space-y-1">
            <div *ngFor="let holding of portfolioBreakdown.slice(0, 3)" class="flex items-center justify-between text-xs">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 rounded-full" [style.background-color]="holding.color"></div>
                <span>{{ holding.category }}</span>
              </div>
              <span class="font-medium">{{ holding.percentage }}%</span>
            </div>
          </div>
        </div>
      </div>
    </app-smart-tile>
  `,
  styles: []
})
export class ClientSummaryTileComponent implements OnInit {
  @ViewChild('portfolioChart', { static: true }) portfolioChart!: ElementRef<HTMLCanvasElement>;

  tileConfig: SmartTileConfig = {
    title: 'Client Summary',
    subtitle: 'Portfolio & profile overview',
    aiSummary: 'Based on the comprehensive client profile for Sarah Ramirez, here is  a targeted recommendation:Develop a tax-efficient, sustainable energy sector investment strategy that preserves wealth and supports multi-generational transfer, focusing on clean technology and private equity opportunities aligned with his professional background and investment objectives. Prioritize a personalized approach that leverages his sophisticated investment experience and high engagement with detailed analytical content.',
    icon: `<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
    </svg>`
  };

  portfolioBreakdown: PortfolioItem[] = [
    { category: 'Mutual Fund', percentage: 65, value: '$311,500', color: '#3b82f6' },
    { category: 'US Equity', percentage: 35, value: '$267,000', color: '#10b981' }
  ];

  clientProfile = {
    riskTolerance: 'Conservative',
    timeHorizon: '3.2 years',
    primaryGoal: 'Succession planning for business and family wealth',
    monthlyContribution: '$2,500'
  };

  ngOnInit() {
    setTimeout(() => {
      this.createPortfolioChart();
    }, 100);
  }

  createPortfolioChart() {
    const ctx = this.portfolioChart.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.portfolioBreakdown.map(item => item.category),
          datasets: [{
            data: this.portfolioBreakdown.map(item => item.percentage),
            backgroundColor: this.portfolioBreakdown.map(item => item.color),
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
  }
}