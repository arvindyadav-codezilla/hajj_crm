import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core'; // Import TranslateService

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();

  constructor(
    private router: Router,
    private translateService: TranslateService 
  ) {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string): void {
    this.currentLang.next(lang);
    localStorage.setItem('lang', lang);

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr'); 

    if (!this.router.url.startsWith(`/${lang}`)) {
    //   this.router.navigate([`/${lang}/home`]); 
    }

    this.translateService.use(lang); 
  }

  getCurrentLanguage(): string {
    return this.currentLang.value;
  }

  initializeLanguage(lang: string): void {
    this.setLanguage(lang);
  }
}
