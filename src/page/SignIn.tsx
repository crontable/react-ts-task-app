import useSignIn from './hooks/useSignIn';

function SignIn() {
  const {
    form: { email, setEmail, password, setPassword },
    state: { error },
    action: { requestSignIn }
  } = useSignIn();

  return (
    <div>
      <form onSubmit={requestSignIn}>
        <label>
          이메일
          <input
            name="email"
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          비밀번호
          <input
            name="password"
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">로그인</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SignIn;
