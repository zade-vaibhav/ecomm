const otpGenerator = require('otp-generator');

const generateOTP=async()=>{

    const otpOptions = {
        digits: 6,          // Length of the OTP
        upperCase: false,   // Include uppercase letters (optional)
        specialChars: false, // Include special characters (optional)
        alphabets: false,   // Include alphabets (optional)
      };
    
      // Generate the OTP
      const otp = otpGenerator.generate(otpOptions);
      
      return otp;
}



module.export=generateOTP