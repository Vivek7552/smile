const Slot = require('../models/Slot');

exports.getAllSlots = (attributes) => {
    return Slot.getAllSlots(attributes);
}

exports.getSlot = (id) => {
    return Slot.getSlot(id);
}

