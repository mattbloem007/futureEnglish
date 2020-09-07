import Auth0Lock from 'auth0-lock';

export default class Auth {

    lock = new Auth0Lock('Qy7y5utJXi9uKlwT962PTeDXFTmXCJvu', 'future-eng.us.auth0.com', {

            auth: {
                audience: 'https://future-eng.us.auth0.com/api/v2/',
                redirectUrl: 'http://localhost:8000/us/callback',
                responseType: 'token id_token',
                params: {
                    scope: 'openid email profile'
                }
            }
        }
    ).on('authenticated', function(authResult) {

        if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult);
            // use authResult.idTokenPayload for profile information
        }
    });

    setSession(authResult) {

        debugger
    }

    login() {

        this.lock.show()
    }
}
