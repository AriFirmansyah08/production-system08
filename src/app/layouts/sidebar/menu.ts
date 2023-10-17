import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true,
    category : 'can',
    subCategory : 'maintenance'
  },
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'ri-dashboard-2-line',
    link: "dashboard-maint/",
    category: 'can',
    subCategory: 'maintenance'
  },
  {
    id: 3,
    label: 'MENUITEMS.APPS.TEXT',
    icon: 'ri-recycle-fill',
    link: 'myapps/',
    category: 'can',
    subCategory: 'maintenance'
  },
  {
    id: 4,
    label: 'Maintenance',
    isTitle: true,
    category: 'can',
    subCategory: 'maintenance'
  },
  {
    id: 5,
    label: 'Preventive',
    icon: 'ri-pencil-ruler-2-line',
    category: 'can',
    subCategory: 'maintenance',
    subItems: [
      {
        id: 6,
        label: 'Master Plan',
        link: '/maintenance/master-plan',
        parentId: 5
      },
      {
        id: 7,
        label: 'Schedule Maintenance',
        parentId: 5,
        subItems: [
          {
            id: 8,
            label: 'Monthly',
            link: '/maintenance/monthly',
            parentId: 7
          },
          {
            id: 9,
            label: 'Yearly',
            link: '/maintenance/yearly',
            parentId: 7
          },
        ]
      },
    ]
  },
  {
    id: 16,
    label: 'Issue/ Abnormalitas',
    icon: 'ri-pages-line',
    category: 'can',
    subCategory: 'maintenance',
    subItems: [
      {
        id: 17,
        label: 'KRM',
        link: '/maintenance/krm',
        parentId: 16
      },
      {
        id: 18,
        label: 'Report',
        link: 'list',
        parentId: 16
      },
    ]
  },
  {
    id: 55,
    label: 'Autonomous Maintenance',
    icon: 'ri-account-circle-line',
    category: 'can',
    subCategory: 'maintenance',
    subItems: [
      {
        id: 56,
        label: 'Master Plan',
        parentId: 49,
        link : '/maintenance/master-plan-auto',
      },
      {
        id: 59,
        label: 'Weekly Cone',
        parentId: 49,
        link : '/maintenance/wekly',
      },
    ]
  },
  {
    id: 82,
    label: 'Impravement',
    icon: 'ri-pages-line',
    link: '/maintenance/impravement',
    category: 'can',
    subCategory: 'maintenance',
    
  },
  {
    id: 3,
    label: 'Refresh',
    icon: 'ri-refresh-line',
    link: 'pages/gateway',
    eventCLick:'onRemove',
    category: 'can',
    subCategory: 'maintenance'
  },
  //end menu




  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true,
    category : 'can',
    subCategory : 'production'
  },
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'ri-home-8-line',
    link: "/dashboard-prod",
    category: 'can',
    subCategory: 'production'
  },
  {
    id: 3,
    label: 'MENUITEMS.APPS.TEXT',
    icon: 'ri-apps-2-line',
    link: 'production/myapps',
    category: 'can',
    subCategory: 'production'
  },
  {
    id: 4,
    label: 'production',
    isTitle: true,
    category: 'can',
    subCategory: 'production'
  },
  {
    id: 82,
    label: 'Abnormalitas',
    icon: ' ri-file-excel-line',
    link: 'production/abnormal',
    category: 'can',
    subCategory: 'production',
    
  },
  {
    id: 82,
    label: 'Schedule',
    icon: ' ri-calendar-event-line',
    link: 'production/schedule',
    category: 'can',
    subCategory: 'production',
  },
  {
    id: 55,
    label: 'Report',
    icon: ' ri-mail-send-line',
    category: 'can',
    subCategory: 'production',

    subItems: [
      {
        id: 56,
        label: 'Daily',
        parentId: 49,
        link : 'production/report/daily',
      },
      {
        id: 59,
        label: 'Weekly',
        parentId: 49,
        link : 'production/report/wekly',
      },
      {
        id: 59,
        label: 'Monthly',
        parentId: 49,
        link : 'production/report/montly',
      },
    ]
  },
  {
    id: 3,
    label: 'Refresh',
    icon: 'ri-refresh-line',
    link: '/pages/gateway',
    eventCLick:'onRemove',
    category: 'can',
    subCategory: 'production'
  },


  //all user
  {
    id: 3,
    label: 'Refresh',
    icon: 'ri-refresh-line',
    link: '/pages/gateway',
    eventCLick:'onRemove',
  },
];
