import { Component, OnInit, inject } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobilecomponent';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@core/services/language.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [
        AngularSvgIconModule,
        NavbarMenuComponent,
        ProfileMenuComponent,
        NavbarMobileComponent,
    ],
})
export class NavbarComponent implements OnInit {
  currentLang!: string;
  constructor(private menuService: MenuService,private languageService: LanguageService,private router:Router) {
    this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
  translate:TranslateService = inject(TranslateService);

  translateText(lang:string) {
    this.translate.use(lang)
    this.languageService.setLanguage(lang);
    this.languageService.initializeLanguage(lang);
    const currentUrl = this.router.url.split('/').slice(2).join('/');
    this.router.navigate([`/${lang}/${currentUrl}`]);
  }
}
