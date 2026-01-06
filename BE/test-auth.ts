import fetch from 'node-fetch'

const API_URL = 'http://localhost:5000/api/v1/auth'

const testAuth = async () => {
  try {
    console.log('🧪 Starting Auth Test...')

    // 1. Register
    const email = `test${Date.now()}@gmail.com`
    const password = 'password123'

    console.log(`\n1. Testing Register with email: ${email}`)
    const registerRes = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email,
        password
      })
    })

    const registerData = await registerRes.json()
    console.log('Status:', registerRes.status)
    if (registerRes.status === 201) {
      console.log('✅ Register Success')
      console.log('Token:', registerData.token ? 'Received' : 'Missing')
    } else {
      console.log('❌ Register Failed:', registerData)
    }

    // 2. Login
    console.log(`\n2. Testing Login`)
    const loginRes = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      })
    })

    const loginData = await loginRes.json()
    console.log('Status:', loginRes.status)
    if (loginRes.status === 200) {
      console.log('✅ Login Success')
      console.log('Token:', loginData.token ? 'Received' : 'Missing')
    } else {
      console.log('❌ Login Failed:', loginData)
    }
  } catch (error) {
    console.error('❌ Test Error:', error)
  }
}

testAuth()
