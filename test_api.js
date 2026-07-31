const axios = require('axios');

async function testApi() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/videos/`);
        console.log('API Response:', JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.error('API Error:', err.message);
    }
}

testApi();
