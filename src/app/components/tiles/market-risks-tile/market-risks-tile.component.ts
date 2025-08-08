import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartTileComponent, SmartTileConfig } from '../../smart-tile/smart-tile.component';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';

Chart.register(...registerables);

interface RiskItem {
  risk: string;
  impact: string;
  portfolioExposure: string;
  status: string;
}

@Component({
  selector: 'app-market-risks-tile',
  standalone: true,
  imports: [CommonModule, SmartTileComponent],
  template: `
    <app-smart-tile [config]="tileConfig">
      <div class="space-y-4">
        <!-- Risk Level Chart -->
        <div>
          <h4 class="font-medium text-sm mb-2">Risk Exposure Levels</h4>
          <div class="h-24">
            <canvas #riskChart></canvas>
          </div>
          <div class="flex items-center justify-center space-x-4 mt-2">
            <div class="flex items-center space-x-1 text-xs">
              <div class="w-2 h-2 bg-blue-500 rounded"></div>
              <span>Current</span>
            </div>
            <div class="flex items-center space-x-1 text-xs">
              <div class="w-2 h-2 bg-gray-300 rounded"></div>
              <span>Target</span>
            </div>
          </div>
        </div>

        <!-- Risk Details -->
        <div class="space-y-2">
          <div *ngFor="let risk of risks" class="p-2 rounded border bg-card/50">
            <div class="flex items-start justify-between mb-1">
              <h5 class="font-medium text-xs">{{ risk.risk }}</h5>
              <span [class]="'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 ' + getImpactBadgeColor(risk.impact)">
                {{ risk.impact }}
              </span>
            </div>
            <p class="text-xs text-muted-foreground mb-1">{{ risk.portfolioExposure }}</p>
            <div class="flex items-center space-x-1">
              <ng-container [ngSwitch]="risk.status">
                <svg *ngSwitchCase="'Monitor'" class="h-3 w-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg *ngSwitchCase="'Rebalance'" class="h-3 w-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                </svg>
                <svg *ngSwitchCase="'Hedge'" class="h-3 w-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </ng-container>
              <span class="text-xs font-medium">{{ risk.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </app-smart-tile>
  `,
  styles: []
})
export class MarketRisksTileComponent implements AfterViewInit {
  @ViewChild('riskChart', { static: true }) riskChart!: ElementRef<HTMLCanvasElement>;

  tileConfig: SmartTileConfig = {
    title: 'Market Risks',
    subtitle: 'Portfolio risk assessment',
    aiSummary: 'Key talking point: Address interest rate concerns given client\'s 30% bond allocation. Suggest discussing tech rebalancing and inflation hedging strategies like TIPS or commodities.',
    hasNewContent: true,
    urgencyLevel: 'medium',
    icon: `<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
    </svg>`
  };

  risks: RiskItem[] = [
    {
      risk: 'Interest Rate Volatility',
      impact: 'High',
      portfolioExposure: '30% Fixed Income',
      status: 'Monitor'
    },
    {
      risk: 'Tech Sector Concentration',
      impact: 'Medium',
      portfolioExposure: '15% Tech Holdings',
      status: 'Rebalance'
    },
    {
      risk: 'Inflation Pressure',
      impact: 'Medium',
      portfolioExposure: 'Overall Portfolio',
      status: 'Hedge'
    }
  ];

  riskData = [
    { category: 'Interest Rate', current: 7, target: 5 },
    { category: 'Credit', current: 3, target: 4 },
    { category: 'Equity', current: 6, target: 6 },
    { category: 'Currency', current: 2, target: 3 }
  ];

  ngAfterViewInit() {
    this.createRiskChart();
  }

  createRiskChart() {
    const ctx = this.riskChart.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.riskData.map(item => item.category),
          datasets: [
            {
              label: 'Current',
              data: this.riskData.map(item => item.current),
              backgroundColor: '#3b82f6',
              borderRadius: 2
            },
            {
              label: 'Target',
              data: this.riskData.map(item => item.target),
              backgroundColor: '#d1d5db',
              borderRadius: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              display: true,
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 10
                }
              }
            },
            y: {
              display: false,
              grid: {
                display: false
              }
            }
          }
        }
      });
    }
  }

  getImpactBadgeColor(impact: string): string {
    return impact === 'High' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-700';
  }
}