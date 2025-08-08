import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartTileComponent, SmartTileConfig } from '../../smart-tile/smart-tile.component';
import { Chart, ChartConfiguration } from 'chart.js';

interface AnalysisItem {
  title: string;
  status: string;
  description: string;
  trend: string;
}

@Component({
  selector: 'app-portfolio-analysis-tile',
  standalone: true,
  imports: [CommonModule, SmartTileComponent],
  template: `
    <app-smart-tile [config]="tileConfig">
      <div class="space-y-4">
        <!-- Performance Chart -->
        <div>
          <h4 class="font-medium text-sm mb-2">6-Month Performance</h4>
          <div class="h-24">
            <canvas #performanceChart></canvas>
          </div>
        </div>

        <!-- Current Allocation Mini Chart -->
        <div class="flex items-center space-x-3">
          <div class="w-16 h-16">
            <canvas #allocationChart></canvas>
          </div>
          <div class="flex-1">
            <div class="text-sm font-medium">Current Allocation</div>
            <div class="text-xs text-muted-foreground">Well-diversified across asset classes</div>
          </div>
        </div>

        <!-- Analysis Points -->
        <div class="space-y-2">
          <div *ngFor="let analysis of analyses" class="p-2 rounded border bg-card/50">
            <div class="flex items-center justify-between mb-1">
              <h5 class="font-medium text-xs">{{ analysis.title }}</h5>
              <span class="inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10">
                {{ analysis.status }}
              </span>
            </div>
            <p class="text-xs text-muted-foreground">{{ analysis.description }}</p>
          </div>
        </div>
      </div>
    </app-smart-tile>
  `,
  styles: []
})
export class PortfolioAnalysisTileComponent implements OnInit {
  @ViewChild('performanceChart', { static: true }) performanceChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('allocationChart', { static: true }) allocationChart!: ElementRef<HTMLCanvasElement>;

  tileConfig: SmartTileConfig = {
    title: 'Portfolio Analysis',
    subtitle: 'Performance & allocation insights',
    aiSummary: 'Portfolio is well-positioned with strong risk-adjusted returns. Fixed income allocation provides stability while equity positions drive growth. Consider minor rebalancing in Q1 2025.',
    urgencyLevel: 'low',
    icon: `<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
    </svg>`
  };

  performanceData = [
    { month: 'Jul', value: 5.8 },
    { month: 'Aug', value: 6.4 },
    { month: 'Sep', value: 4.7 },
    { month: 'Oct', value: 8.2 },
    { month: 'Nov', value: 7.9 },
    { month: 'Dec', value: 8.4 }
  ];

  allocationData = [
    { name: 'US Equity', value: 35, color: '#3b82f6' },
    { name: 'Fixed Income', value: 30, color: '#10b981' },
    { name: 'International', value: 20, color: '#8b5cf6' },
    { name: 'REITs', value: 10, color: '#f59e0b' },
    { name: 'Cash', value: 5, color: '#6b7280' }
  ];

  analyses: AnalysisItem[] = [
    {
      title: 'Asset Allocation Review',
      status: 'Balanced',
      description: 'Current allocation aligns well with conservative risk profile',
      trend: 'stable'
    },
    {
      title: 'Performance Attribution',
      status: 'Outperforming',
      description: 'Fixed income and equity positions driving positive returns',
      trend: 'up'
    },
    {
      title: 'Risk-Adjusted Returns',
      status: 'Strong',
      description: 'Sharpe ratio of 1.42 indicates efficient risk management',
      trend: 'up'
    }
  ];

  ngOnInit() {
    setTimeout(() => {
      this.createPerformanceChart();
      this.createAllocationChart();
    }, 100);
  }

  createPerformanceChart() {
    const ctx = this.performanceChart.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.performanceData.map(item => item.month),
          datasets: [{
            data: this.performanceData.map(item => item.value),
            borderColor: '#3b82f6',
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 2,
            tension: 0.1
          }]
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
              display: false
            }
          }
        }
      });
    }
  }

  createAllocationChart() {
    const ctx = this.allocationChart.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.allocationData.map(item => item.name),
          datasets: [{
            data: this.allocationData.map(item => item.value),
            backgroundColor: this.allocationData.map(item => item.color),
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