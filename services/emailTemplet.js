module.exports = function generateEmailTemplate({
	emailFrom,
	downloadLink,
	fileSize,
	expiresIn,
}) {
	return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Poppins', sans-serif;
          }
          .container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #eaeaea;
            border-radius: 8px;
            background-color: #ffffff;
          }
          .header {
            text-align: center;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 20px;
          }
          .content {
            font-size: 16px;
            line-height: 1.6;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
            color: #555555;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #3490dc;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            File Share
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>You have received a file from <strong>${emailFrom}</strong>.</p>
            <p><a href="${downloadLink}" class="button">Download File</a></p>
            <p>File Size: ${fileSize}mb</p>
            <p>Expires in: ${expiresIn}</p>
          </div>
          <div class="footer">
            <p>Thank you for using our service.</p>
          </div>
        </div>
      </body>
      </html>
    `;
};