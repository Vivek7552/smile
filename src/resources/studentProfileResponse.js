const Resource = require('resources.js');
const constants = require('../config/constants');

class StudentProfileResponse extends Resource {
    toArray() {
        return {
            'id': this.id,
            'user_type': 'STUDENT',
            'first_name': this.first_name,
            'last_name': this.last_name,
            'email': this.email,
            'profile_image': this.profile_image || null,
            'tutor_preference': constants.enums[this.tutor_preference],
            'level': constants.enums[this.level],
            'plan': {
                'plan_id': 1,
                'plan_name': 'Free Trial',
                'plan_expiry': '2021-12-31 23:59:59'
            }
        }
    }
}

module.exports = StudentProfileResponse;