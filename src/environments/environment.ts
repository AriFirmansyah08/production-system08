export const environment_example = {
  production: false,
  defaultauth: 'fackbackend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  },
};

export const environment= {
  //API URL
    API_URL: 'http://localhost:8880/api/',
    AUTH_URL: 'http://localhost:8880/api/auth/',
    Time_URL: 'http://localhost:8880/api/time',
  //Api Login
    login: 'login',

  //API Applications
    applications: 'master/application',
    applicationId: 'master/application/',

  //API User APPS
    userApp: 'master/user-app',
    userAppId: 'master/user-app/',

  //API Images
    image: 'master/image/',
    Image_abnormal: 'master/image_abnormal/',
    Image_user: 'master/image_user/',

    getImage: 'image/',
    getImageAbnormal: 'image/abnormal/',
    getImageUser: 'image/user/',
    refreshToken: 'update-token',

  //API daily Report
    daily: 'master/daily_report',
    dailyId: 'master/daily_report/',
    leader: 'master/leaders',

  //API Abnormal
  abnormal:'master/abnormal',
  abnormalId:'master/abnormal/',
  
  //API History.
  history:'master/history',
  historyId:'master/history/',

  //API Schedule
  schedule:'master/schedule',
  scheduleId:'master/schedule/',

    //API Weekly
    weekly:'master/weekly',
    weeklyId:'master/weekly/',

    activity:'master/activity',
    activityId:'master/activity/'

};

