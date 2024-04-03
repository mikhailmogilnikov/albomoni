import { LoginWidget } from '@albomoni/features/auth/login';
import { Logo } from '@albomoni/shared/ui/logo';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { PiXBold } from 'react-icons/pi';

export const LoginPage = () => {
  const navigate = useRouter();

  const handleClick = () => {
    navigate.back();
  };

  return (
    <main className='flex flex-col gap-6 items-center px-4 md:justify-center min-h-dvh md:bg-[--element] pb-4'>
      <div className='w-full md:absolute top-0 flex justify-between p-1 pt-6 md:p-10'>
        <button
          type='button'
          aria-label='Logo'
          onClick={handleClick}
          className='w-[132px] flex items-center justify-center'
        >
          <Logo />
        </button>
        <Button
          onPress={handleClick}
          radius='full'
          size='md'
          isIconOnly
          className='md:bg-[--bg]'
        >
          <PiXBold size={20} />
        </Button>
      </div>

      <LoginWidget />
    </main>
  );
};
