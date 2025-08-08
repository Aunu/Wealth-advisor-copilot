// Angular ActivityFeed Component Reference
// This cannot run in the current React environment

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Activity {
  id: string;
  advisor: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  client?: string;
  amount?: string;
  timestamp: string;
  type: 'call' | 'meeting' | 'sale' | 'contact';
}

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-card text-card-foreground rounded-lg border shadow-sm h-full">
      
    </div>
  `,
  styleUrls: []
})
export class ActivityFeedComponent {
  mockActivities: Activity[] = [
    {
      id: '1',
      advisor: { name: 'Sarah Ramirez', initials: 'SJ' },
      action: 'Closed new client deal',
      client: 'Tech Solutions Inc',
      amount: '$45,000',
      timestamp: '2 hours ago',
      type: 'sale'
    },
    {
      id: '2',
      advisor: { name: 'Michael Chen', initials: 'MC' },
      action: 'Completed client call',
      client: 'Global Ventures LLC',
      timestamp: '3 hours ago',
      type: 'call'
    },
    {
      id: '3',
      advisor: { name: 'Emily Rodriguez', initials: 'ER' },
      action: 'Scheduled follow-up meeting',
      client: 'Innovation Partners',
      timestamp: '5 hours ago',
      type: 'meeting'
    },
    {
      id: '4',
      advisor: { name: 'David Kim', initials: 'DK' },
      action: 'Added new prospect',
      client: 'StartUp Hub',
      timestamp: '6 hours ago',
      type: 'contact'
    },
    {
      id: '5',
      advisor: { name: 'Lisa Thompson', initials: 'LT' },
      action: 'Client portfolio review',
      client: 'Wealth Management Co',
      timestamp: '8 hours ago',
      type: 'meeting'
    }
  ];

  getActivityColor(type: string): string {
    switch (type) {
      case 'call':
        return 'bg-blue-100 text-blue-800';
      case 'meeting':
        return 'bg-purple-100 text-purple-800';
      case 'sale':
        return 'bg-green-100 text-green-800';
      case 'contact':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}