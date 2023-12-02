exports.forgetPasswordTemplate = (password)=>{
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

            .para1{
                color: red;
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
                <p>Password for recovering your account is:</p>
                <h2 class="otp">${password}</h2>
                <p class="para1">Warning: Don't forward this email to anybody as it leads loosing your account.</p>
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                href="mailto:onetap1729@gmail.com">onetap1729@gmail.com</a>. We are here to help!</div>
        </div>
    </body>
    </html>`;
};

module.exports = forgetPasswordTemplate;