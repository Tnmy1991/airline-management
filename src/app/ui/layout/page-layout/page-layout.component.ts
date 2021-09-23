import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.sass']
})
export class PageLayoutComponent {
  
  @Input() addClass: string = '';
  
}
