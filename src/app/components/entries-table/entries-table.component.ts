import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service';
import { 
  ColDef, 
  GridReadyEvent, 
  GridApi, 
  ICellRendererParams
} from 'ag-grid-community';
import { 
  LucideAngularModule, 
  Search, 
  Filter,
  Plus,
  MoreHorizontal, 
  Eye,
  Edit,
  Trash2
} from 'lucide-angular';

interface Entry {
  id: string;
  name: string;
  client: string;
  status: string;
  priority: string;
  dueDate: string;
  assignee: string;
  progress: number;
  budget: string;
}

// Status Badge Cell Renderer Component
@Component({
  selector: 'app-status-cell-renderer',
  template: `
    <span 
      class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      [ngClass]="{
        'border-transparent bg-primary text-primary-foreground hover:bg-primary/80': value === 'Completed',
        'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80': value === 'In Progress' || value === 'Planning',
        'text-foreground': value === 'On Hold'
      }"
    >
      {{value}}
    </span>
  `,
  standalone: true,
  imports: [CommonModule]
})
class StatusCellRendererComponent {
  value!: string;

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    return true;
  }
}

// Priority Badge Cell Renderer Component
@Component({
  selector: 'app-priority-cell-renderer',
  template: `
    <span 
      class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      [ngClass]="{
        'border-transparent bg-green-600 hover:bg-green-700   hover:bg-destructive/80': value === 'high',
        'border-transparentbg-amber-600 hover:bg-amber-700 hover:bg-secondary/80': value === 'medium',
        'text-foreground bg-destructive text-destructive-foreground': value === 'low'  || value === 'very low'
      }"
    >
      {{value}}
    </span>
  `,
  standalone: true,
  imports: [CommonModule]
})
class PriorityCellRendererComponent {
  value!: string;

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    return true;
  }
}

// Progress Bar Cell Renderer Component
@Component({
  selector: 'app-progress-cell-renderer',
  template: `
    <div class="w-full">
      <div class="flex justify-between items-center mb-1">
        <span class="text-xs text-muted-foreground">{{value}}%</span>
      </div>
      <div class="w-full bg-secondary rounded-full h-2">
        <div 
          class="bg-primary h-2 rounded-full transition-all duration-300"
          [style.width.%]="value"
        ></div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
class ProgressCellRendererComponent {
  value!: number;

  agInit(params: ICellRendererParams): void {
    this.value = params.value || 0;
  }

  refresh(params: ICellRendererParams): boolean {
    this.value = params.value || 0;
    return true;
  }
}

// Actions Cell Renderer Component
@Component({
  selector: 'app-actions-cell-renderer',
  template: `
    <div class="relative z-10">
      <button 
        (click)="toggleDropdown()"
        class=""
      >
        <span class="sr-only">Open menu</span>
        <lucide-icon [img]="MoreHorizontalIcon" class="h-4 w-4"></lucide-icon>
      </button>
      
      <div 
        *ngIf="isDropdownOpen"
        class="relative right-0 mt-2 w-48 bg-popover z-50"
      >
        <button 
          class="flex items-center w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
          (click)="viewDetails()"
        >
          <lucide-icon [img]="EyeIcon" class="mr-2 h-4 w-4"></lucide-icon>
          View client details
        </button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, LucideAngularModule]
})
class ActionsCellRendererComponent {
  MoreHorizontalIcon = MoreHorizontal;
  EyeIcon = Eye;
  EditIcon = Edit;
  Trash2Icon = Trash2;
  
  isDropdownOpen = false;
  params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  constructor(private router: Router) {}

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  viewDetails() {
    console.log('View details:', this.params.data.id);
    this.router.navigate(['/client-details'], { queryParams: { id: "CL-000003" } });
    this.isDropdownOpen = false;
  }

  editEntry() {
    console.log('Edit entry:', this.params.data.id);
    this.isDropdownOpen = false;
  }

  deleteEntry() {
    console.log('Delete entry:', this.params.data.id);
    this.isDropdownOpen = false;
  }
}

