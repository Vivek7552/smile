const Resource = require('resources.js');

class SlotResponse extends Resource {
    toArray() {
        return {
            id: this.slot_id,
            start_time: this.start_time,
            end_time:this.end_time,
            available_for_booking: this.available_for_booking == 1 ? true :false
        }
    }
}


module.exports = SlotResponse;
