import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    // {
    //   group: 'DASHBOARD.BASE',
    //   separator: false,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/chart-pie.svg',
    //       label: 'DASHBOARD.DASHBOARD',
    //       route: '/dashboard',
    //       children: [
    //         { label: 'DASHBOARD.NFTS', route: '/dashboard/nfts' },
    //       ],
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/lock-closed.svg',
    //       label: 'DASHBOARD.AUTH',
    //       route: '/auth',
    //       children: [
    //         { label: 'DASHBOARD.SIGN_UP', route: '/auth/sign-up' },
    //         { label: 'DASHBOARD.SIGN_IN', route: '/auth/sign-in' },
    //         { label: 'DASHBOARD.FORGOT_PASSWORD', route: '/auth/forgot-password' },
    //         { label: 'DASHBOARD.NEW_PASSWORD', route: '/auth/new-password' },
    //         { label: 'DASHBOARD.TWO_STEPS', route: '/auth/two-steps' },
    //       ],
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/exclamation-triangle.svg',
    //       label: 'DASHBOARD.ERRORS',
    //       route: '/errors',
    //       children: [
    //         { label: '404', route: '/errors/404' },
    //         { label: '500', route: '/errors/500' },
    //       ],
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/cube.svg',
    //       label: 'DASHBOARD.COMPONENTS',
    //       route: '/components',
    //       children: [{ label: 'Table', route: '/components/table' }],
    //     },
    //   ],
    // },
    {
      group: 'JOB_APPLICATION.TITLE',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'JOB_APPLICATION.LISTING',
          route: '/en/list/job-application',
        }
      ],
    },
    // {
    //   group: 'GROUPS.TITLE',
    //   separator: true,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/download.svg',
    //       label: 'GROUPS.SUBTITLE',
    //       route: '/en/groups/groups',
    //     }
    //   ],
    // },
    
    // {
    //   group: 'GLOBAL.CONFIGURATION',
    //   separator: false,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/chart-pie.svg',
    //       label: 'DASHBOARD.CONFIG',
    //       children: [
    //         { label: 'CONFIG.JOB_TYPE', route: '/en/config/job-types' },
    //         { label: 'CONFIG.SHIFT_TIMING', route: '/en/config/shift-timings' },
    //         { label: 'CONFIG.ID_TYPE', route: '/en/config/id-types' },
    //         { label: 'CONFIG.ACADEMIC', route: '/en/config/academic-qualifications' },
    //         { label: 'CONFIG.LANGUAGE_LEVELS', route: '/en/config/language-levels' },
    //         { label: 'CONFIG.CLOTHES_SIZES', route: '/en/config/clothes-sizes' },
    //         { label: 'CONFIG.DOC_TYPES', route: '/en/config/doc-types' },
    //         { label: 'CONFIG.AVAILABILITIES', route: '/en/config/availabilities' },
    //         { label: 'CONFIG.RATING_TYPES', route: '/en/config/rating-types' },
    //       ],
    //     },

    //   ],
    // },
    // {
    //   group: 'DASHBOARD.LANGUAGE',
    //   separator: false,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/lang.svg',
    //       label: 'DASHBOARD.ARABIC',
    //       prefix:'ar'
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/lang.svg',
    //       label: 'English',
    //       prefix:'en'
    //     }
    //   ],
    // },
  ];
}
