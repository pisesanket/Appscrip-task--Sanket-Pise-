import { useState } from 'react';
import { useRouter } from 'next/router';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignUp = async () => {
        const response = await fetch('https://fakestoreapi.com/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token); 
            router.push('/');
        } else {
          
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
}

export default SignUp;
