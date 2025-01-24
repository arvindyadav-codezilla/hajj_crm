import { Component, inject } from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  translate:TranslateService = inject(TranslateService);

}
