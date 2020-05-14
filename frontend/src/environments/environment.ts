// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    baseUrl: 'http://localhost:8080',
    mocks: {
        enable: false
    },
    googleUrl: 'http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:4500/oauth2/redirect',
    facebookUrl: 'http://localhost:8080/oauth2/authorize/facebook?redirect_uri=http://localhost:4500/oauth2/redirect',
    uploadFilesConstants: {
      maxSize: 1000000, // 1MB
      type: [
        'image/png',
        'image/jpeg',
        'application/pdf'
      ]
    },
    stripePublicKey: 'pk_test_9Zm8AgUQZqBLJSRUAWORwZZv009NV5VilC'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// TODO: oauth2/authorize
///
