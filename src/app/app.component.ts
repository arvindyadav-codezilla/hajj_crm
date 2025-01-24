import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { LanguageService } from '@core/services/language.service';
import { ThemeService } from '@core/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { ResponsiveHelperComponent } from '@shared/components/responsive-helper/responsive-helper.component';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, RouterOutlet, ResponsiveHelperComponent, NgxSonnerToaster],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hajj-crm-frontend';

  constructor(private languageService: LanguageService, private route: ActivatedRoute,private router: Router,public themeService: ThemeService) {}
  translate:TranslateService = inject(TranslateService);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const lang = params.get('lang') || localStorage.getItem('lang') || 'en'; 
      this.languageService.initializeLanguage(lang);  
    });

    this.router.events.subscribe(() => {
      const lang = this.router.url.split('/')[1]; 

      if (lang) {
        this.translate.use(lang)
        this.languageService.setLanguage(lang);
      }
    });
  }
}
