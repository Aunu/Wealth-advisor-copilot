import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-8 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div class="p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full">
              <img 
                class="aspect-square h-full w-full"
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                alt="Sarah Johnson" />
            </div>
            <div>
              <h2 class="text-xl font-semibold">Sarah Johnson</h2>
              <p class="text-sm text-muted-foreground">Premium Client • Since 2018</p>
              <div class="flex items-center space-x-4 mt-2">
                <div class="flex items-center space-x-1">
                  <svg class="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  <span class="text-sm font-medium">$890,000 AUM</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                  <span class="text-sm">+8.7% YTD</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span class="text-sm">Boston, MA</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-right">
            <div class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Active
            </div>
            <p class="text-xs text-muted-foreground mt-2">Last contact: 3 days ago</p>
            <p class="text-xs text-muted-foreground">Risk tolerance: Conservative</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ClientProfileComponent {}