import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { SubMenuItem } from 'src/app/core/models/menu.model';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterLinkActive, RouterLink, Router } from '@angular/router';
import { NgFor, NgTemplateOutlet, NgIf, CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@core/services/language.service';

@Component({
  selector: 'div[navbar-submenu]',
  templateUrl: './navbar-submenu.component.html',
  styleUrls: ['./navbar-submenu.component.scss'],
  standalone: true,
  imports: [NgFor, NgTemplateOutlet,CommonModule, RouterLinkActive, RouterLink, NgIf, AngularSvgIconModule,TranslateModule],
})
export class NavbarSubmenuComponent implements OnInit {
  currentLang!: string;
  @Input() public submenu = <SubMenuItem[]>{};
  @ViewChild('submenuRef') submenuRef: ElementRef<HTMLDivElement> | undefined;
 
  constructor(private languageService: LanguageService,private router:Router) {
    this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }
  translate:TranslateService = inject(TranslateService);

  ngOnInit(): void {}

  onItemClick(item: any) {
    this.translate.use(item.prefix)
    this.languageService.setLanguage(item.prefix);
    this.languageService.initializeLanguage(item.prefix);
    const currentUrl = this.router.url.split('/').slice(2).join('/');
    this.router.navigate([`/${item.prefix}/${currentUrl}`]);
  }



  ngAfterViewInit() {

    if (this.submenuRef) {
      const submenu = this.submenuRef.nativeElement.getBoundingClientRect();
      const bounding = document.body.getBoundingClientRect();

      if (submenu.right > bounding.right) {
        const childrenElement = this.submenuRef.nativeElement.parentNode as HTMLElement;
        if (childrenElement) {
          childrenElement.style.left = '-100%';
        }
      }
    }
  }
}
