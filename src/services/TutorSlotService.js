const TutorSlot = require('../models/TutorSlotAssociation');


exports.updateSlots  = async(tutor_id,slots,day_id)=>{
   return await TutorSlot.updateAssociationDetails(tutor_id,slots,day_id);
}