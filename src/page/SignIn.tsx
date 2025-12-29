import useSignIn from './hooks/useSignIn';
import * as S from './SignIn.styles';

function SignIn() {
  const { register, handleSubmit, errors, isValid, apiError, validationRules } = useSignIn();

  return (
    <S.Container>
      <S.Title>로그인</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.FormField>
          <S.Label>
            이메일
            <S.Input
              type="email"
              placeholder="email@example.com"
              hasError={!!errors.email}
              {...register('email', validationRules.email)}
            />
          </S.Label>
          {errors.email && <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>}
        </S.FormField>

        <S.FormField>
          <S.Label>
            비밀번호
            <S.Input
              type="password"
              placeholder="password"
              hasError={!!errors.password}
              {...register('password', validationRules.password)}
            />
          </S.Label>
          {errors.password && <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>}
        </S.FormField>

        <S.SubmitButton type="submit" disabled={!isValid} isValid={isValid}>
          로그인
        </S.SubmitButton>
      </S.Form>

      {apiError && <S.ApiErrorMessage>{apiError}</S.ApiErrorMessage>}
    </S.Container>
  );
}

export default SignIn;
