const Resource = require('resources.js');
const constants = require('../config/constants');

class TutorProfileResponse extends Resource {
    toArray() {
        let dialects = [];
        this.dialects.forEach(async dialect => { dialects.push(dialect.Dialect); });
        let age = Math.abs(new Date(Date.now() - new Date(this.date_of_birth).getTime()).getUTCFullYear() - 1970);
        let data = JSON.parse(JSON.stringify(this));

        return {
            'id': data.id,
            'user_type': 'TUTOR',
            'first_name': data.first_name,
            'last_name': data.last_name,
            'dob':data.date_of_birth,
            'address':data.address,
            'email': data.email,
            'gender': constants.enums[data.gender],
            'contact': data.contact,
            'rating': data.rating,
            'profile_image': this.profile_image || null,
            'state_of_origin': data.StateOfOrigin ? data.StateOfOrigin : null,
            'studied_formally': data.studied_formally ? true : false,
            'approved': data.approved,
            'age': age,
            'dialects': dialects
        }
    }
}

module.exports = TutorProfileResponse;