const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const docusign = require('docusign-esign')
const fs = require('fs');


const rsaKey = fs.readFileSync("./private.key")
async function getAccessToken() {
  console.log(rsaKey)
  const apiClient = new docusign.ApiClient();
  apiClient.setOAuthBasePath('account-d.docusign.com');
  const responsekuch = await apiClient.requestJWTUserToken("98adbbf9-9ddd-44c2-a57b-300b01a94262","283cd2ff-8883-4f96-a0b9-8fe0f9af721e","signature",rsaKey,6000)
  console.log(responsekuch.body.access_token)
  const results2 = await apiClient.getUserInfo(responsekuch.body.access_token);
  console.log(results2)
  // load env vars
}
//getAccessToken()
dotenv.config({ path: './config/config.env' });

// Connect to database
//connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname)));


const PORT = process.env.PORT || 80;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

app.use('/api/v1/embedd1', require('./routes/docsign1'));
app.use('/api/v1/embedd2', require('./routes/docsign2'));