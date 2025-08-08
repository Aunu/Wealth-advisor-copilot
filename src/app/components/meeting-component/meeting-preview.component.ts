import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TauiToastService } from '@ngx-tailwind-ui/toast';

@Component({
  standalone: true,
  selector: 'meeting-scheduler',
  imports: [FormsModule],
  template: `
    <dialog #dialog class="fixed-box p-6 rounded shadow-lg">
      <header class="text-xl font-bold border-b pb-2 flex justify-between items-center">
        Schedule Meeting - {{ meetingTopic }}
        <button (click)="close()" class="text-gray-500 hover:text-gray-700">&times;</button>
      </header>
      
      <section class="py-4 space-y-4">
        <div>
          <label for="date" class="block text-sm font-medium">Start Date</label>
          <input 
            type="date" 
            id="date" 
            [(ngModel)]="date"
            class="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label for="time" class="block text-sm font-medium">Start Time</label>
          <input 
            type="time" 
            id="time" 
            [(ngModel)]="time"
            class="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </section>
      
      <footer class="mt-4 flex justify-end">
        <button 
          (click)="scheduleMeeting()" 
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
          Schedule
        </button>
      </footer>
    </dialog>
  `,
  styles: [`
    dialog { width: 400px; height: auto; }
  `]
})
export class MeetingSchedulerComponent {
  private toast = inject(TauiToastService);
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  date = '';
  time = '';
  meetingTopic = '';
  location = '';

  open(date : string, time : string, location : string, topic : string) {
    this.date = date;
    this.time = time;
    this.location = location;
    this.meetingTopic = topic;
    this.dialog.nativeElement.showModal();
  }

  close() {
    this.dialog.nativeElement.close();
  }

  scheduleMeeting() {
    this.close();
    this.toast.showToast({
      type: 'success',
      message: `Meeting scheduled for ${this.date} at ${this.time}`,
      duration: 3000
    });
  }
}
