let responseCode = {
    "1000": "User account with this email doesn't exist",
    "1001": "User account with this email already exists",
    "1002": "Incorrect or missing parameters",
    "1003": "Server error",
    "1004": "Password mismatch",
    "1005": "Account is not verified",
    "1006": "Incorrect Otp",
    "1007": "User could not be created",
    "1008": "Something is not right!",
    "1009": "Pending Approval",
    "1010": "Tutor not assigned",
    "1011": "Audio does not exist",
    "1012": "User declined app authorization",


    "2000": "Login successfull",
    "2001": "User registered successfully & Otp Sent to user on email",
    "2002": "User onboarding completed",
    "2003": "Data found successfully",
    "2004": "Data created successfully",
    "2005": "Data updated successfully",
    "2006": "Data deleted successfully",
    "2007": "Status changed successfully",
    "2008": "Something went wrong! Try again later",
    "2010": "OTP matched, account verified",
    "2011": "Payment plans",
    "2012": "Profile data",
    "2013": "No user found",
    "2014": "Image could not be uploaded",
    "2015": "Profile image updated",
    "2016": "Chat partners",
    "2017": "Student profile details updated",
    "2018": "Tutor profile details updated",
    "2019": "Slots",
    "2020": "Available Slots",
    "2021": "Slots Updated successfully",
    "2022": "Testimonials",
    "2023": "Audio added to library successfully",
    "2024": "List of audios",
    "2025": "Audio details updated",
    "2026": "Audio recording removed from library",
    "2027": "User authorized app successfully",
    "2028": "Meeting Created successfully",
    "2029": "Meeting list of student",
    "2030": "Meeting list of tutor",
    "2031": "Audio already added to library",
}

let enums = {
    'STUDENT': "Student",
    'TUTOR': "Tutor",
    'MALE': "Male",
    'FEMALE': "Female",
    'EITHER': 'Any',
    'BEGINNER': 'Beginner',
    'INTERMEDIATE': 'Intermediate',
    'ADVANCED': 'Advanced'
}

let result = {
    "response_code": responseCode,
    "enums": enums
}
module.exports = result;