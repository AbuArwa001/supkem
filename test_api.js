const axios = require('axios');

async function testApi() {
    try {
        const res = await axios.get('https://supkem-drf.onrender.com/api/v1/videos/');
        console.log('API Response:', JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.error('API Error:', err.message);
    }
}

testApi();
