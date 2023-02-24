const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
// const credentials = require('./credentials.json');
const { google } = require('googleapis')


const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());

const googleAuth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file'],
  });
  
  const client = googleAuth.getClient();  
  const spreadsheetId = '1YyBdycKWKtudLbhHL6fax3zuVyjzODxIvAywEkOb7hs'

  const googleSheets = google.sheets({
    version: "v4",
    auth: client,
  });

app.post('/receive', async(req, res) =>{
    try {
        // const user = await UserAttribute.create(req.body);
        const { name, email, phone, skills, message } = req.body;
        const createSpreadsheet = await googleSheets.spreadsheets.values.append({
          auth: googleAuth,
          spreadsheetId,
          range: 'Sheet1!A:H',
          valueInputOption: 'USER_ENTERED',
          resource: {
            values: [
              [
                name,
                email,
                phone,
                skills,
                message
              ],
            ],
          },
        });
       
        res.status(201).json({
          message: "Application submitted successfully ",
        })
      } catch (error) {
        console.error(error);
        res.status(400).json({
          status: 'false',
          message: 'not found',
        });
      }



    });

const PORT = 3005;
app.listen(PORT, ()=>{
    console.log(`Server connected successfully ${PORT}`)
})

module.exports = { 
    app 
};