const otpTemplate = (otp)=>{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>One Tap Verification Code</title>
        <style>
            body {
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
    
            .message {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 18px;
                margin-bottom: 20px;
            }
    
            .otp {
                font-size: 28px;
                font-weight: bold;
                color: #0070f3; 
            }
            .support {
                font-size: 16px;
                color: #999999;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="message">OTP Verification Email</div>
            <div class="body">
                <p>Dear User,</p>
                <p>Please use the following OTP
                    (One-Time Password) to verify your account:</p>
                <h2 class="otp">${otp}</h2>
                <p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
                    Once your account is verified, you will have access to our platform and its features.</p>
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                href="mailto:onetap1729@gmail.com">onetap1729@gmail.com</a>. We are here to help!</div>
        </div>
    </body>
    </html>`;
};

module.exports = otpTemplate;