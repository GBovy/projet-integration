export const environment = {
    production: true,
    baseUrl: '',
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
    stripePublicKey: ''
};
