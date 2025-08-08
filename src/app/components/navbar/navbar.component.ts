import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Search, 
  Plus, 
  Bell, 
  Settings, 
  LogOut
} from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <nav class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class=" flex h-16 items-center px-6">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <div class="h-8 w-8 rounded bg-primary"></div>
          <span class="font-medium">Dashboard</span>
        </div>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center space-x-6 ml-8">
          <a href="#" class="text-foreground hover:text-primary transition-colors">
            Overview
          </a>
          <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
            Projects
          </a>
          <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
            Analytics
          </a>
          <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
            Team
          </a>
        </nav>

        <div class="ml-auto flex items-center space-x-4">
          <!-- Search -->
          <div class="relative hidden md:block">
            <lucide-icon 
              [img]="SearchIcon" 
              class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
            </lucide-icon>
            <input
              type="text"
              placeholder="Search projects..."
              [(ngModel)]="searchTerm"
              class="w-64 pl-10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex h-10 rounded-md border border-input bg-background"
            />
          </div>

          <!-- New Project Button -->
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            <lucide-icon [img]="PlusIcon" class="h-4 w-4 mr-2"></lucide-icon>
            New Project
          </button>

          <!-- Notifications -->
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3">
            <lucide-icon [img]="BellIcon" class="h-4 w-4"></lucide-icon>
          </button>

          <!-- Avatar Dropdown -->
          <div class="relative">
            <button 
              (click)="toggleDropdown()"
              class="relative h-8 w-8 rounded-full bg-muted hover:bg-accent transition-colors flex items-center justify-center"
            >
              <span class="text-sm font-medium">JD</span>
            </button>
            
            <!-- Dropdown Menu -->
            <div 
              *ngIf="isDropdownOpen" 
              class="absolute right-0 mt-2 w-56 bg-popover text-popover-foreground shadow-md rounded-md border z-50"
              (clickOutside)="closeDropdown()"
            >
              <div class="px-3 py-2 border-b">
                <p class="font-medium">John Doe</p>
                <p class="text-sm text-muted-foreground">john&#64;example.com</p>
              </div>
              <div class="py-1">
                <button class="flex items-center w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                  <lucide-icon [img]="SettingsIcon" class="mr-2 h-4 w-4"></lucide-icon>
                  Settings
                </button>
                <hr class="my-1">
                <button class="flex items-center w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                  <lucide-icon [img]="LogOutIcon" class="mr-2 h-4 w-4"></lucide-icon>
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  searchTerm = '';
  isDropdownOpen = false;
  
  // Lucide icons
  SearchIcon = Search;
  PlusIcon = Plus;
  BellIcon = Bell;
  SettingsIcon = Settings;
  LogOutIcon = LogOut;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
}