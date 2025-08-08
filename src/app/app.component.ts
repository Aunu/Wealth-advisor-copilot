import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TauiToastComponent } from '@ngx-tailwind-ui/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TauiToastComponent],
  template: `<router-outlet></router-outlet> <taui-toast class="fixed top-4 inset-x-0 mx-auto" />`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-dashboard';
 
}