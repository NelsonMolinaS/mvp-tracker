import { useState, FormEvent } from 'react';
import { User, Lock, Eye, EyeOff, LogIn, AlertCircle } from '@styled-icons/feather';
import loginLogo from '@/assets/thanatos.png';
import { useAuth } from '@/contexts/AuthContext';

import {
  Container,
  Card,
  LogoWrapper,
  Title,
  Subtitle,
  Form,
  InputGroup,
  Label,
  InputContainer,
  IconLeft,
  IconRight,
  Input,
  ErrorAlert,
  SubmitButton,
} from './styles';

export function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError(true);
    }
  }

  return (
    <Container>
      <Card>
        <LogoWrapper>
          <img src={loginLogo} alt='Continental MVP' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
        </LogoWrapper>

        <Title>Continental MVP</Title>
        <Subtitle>Please sign in to access the MVP Tracker</Subtitle>

        <Form onSubmit={handleSubmit}>
          {error && (
            <ErrorAlert>
              <AlertCircle size={18} />
              <span>Invalid username or password</span>
            </ErrorAlert>
          )}

          <InputGroup>
            <Label htmlFor='username'>Username</Label>
            <InputContainer>
              <IconLeft>
                <User size={18} />
              </IconLeft>
              <Input
                id='username'
                type='text'
                placeholder='Enter username'
                value={username}
                onChange={(e) => {
                  setError(false);
                  setUsername(e.target.value);
                }}
                required
                autoFocus
              />
            </InputContainer>
          </InputGroup>

          <InputGroup>
            <Label htmlFor='password'>Password</Label>
            <InputContainer>
              <IconLeft>
                <Lock size={18} />
              </IconLeft>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter password'
                value={password}
                onChange={(e) => {
                  setError(false);
                  setPassword(e.target.value);
                }}
                required
              />
              <IconRight
                type='button'
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </IconRight>
            </InputContainer>
          </InputGroup>

          <SubmitButton type='submit'>
            <LogIn size={20} />
            <span>Sign In</span>
          </SubmitButton>
        </Form>
      </Card>
    </Container>
  );
}
