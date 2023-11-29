import { MenuItem } from './menu.model';



export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true,
    category : 'can',
    subCategory : 'maintenance'
  },
  //end Menu

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
    id: 2,
    label: 'Dashboard Backup',
    icon: 'ri-home-8-line',
    link: "/dashboard-backup",
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
    id: 3,
    label: 'Users',
    icon: ' ri-user-line',
    link: 'production/user',
    category: 'can',
    subCategory: 'production',
    role_id: 1,
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
    id: 55,
    label: 'Schedule',
    icon: ' ri-calendar-event-line',
    category: 'can',
    subCategory: 'production',

    subItems: [
      {
        id: 56,
        label: 'Calendar',
        parentId: 49,
        link : 'production/schedule/calendar',
      },
      {
        id: 59,
        label: 'Tabel',
        parentId: 49,
        link : 'production/schedule/tabel',
      },
    ]
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
        subItems: [
          {
            id: 56,
            label: 'Proses',
            parentId: 49,
            link : 'production/report/daily/proses',
          },
          {
            id: 56,
            label: 'Activity',
            parentId: 49,
            link : 'production/report/daily/activity',
          },
        ]
      },

      {
        id: 59,
        label: 'Weekly',
        parentId: 49,
        subItems: [
          {
            id: 56,
            label: 'Activity',
            parentId: 49,
            link : 'production/report/wekly/activity',
          },
          {
            id: 56,
            label: 'Rakor MOM',
            parentId: 49,
            link : 'production/report/wekly/rakor',
          },
        ]
      },

      {
        id: 59,
        label: 'Montly',
        parentId: 49,
        subItems: [
          {
            id: 56,
            label: 'pending Job',
            parentId: 49,
            link : 'production/report/montly/pendingjob',
          },
          {
            id: 56,
            label: 'Planning',
            parentId: 49,
            link : 'production/report/montly/planning',
          },

          {
            id: 56,
            label: 'Resume',
            parentId: 49,
            link : 'production/report/montly/resume',
          },
        ]
      },

    ]
  },

  {
    id: 2,
    label: 'Kartu Stock',
    icon: ' ri-settings-3-line',
    link: 'kartustock',
    eventCLick:'onRemove',
    category: 'can',
    subCategory: 'production',
    role_id: 1,
  },
  {
    id: 2,
    label: 'machine',
    icon: ' ri-settings-3-line',
    link: 'production/machine',
    eventCLick:'onRemove',
    category: 'can',
    subCategory: 'production',
    role_id: 1,
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
