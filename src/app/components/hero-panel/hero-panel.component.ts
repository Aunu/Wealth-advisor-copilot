import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  Users, 
  Activity 
} from 'lucide-angular';

@Component({
  selector: 'app-hero-panel',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6">
      <!-- Main Summary -->
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6 pb-2">
          <h3 class="text-2xl font-semibold leading-none tracking-tight">Welcome back, John!</h3>
          <p class="text-sm text-muted-foreground">
            Here's what you need to know about your accounts today.
          </p>
        </div>
        <div class="p-6 pt-0">
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">Total AUM</p>
              <div class="flex items-center space-x-2">
                <p class="font-medium">$348MM</p>
                <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  <lucide-icon [img]="TrendingUpIcon" class="h-3 w-3 mr-1"></lucide-icon>
                  +12.5%
                </span>
              </div>
            </div>
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">Active Clients</p>
              <div class="flex items-center space-x-2">
                <p class="font-medium">24</p>
                
              </div>
            </div>
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">Pipeline Number</p>
              <div class="flex items-center space-x-2">
                <p class="font-medium">$7.8MM</p>
                
              </div>
            </div>
            <div class="space-y-2">
              <p class="text-sm text-muted-foreground">NNIA YTD</p>
              <div class="flex items-center space-x-2">
                <p class="font-medium">$21.4MM</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>

     
  `
})
export class HeroPanelComponent implements OnInit {
  // Icons
  TrendingUpIcon = TrendingUp;
  TrendingDownIcon = TrendingDown;
  TargetIcon = Target;
  AwardIcon = Award;
  UsersIcon = Users;
  ActivityIcon = Activity;

  // Chart data
  

  projectStatusData = [
    { name: "Completed", value: 45, color: "var(--color-chart-1)" },
    { name: "In Progress", value: 30, color: "var(--color-chart-2)" },
    { name: "On Hold", value: 15, color: "var(--color-chart-3)" },
    { name: "Cancelled", value: 10, color: "var(--color-chart-4)" }
  ];

  

 
  ngOnInit() {}
}