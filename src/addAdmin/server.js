const admin = require('firebase-admin');

// Service account JSON object
const serviceAccount = {
  "type": "service_account",
  "project_id": "nandhi-farms-final-project",
  "private_key_id": "1f5565e0eedc199f96691585ea7fab0378418e26",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCZt9HU53ktAmOp\nHvBM6sLmMYRS6DDNNlu3JwGdrQzxo1LniMWPDyVtQyGkW/J0KfTDEYRy9D8bd7Pw\nhGhzNgK/rFh4cLH0OOInNX0iakBtWy1ACtRpv/+WPjkLkyjgxyTUa2IzG8cIqRea\ndn5IdbkZphpEXMbBnHjyX9PM7NuJSaXYWApN9GbYCnKMILpKctM1OXg5iN4FQwRg\nxNrr+ud1KABroNLGn+EEv24LLK37jH/Pbp1YFusTwXEqEOVXLu+q18D8RdLDaP4g\nK/4Z2Y5mYALTDACP4MiJvVOFbKn7vVxNlnS3pSpg1o5Y4fNHs8kJ6qRL7yWio5uI\nEypN/Br7AgMBAAECggEABTP7iY7T0BbnUHqoT81kdaee0hjJsH1S1mmFSWG2cSY1\nMK21YWKPj3OFwhfz2XdWfkg4aPtLRYukNUbUeEEPdihujpXivob/lKv5Uj7LDOIl\nfA6OldopwkHVHkcUmG/1MOF5OSY+cu5L5IhDo87XfWUQOSWNlR3ndCDG1p/JZvJG\ndzm4IoTzCmNywCR89G3d9/As26ZnVxbmYD3daplR4xc0Ui+fq02qVEDndla8/JSK\nImb6T1B0Rwn1NJwtI5aOQ+dAYxUXAfzSIw4tB3++jpoIWxSg5iGl3bY5dr8Lz/iY\n9WMg4JSoE5eNOeJDUZrKK3bwzO1s7FvGKFMtmPrhyQKBgQDVEyE1YNdWaDsMQUfv\nDcdkTGzQ0A2PKufW2d8GS+rLw2N5Lnv7FgUApNA0jDQBv6rezWcneWRkGsNu/JrF\ngszZ4E0/NQxOx2c0N1oSCm4VX7XW7kVoCE1xEHERQ7cbvZFLCZcnVZipCHSDCt+S\ndjahS0rQMOM39zMxcbvBLuWQswKBgQC4r383ryqp07RyxME9hO7USnjZJerP69XP\nTnvWTYKuvZYE7RVNhoNmTG1qrRM5Z7VqhWFV3pAjTJwSYkuanJj88B1TGuUfOmEe\n8Q7wFEUSTMYO0mq2uUwvHy4kKathvb/xOzdwUIy8N/Z8X4dhcfrVM56QKN50F//q\nwzNVNSTgmQKBgQCioCskdnlkdcE7pUel6TpaDwquhV0T/IdesINMZv0Z8FMn1pbC\nGRhQWXqf4LKA8y0TSGqG8lvxG4w2VY47WY3IbS4IJBD0v7TBYc3ZHyTOI3LCTLGk\nqVGSDh5+MtS604DlaLh5SRdvTAjBS7dALgGcMb80D1wdBwuHnWrUE1sbiQKBgE7s\nuNosInhW/6t4R/ipYYMZnFF4McPPThz8tlFb6HgSjxTl2I+751WFXdETy75hgpbW\nD0WqCkD7kUsN9K9LMtoNJwsH2FijEzQs4ixZDTeH1bAp3e7eex88HPTZVeM8OtW1\nb7iww6P/6nc2P9213vLTz3Rd8sr8IqLJ7psAThUpAoGATRJVEzVtn4n9h38aitmi\numoMZZSsUlMDg5o8eRp2P+gp6KZDBwDvFutnha7mppgx0jnPdlAW/VGFjCa8kIcx\nVkk0fHjqGb/Rn8nGxkYJv9Ql0e/epmgePCanWowUkFs2RFjno2qbaRj2cU9bHEcw\n6eT3tWdX1tuRCNV6AY97++w=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-r7fba@nandhi-farms-final-project.iam.gserviceaccount.com",
  "client_id": "101980212763463486364",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-r7fba%40nandhi-farms-final-project.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Initialize the Firebase Admin SDK with your service account key and other config options
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  apiKey: "AIzaSyCZxsvSbDLPE8URMw12zz8ZD9BTXt6Ezg8",
  authDomain: "nandhi-farms-final-project.firebaseapp.com",
  projectId: "nandhi-farms-final-project",
  storageBucket: "nandhi-farms-final-project.appspot.com",
  messagingSenderId: "424930833911",
  appId: "1:424930833911:web:cace3c12910b699e586af2",
  measurementId: "G-M4D8T09SP6"
});

// User ID to make admin (replace with your actual user ID)
const userIdToMakeAdmin = '6yySMI05R3RHDgejg2O4GhQgQtN2';

// Set custom claim to make a user an admin
admin.auth().setCustomUserClaims(userIdToMakeAdmin, { admin: true })
  .then(() => {
    // Custom claim set successfully
    console.log('User is now an admin');
  })
  .catch(error => {
    // Handle error
    console.error('Error making user admin:', error);
  });
  admin.auth().verifyIdToken("eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2MGI5ZGUwODBmZmFmYmZjMTgzMzllY2Q0NGFjNzdmN2ZhNGU4ZDMiLCJ0eXAiOiJKV1QifQ.eyJhZG1pbiI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL25hbmRoaS1mYXJtcy1maW5hbC1wcm9qZWN0IiwiYXVkIjoibmFuZGhpLWZhcm1zLWZpbmFsLXByb2plY3QiLCJhdXRoX3RpbWUiOjE2OTMxMjU4NzEsInVzZXJfaWQiOiI2eXlTTUkwNVIzUkhEZ2VqZzJPNEdoUWdRdE4yIiwic3ViIjoiNnl5U01JMDVSM1JIRGdlamcyTzRHaFFnUXROMiIsImlhdCI6MTY5MzEyNTg3MSwiZXhwIjoxNjkzMTI5NDcxLCJlbWFpbCI6InBhdG5hbGF0ZWphYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsicGF0bmFsYXRlamFhQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.kHoB3gqbOOOzA_Pqjb7wFXk96m7kksv3lgTP7K0Kdu8uImav8LBrtZ1J4G2ESdNhMkN0Ok0H2YHu_z5Lc6-LsQmTnZUf66oir80SL4wYFWCwYtWfcDXVlSwk6Mzj4JMYHVIcCbDa4ssXiqhjhz6_pZHJC5pv0-DB8MnTO10J9MVGzqlTfZhy_APP7XbP0paTo9o0FzHFRIMjNbE-HnEcw07rBZ3x5VsjmFdelYjyRdujhcTLAgrL3oOTijQ4qw1V4R9990ENz3eNf5IS3SCsdTouBYqb2KSvrPQA_zarU9mUo8LAdq6tgfrZOEwscubTZlk16hEahrYfaAP2bslQcg")
  .then(decodedToken => {
    if (decodedToken.admin === true) {
      console.log('User is an admin');
      // Perform admin-specific actions
    } else {
      console.log('User is not an admin');
      // Handle non-admin user
    }
  })
  .catch(error => {
    // Handle error
    console.error('Error verifying ID token:', error);
  });

