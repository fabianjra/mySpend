// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//Se agrega la configuracion de Firebase, para la conexion a Authentication.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCB49NEHTGTqEaB0Oh9tGycE9URWN6PqVs",
    authDomain: "myspend-4753e.firebaseapp.com",
    projectId: "myspend-4753e",
    storageBucket: "myspend-4753e.appspot.com",
    messagingSenderId: "374491335160",
    appId: "1:374491335160:web:780e25313a3b56f86fee0d"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
