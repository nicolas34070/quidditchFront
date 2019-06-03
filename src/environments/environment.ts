// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urls: {
    baseApiUrl: 'http://quidditchback.test/index.php/api/', // put the name of the back here.
    rootApi: 'http://quidditchback.test/index.php/',
    secureApi: 'http://quidditchback.test/index.php/api/secure/' ,
  },
    pusher: {
      production: false,
      key: 'f10c12b986ae3569359d',
    },
  client_id: '1_5w8zrdasdafr4tregd454cw0c0kswcgs0oks40s',
  client_secret: 'sdgggskokererg4232404gc4csdgfdsgf8s8ck5s'

};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
