import { useTheme } from '@emotion/react';
import useSignIn from './hooks/useSignIn';

function SignIn() {
  const theme = useTheme();
  const { register, handleSubmit, errors, isValid, apiError, validationRules } = useSignIn();

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            이메일
            <input
              type="email"
              placeholder="email@example.com"
              {...register('email', validationRules.email)}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px',
                marginTop: '4px',
                border: errors.email ? '1px solid red' : '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
          {errors.email && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            비밀번호
            <input
              type="password"
              placeholder="password"
              {...register('password', validationRules.password)}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px',
                marginTop: '4px',
                border: errors.password ? '1px solid red' : '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </label>
          {errors.password && (
            <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: isValid ? theme.colors.primary : theme.colors.disabled,
            color: isValid ? 'white' : '#666',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isValid ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s'
          }}
        >
          로그인
        </button>
      </form>

      {apiError && (
        <p style={{ color: 'red', marginTop: '16px', textAlign: 'center', fontWeight: 'bold' }}>{apiError}</p>
      )}
    </div>
  );
}

export default SignIn;
