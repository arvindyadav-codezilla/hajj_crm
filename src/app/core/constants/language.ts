import { MenuItem } from '../models/menu.model';

export class Language {
  public static pages: MenuItem[] = [

 
    
   
    {
      group: 'DASHBOARD.LANGUAGE',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/lang.svg',
          label: 'DASHBOARD.ARABIC',
          prefix:'ar'
        },
        {
          icon: 'assets/icons/heroicons/outline/lang.svg',
          label: 'English',
          prefix:'en'
        }
      ],
    },
  ];
}
