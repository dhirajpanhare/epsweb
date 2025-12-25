// Quick test script to check if API is working
// Run with: node test-api.js

const testAPI = async () => {
  try {
    console.log('🔄 Testing API endpoint...');
    console.log('URL: http://localhost:3002/email/fetch?limit=5');
    
    const response = await fetch('http://localhost:3002/email/fetch?limit=5');
    
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    const data = await response.json();
    
    console.log('\n✅ Response received:');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log(`\n✅ SUCCESS! Fetched ${data.count} emails`);
    } else {
      console.log('\n❌ API returned success: false');
      console.log('Error:', data.message);
    }
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nPossible issues:');
    console.error('1. Backend server not running (run: cd backend && npm run dev)');
    console.error('2. Wrong port (check if backend is on port 3002)');
    console.error('3. Network/firewall issue');
  }
};

testAPI();
