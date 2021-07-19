const Resource = require('resources.js');

class LoginResponse extends Resource {
    toArray() {
        return {
            token: this.token,
            firbase_access_token: this.firbaseAccessToken,
            user: {
                id: this.user.id,
                name: this.user.first_name + ' ' + this.user.last_name,
                email: this.user.email,
                usertype: this.type,
                onboarding_complete: this.user.onboarding ? true : false,
                profile_image: this.user.profile_image || null,
                login_count:this.login_count ? this.login_count : 0,
                zoom_authorized:this.ifZoomAuthorized ? this.ifZoomAuthorized.authorize : 0
            }
        }
    }
}

module.exports = LoginResponse;