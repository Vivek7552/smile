
const TutorSlotService = require('../services/TutorSlotService');
const DayService= require('../services/DayService');



exports.allocateSlots = async (tutor_id) => {
    let days = await DayService.getDays({attributes:['id','day']});
    let slots = [18,19,20,21]
        for(let day of days) {
            await TutorSlotService.updateSlots(tutor_id,slots,day.id);
        }
  
    
}