const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();


const google_verify = async (token = '') => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIET_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const { name, email, picture } = ticket.getPayload();
    return {
        username: name,
        email,
        image: picture
    };
}

module.exports = {
    google_verify
}