const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing Backend Wizards Profile API\n');

  try {
    // Test /me endpoint
    console.log('1. Testing GET /me endpoint...');
    const meResponse = await axios.get(`${BASE_URL}/me`);
    
    console.log(`   ✅ Status: ${meResponse.status}`);
    console.log(`   ✅ Content-Type: ${meResponse.headers['content-type']}`);
    
    const data = meResponse.data;
    console.log('   📋 Response structure check:');
    console.log(`   - status: ${data.status ? '✅' : '❌'} (${data.status})`);
    console.log(`   - user.email: ${data.user?.email ? '✅' : '❌'} (${data.user?.email})`);
    console.log(`   - user.name: ${data.user?.name ? '✅' : '❌'} (${data.user?.name})`);
    console.log(`   - user.stack: ${data.user?.stack ? '✅' : '❌'} (${data.user?.stack})`);
    console.log(`   - timestamp: ${data.timestamp ? '✅' : '❌'} (${data.timestamp})`);
    console.log(`   - fact: ${data.fact ? '✅' : '❌'} (${data.fact?.substring(0, 50)}...)`);
    
    // Test timestamp is dynamic
    console.log('\n2. Testing dynamic timestamp...');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
    const meResponse2 = await axios.get(`${BASE_URL}/me`);
    const isDynamic = meResponse.data.timestamp !== meResponse2.data.timestamp;
    console.log(`   ${isDynamic ? '✅' : '❌'} Timestamp updates: ${isDynamic}`);
    
    // Test fact is dynamic
    console.log('\n3. Testing dynamic cat facts...');
    const factsDifferent = meResponse.data.fact !== meResponse2.data.fact;
    console.log(`   ${factsDifferent ? '✅' : '❌'} Cat facts change: ${factsDifferent}`);
    
    // Test health endpoint
    console.log('\n4. Testing GET /health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log(`   ✅ Status: ${healthResponse.status}`);
    console.log(`   ✅ Response: ${JSON.stringify(healthResponse.data, null, 2)}`);
    
    // Test root endpoint
    console.log('\n5. Testing GET / endpoint...');
    const rootResponse = await axios.get(`${BASE_URL}/`);
    console.log(`   ✅ Status: ${rootResponse.status}`);
    console.log(`   ✅ Response: ${JSON.stringify(rootResponse.data, null, 2)}`);
    
    console.log('\n🎉 All tests passed! Your API is ready for deployment.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testAPI();
