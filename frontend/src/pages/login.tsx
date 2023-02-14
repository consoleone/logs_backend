import Input from '../components/Input';
import Password from '../components/Password';
import InputWrapper from '../components/InputWrapper';
import { useState } from 'react';
import { login } from '../api/logger';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [cred, setCred] = useState({ id: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='absolute -translate-y-32 text-4xl font-bold text-gray-700 dark:text-gray-200'>
        Login
      </h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await login(cred.id, cred.password).then((res) => {
            // if (res.status === 200) {
            //   setMessage('Login Successful');
            //   setError(false);
            // } else {
            //   setMessage('Login Failed');
            //   setError(true);
            // }
            navigate('/');
          });
        }}
      >
        <InputWrapper id='Id' label='Id'>
          <Input
            id='Id'
            type='Id'
            placeholder='Enter Id'
            onChange={(e) => setCred((val) => ({ ...val, id: e.target.value }))}
          />
        </InputWrapper>
        <InputWrapper id='password' label='Password'>
          <Password
            id='password'
            onChange={(e) =>
              setCred((val) => ({ ...val, password: e.target.value }))
            }
          />
        </InputWrapper>
        <button
          type='submit'
          className='mt-4 w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none'
        >
          Login
        </button>
        {message && (
          <p className={error ? 'text-red-500' : 'text-green-500'}>{message}</p>
        )}
      </form>
    </div>
  );
}

export default Login;
