const axios = require('axios');

async function checkFile() {
    const url = 'https://supkem-drf.onrender.com/media/video_briefings/A_ENT_NET.mp4';
    try {
        console.log(`Checking URL: ${url}`);
        const res = await axios.head(url);
        console.log('Status:', res.status);
        console.log('Headers:', res.headers);
    } catch (err) {
        console.error('Error fetching file:', err.message);
        if (err.response) {
            console.log('Response Status:', err.response.status);
        }
    }
}

checkFile();
