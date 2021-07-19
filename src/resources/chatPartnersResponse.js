const Resource = require('resources.js');

class ChatPartnersResponse extends Resource {
    toArray() {
        return {
            id: this.id,
            name: `${this.first_name} ${this.last_name}`,
            firebase_uid: this.firebase_uid,
            profile_image: this.profile_image || null
        }
    }
}

module.exports = ChatPartnersResponse;