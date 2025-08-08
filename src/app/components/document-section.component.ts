// This is a reference file showing how this would look in Angular
// This cannot run in the current React environment

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Document {
  id: string;
  title: string;
  type: string;
  summary: string;
  lastModified: string;
  size: string;
  url: string;
}

@Component({
  selector: 'app-document-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full max-w-6xl mx-auto space-y-6">
      <!-- Header -->
     

      <!-- Document Links Section -->
      <div class="bg-card text-card-foreground rounded-lg border shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6">
          <div class="flex items-center gap-2">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>All Documents</span>
          </div>
        </div>
        <div class="p-6 pt-0">
          <div class="grid gap-3">
            <div 
              *ngFor="let doc of mockDocumentsDetails"
              class="flex items-center justify-between p-4 border rounded-lg transition-colors hover:bg-muted/50 cursor-pointer"
              [class.bg-muted]="selectedDocument === doc.id"
              [class.border-primary]="selectedDocument === doc.id"
              (click)="toggleDocument(doc.id)"
            >
              <div class="flex items-center gap-3 flex-1">
                <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span>{{ doc.title }}</span>
                    <span 
                      class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                      [ngClass]="getTypeColor(doc.type)"
                    >
                      {{ doc.type }}
                    </span>
                  </div>
                  <div class="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Modified: {{ doc.lastModified }}</span>
                    <span>Size: {{ doc.size }}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button 
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                  (click)="downloadDocument($event, doc)"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </button>
                <button 
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                  (click)="openDocument($event, doc)"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Document Summaries Section -->
      <div class="space-y-4">
        <div class="grid gap-4">
          <div 
            *ngFor="let doc of mockDocuments"
            class="bg-card text-card-foreground rounded-lg border shadow-sm transition-all duration-200"
            [class.ring-2]="selectedDocument === doc.id"
            [class.ring-primary]="selectedDocument === doc.id"
            [class.shadow-lg]="selectedDocument === doc.id"
          >
            <div class="flex flex-col space-y-1.5 p-6 pb-3">
              <div class="flex items-start justify-between">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <h3>{{ doc.title }}</h3>
                  </div>
                  <div class="flex items-center gap-2">
                    <span 
                      class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                      [ngClass]="getTypeColor(doc.type)"
                    >
                      {{ doc.type }}
                    </span>
                    <span class="text-sm text-muted-foreground">
                      {{ doc.size }} • Modified {{ doc.lastModified }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center gap-1">
                  <button 
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                    (click)="downloadDocument($event, doc)"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </button>
                  <button 
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                    (click)="openDocument($event, doc)"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="p-6 pt-0">
              <p class="text-muted-foreground leading-relaxed">
                {{ doc.summary }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles:[]
})
export class DocumentSectionComponent {
  selectedDocument: string | null = null;

  mockDocuments: Document[] = [
    {
      id: '1',
      title: 'Document Summary',
      type: 'PDF',
      summary: 'Sarah Jhonson is a Senior Software Engineer at Apple Inc. with an annual salary of $8,750,000, currently employed full-time since May 2022. His tax return shows a total income matching his salary, with a federal tax liability of $1,921,953 and a tax refund of $192,195. \nHis Citi Private Bank investment account is valued at $601,917, with a year-to-date return of 5.51% and income generation of $68,023. His monthly bank statement shows regular salary deposits of $8,500 and an ending balance of $145,631.',
      lastModified: '',
      size: '',
      url: '#'
    },
    {
      id: '2',
      title: 'Advisor Recommendations',
      type: 'PDF',
      summary: 'Recommend rebalancing the investment portfolio to align closer with the benchmark return, as the current account is underperforming by 1.46%.\nConsider discussing tax-efficient strategies to optimize the high annual salary and potential investment income.',
      lastModified: '',
      size: '',
      url: '#'
    }
  ];

  mockDocumentsDetails: Document[] = [
    {
      id: '1',
      title: 'Sarah Jhonson Investment Statement',
      type: 'PDF',
      summary: 'Sarah Jhonson is a Senior Software Engineer at Apple Inc. with an annual salary of $8,750,000, currently employed full-time since May 2022. His tax return shows a total income matching his salary, with a federal tax liability of $1,921,953 and a tax refund of $192,195. \nHis Citi Private Bank investment account is valued at $601,917, with a year-to-date return of 5.51% and income generation of $68,023. His monthly bank statement shows regular salary deposits of $8,500 and an ending balance of $145,631.',
      lastModified: '2025-01-15',
      size: '2.3 MB',
      url: '#'
    },
    {
      id: '2',
      title: 'Sarah Jhonson Employment Verification',
      type: 'PDF',
      summary: 'Recommend rebalancing the investment portfolio to align closer with the benchmark return, as the current account is underperforming by 1.46%.\nConsider discussing tax-efficient strategies to optimize the high annual salary and potential investment income.',
      lastModified: '2025-07-25',
      size: '3.1 MB',
      url: '#'
    },
    {
      id: '3',
      title: 'Sarah Jhonson Bank Statement',
      type: 'PDF',
      summary: 'Recommend rebalancing the investment portfolio to align closer with the benchmark return, as the current account is underperforming by 1.46%.\nConsider discussing tax-efficient strategies to optimize the high annual salary and potential investment income.',
      lastModified: '2025-05-25',
      size: '4.1 MB',
      url: '#'
    },
    {
      id: '4',
      title: 'Sarah Jhonson 2023 Tax Return',
      type: 'PDF',
      summary: 'Recommend rebalancing the investment portfolio to align closer with the benchmark return, as the current account is underperforming by 1.46%.\nConsider discussing tax-efficient strategies to optimize the high annual salary and potential investment income.',
      lastModified: '2025-04-22',
      size: '1.1 MB',
      url: '#'
    }
  ];

  toggleDocument(id: string): void {
    this.selectedDocument = this.selectedDocument === id ? null : id;
  }

  getTypeColor(type: string): string {
    switch (type.toLowerCase()) {
      case 'pdf': 
        return 'bg-red-100 text-red-800';
      case 'docx': 
        return 'bg-blue-100 text-blue-800';
      case 'html': 
        return 'bg-green-100 text-green-800';
      default: 
        return 'bg-gray-100 text-gray-800';
    }
  }

  downloadDocument(event: Event, doc: Document): void {
    event.stopPropagation();
    // Handle download logic here
    console.log('Downloading:', doc.title);
  }

  openDocument(event: Event, doc: Document): void {
    event.stopPropagation();
    window.open(doc.url, '_blank');
  }
}