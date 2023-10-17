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
    getImage: 'image/',
    refreshToken: 'update-token',

  //API daily Report
    daily: 'master/daily_report',
    dailyId: 'master/daily_report/',
    leader: 'master/leaders',

  //API Abnormal
  
  
};

