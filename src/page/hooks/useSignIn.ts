import { useAuth } from '../../context/AuthContext';
import { LOCALSTORAGE_KEYS, ROUTE_PATHS } from '../../Constant';
import { userAPI } from '../../api/user.api';
import type { IUser } from '../../Types';
import { authAPI } from '../../api/auth.api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/validation';

interface SignInFormData {
  email: string;
  password: string;
}

export default function useSignIn() {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [apiError, setApiError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTE_PATHS.DASHBOARD);
      return;
    }
  }, [isLoggedIn, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<SignInFormData>({
    mode: 'onChange',
    defaultValues: {
      email: 'test@test.com',
      password: 'password123'
    }
  });

  const onSubmit = async (data: SignInFormData) => {
    setApiError('');

    try {
      const response = await authAPI.signIn({
        email: data.email,
        password: data.password
      });

      localStorage.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
      localStorage.setItem(LOCALSTORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);

      const userInfo = (await userAPI.getUser()) as IUser;
      login(userInfo, { accessToken: response.accessToken, refreshToken: response.refreshToken });

      navigate(ROUTE_PATHS.DASHBOARD);
      console.log('Sign-in successful:', response);
    } catch (error) {
      console.error('Sign-in error:', error);
      setIsModalOpen(true);
      setApiError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    }
  };

  return {
    action: {
      register,
      handleSubmit: handleSubmit(onSubmit)
    },
    state: {
      errors,
      isValid,
      apiError,
      isModalOpen,
      setIsModalOpen
    },
    validationRules: {
      email: {
        required: '이메일을 입력해주세요.',
        pattern: {
          value: EMAIL_REGEX,
          message: '올바른 이메일 형식이 아닙니다.'
        }
      },
      password: {
        required: '비밀번호를 입력해주세요.',
        minLength: {
          value: 8,
          message: '비밀번호는 최소 8자 이상이어야 합니다.'
        },
        maxLength: {
          value: 24,
          message: '비밀번호는 최대 24자 이하여야 합니다.'
        },
        pattern: {
          value: PASSWORD_REGEX,
          message: '비밀번호는 영문, 숫자를 모두 포함해야 합니다.'
        }
      }
    }
  };
}
