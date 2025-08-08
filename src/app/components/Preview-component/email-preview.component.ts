import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { TauiToastService } from '@ngx-tailwind-ui/toast';

@Component({
  standalone: true,
  selector: 'email-preview',
  template: `
    <dialog #dialog class="fixed-box p-6 rounded shadow-lg">
      <header class="text-xl font-bold border-b pb-2">
        {{ subject }}
        <button (click)="close()" class="float-right">&times;</button>
      </header>
      <section class="py-4">
        {{ body }}
      </section>
      <footer class="mt-4 flex justify-end">
        <button 
          (click)="send()" 
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
          Send
        </button>
      </footer>
    </dialog>
  `,
  styles: [`
    dialog { width: 600px; height: 350px}
    .btn-secondary { /* Tailwind-like styling or actual Tailwind classes */ }
  `]
})
export class EmailPreviewComponent {
  private toast = inject(TauiToastService);
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  subject = '';
  body = '';

  open(subject: string, body: string) {
    this.subject = subject;
    this.body = body;
    this.dialog.nativeElement.showModal();
  }
  close() {
    this.dialog.nativeElement.close();
  }
  send() {
    // Add any send logic here
    this.close();
    this.toast.showToast({
      type: 'success',                  // 'info' | 'success' | 'warning' | 'error'
      message: 'Email sent!',
      duration: 3000                    // Optional, defaults to 5000 ms
    });
  }
}