'use client';

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { PasswordVisibilityButton } from '@albomoni/shared/ui/password-visibility-button/ui';
import { Input } from '@nextui-org/input';
import { Divider } from '@nextui-org/divider';
import { Spinner } from '@nextui-org/spinner';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PiUserBold } from 'react-icons/pi';
import { useCookies } from 'react-cookie';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@albomoni/shared/ui/button';
import { LoginQueries } from '../../api';
import {
  LoginCheckSchema,
  LoginCheckSchemaFormData,
} from '../../model/schemas';

export const LoginWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useClientTranslation('forms');
  const { mutateAsync, isPending, isSuccess } = useMutation(LoginQueries);
  const [, setToken] = useCookies(['token']);

  const { control, handleSubmit } = useForm<LoginCheckSchemaFormData>({
    resolver: yupResolver(LoginCheckSchema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;

    const query = {
      username: email,
      password,
    };

    try {
      const response = await mutateAsync(query);
      const { access } = response;

      setToken('token', access);
    } catch {
      return;
    }
  });

  return (
    <div className='w-full max-w-[420px] flex flex-col shadow-medium bg-[--bg] rounded-2xl overflow-clip'>
      <h2 className='text-lg font-bold px-6 py-6'>Войдите в аккаунт</h2>
      <AnimatePresence>
        {isPending || isSuccess ? (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='h-[244px] flex justify-center items-center'
          >
            <Spinner />
          </m.div>
        ) : (
          <form
            className='w-full flex flex-col z-20 shadow-sm'
            onSubmit={onSubmit}
          >
            <div className='flex flex-col gap-4 px-6'>
              <Controller
                name='email'
                control={control}
                render={({
                  field: { onChange, value, onBlur, ref, name },
                  fieldState: { invalid, error },
                }) => (
                  <Input
                    id={name}
                    type={name}
                    errorMessage={invalid && t(`${error?.message}`)}
                    size='lg'
                    placeholder='Электронная почта'
                    classNames={{ input: 'px-2 text-sm' }}
                    onChange={onChange}
                    value={value || ''}
                    onBlur={onBlur}
                    ref={ref}
                  />
                )}
              />
              <Controller
                name='password'
                control={control}
                render={({
                  field: { onChange, value, onBlur, ref, name },
                  fieldState: { invalid, error },
                }) => (
                  <Input
                    id={name}
                    type={isVisible ? 'text' : name}
                    errorMessage={invalid && t(`${error?.message}`)}
                    endContent={
                      <PasswordVisibilityButton
                        isVisible={isVisible}
                        toggleVisibility={toggleVisibility}
                      />
                    }
                    size='lg'
                    placeholder='Пароль'
                    classNames={{ input: 'px-2 text-sm' }}
                    onChange={onChange}
                    value={value || ''}
                    onBlur={onBlur}
                    ref={ref}
                  />
                )}
              />
              <button
                type='button'
                className='text-sm text-start opacity-60 underline mt-4'
              >
                Забыли пароль?
              </button>
            </div>
            <div className='px-6 py-4 flex justify-end'>
              <Button
                type='submit'
                size='md'
                onPress={onSubmit}
                color='primary'
              >
                Войти
              </Button>
            </div>
          </form>
        )}
      </AnimatePresence>
      <Divider />
      <div className='flex flex-col pt-4 px-6 pb-6 bg-[--element] gap-4 relative z-10'>
        <h3 className='font-semibold mt-1 z-10'>У Вас ещё нет профиля?</h3>
        <p className='text-sm opacity-60 z-10'>
          Получите доступ к размещению объявлений и другим возможностям
          платформы, пройдя быструю регистрацию.
        </p>
        <Button
          size='md'
          color='primary'
          variant='flat'
          className='mt-2 z-10 backdrop-blur-sm font-semibold dark:text-blue-200'
        >
          Зарегистрироваться
        </Button>
        <PiUserBold
          size={250}
          className='absolute -bottom-9 -right-10 z-0 opacity-5'
        />
      </div>
    </div>
  );
};
