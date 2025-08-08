import { Component, ViewChild, ElementRef } from '@angular/core';

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
    </dialog>
  `,
  styles: [`
    dialog { width: 600px; height: 350px}
    .btn-secondary { /* Tailwind-like styling or actual Tailwind classes */ }
  `]
})
export class EmailPreviewComponent {
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
}