@Component({
  selector: 'app-entries-table',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    AgGridModule
  ],
  template: `
    <div style = 'margin-top: 20px' class="rounded-lg border bg-card text-card-foreground shadow-sm">
      <!-- Header -->
      <div class="flex flex-col space-y-1.5 p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-2xl font-semibold leading-none tracking-tight">Client Details</h3>
            <p class="text-sm text-muted-foreground">
              Manage and track all your client
            </p>
          </div>
          
        </div>
        
        <!-- Search and Filter Controls -->
        <div class="flex items-center space-x-2">
          <div class="relative flex-1 max-w-sm">
            <lucide-icon [img]="SearchIcon" class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"></lucide-icon>
            <input
              type="text"
              placeholder="Search entries..."
              [(ngModel)]="searchTerm"
              (input)="onQuickFilterChanged()"
              class="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <button 
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
            (click)="toggleFloatingFilters()"
          >
            <lucide-icon [img]="FilterIcon" class="h-4 w-4 mr-2"></lucide-icon>
            Toggle Filters
          </button>
        </div>
      </div>
      
      <!-- AG Grid -->
      <div class="p-6 pt-0">
        <div 
          class="ag-theme-alpine w-full"
          style="height: 500px;"
        >
          <ag-grid-angular
            [rowData]="rowData"
            [columnDefs]="columnDefs"
            [defaultColDef]="defaultColDef"
            [animateRows]="true"
            [pagination]="true"
            [paginationPageSize]="10"
            [paginationPageSizeSelector]="paginationPageSizeSelector"
            [enableCellTextSelection]="true"
            [rowHeight]="60"
            [headerHeight]="48"
            
            [tooltipShowDelay]="500"
            (gridReady)="onGridReady($event)"
            style="width: 100%; height: 100%;"
          ></ag-grid-angular>
        </div>
        
        <!-- Grid Footer Info -->
        <div class="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {{rowData.length}} entries</span>
          <div class="flex items-center space-x-2">
            <span>Rows per page:</span>
            <select 
              class="border rounded px-2 py-1 text-xs bg-background"
              (change)="onPageSizeChanged($event)"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EntriesTableComponent implements OnInit {
  // Icons
  SearchIcon = Search;
  FilterIcon = Filter;
  PlusIcon = Plus;

  // Grid properties
  private gridApi!: GridApi;
  searchTerm = '';
  floatingFiltersEnabled = false;
  paginationPageSizeSelector = [10, 20, 50];

  // Sample data
  rowData: Entry[] = [

  ];

  // Column definitions
  columnDefs: ColDef[] = [
    
    {
      field: 'full_name',
      headerName: 'Client Name',
      width: 120,
      sortable: true
      
    },
    {
      field: 'employer_name',
      headerName: 'Relationship',
     width: 220,
      
      sortable: true
      
    },
    {
      field: 'total_aum',
      headerName: 'Assets',
     // width: 80,
      sortable: true
    },
    {
      field: 'risk_tolerance',
      headerName: 'Risk Tolerance',
      width: 120,
      cellRenderer: PriorityCellRendererComponent,
      sortable: true
      
    },
    {
      field: 'key_concerns',
      headerName: 'Key Concerns',
      sortable: true,
      cellClass: 'ellipsis-cell',
      tooltipField: 'key_concerns', 
      valueFormatter: (params) => { 
        const jsonCompatible = params?.value?.replace(/'([^']*)'/g, '"$1"');

        
        const resultArray = JSON.parse(jsonCompatible);
        return resultArray[0];
      }
      
      
    },
    {
      field: 'last_updated',
      headerName: 'Last Interaction',
      //width: 130,
      sortable: true
      
    },
    {
      headerName: 'Actions',
      //width: 100,
      cellRenderer: ActionsCellRendererComponent,
      sortable: false,
      filter: false,
      pinned: 'right',
      suppressMenu: true
    }
  ];



  // Default column definition
  defaultColDef: ColDef = {
    sortable: false,
    filter: false,
    resizable: true,
    floatingFilter: false
  };

  ngOnInit() {
    // Component initialization
  }

  constructor(private dataService: DataService) {}

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.dataService.getDashboardData().subscribe(
      data => (this.rowData = data),
      error => console.error('Error loading data', error)
    );
    this.gridApi.sizeColumnsToFit();
  }

  onQuickFilterChanged() {
    if (this.gridApi) {
      this.gridApi.setGridOption('quickFilterText', this.searchTerm);
    }
  }

  toggleFloatingFilters() {
    this.floatingFiltersEnabled = !this.floatingFiltersEnabled;
    if (this.gridApi) {
      //this.gridApi.setGridOption('floatingFilter', this.floatingFiltersEnabled);
    }
  }

  onPageSizeChanged(event: any) {
    //const newPageSize = parseInt(event.target.value);
    if (this.gridApi && event.target.value) {
      //this.gridApi.paginationSetPageSize(newPageSize);
    }
  }
}