import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'typography',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-container [ngSwitch]="tag">
  <h1 *ngSwitchCase="'h1'" [ngClass]="className">{{ content }}</h1>
  <h2 *ngSwitchCase="'h2'" [ngClass]="className">{{ content }}</h2>
  <h3 *ngSwitchCase="'h3'" [ngClass]="className">{{ content }}</h3>
  <h4 *ngSwitchCase="'h4'" [ngClass]="className">{{ content }}</h4>
  <h5 *ngSwitchCase="'h5'" [ngClass]="className">{{ content }}</h5>
  <h6 *ngSwitchCase="'h6'" [ngClass]="className">{{ content }}</h6>
  <p *ngSwitchCase="'p'" [ngClass]="className">{{ content }}</p>
  <span *ngSwitchCase="'span'" [ngClass]="className">{{ content }}</span>
</ng-container>
`,
  styleUrl: './typography.component.scss'
})
export class TypographyComponent {
  @Input() tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' = 'p';
  @Input() className: string = ''; 
  @Input() content: string = ''; 

  constructor() { }
}
