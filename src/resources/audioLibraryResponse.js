const Resource = require('resources.js');
const moment = require('moment')

class AudioLibraryResponse extends Resource {
    toArray() {
        return {
            id: this.id,
            custom_name: this.custom_name ,
            audio_link: this.audio_link,
            duration: this.duration,
            added_at: moment(this.createdAt).format('YYYY-MM-DD')
        }
    }
}

module.exports = AudioLibraryResponse;