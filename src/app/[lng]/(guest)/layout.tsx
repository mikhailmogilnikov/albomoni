'use client';

import { useValidateToken } from '@albomoni/shared/api/use-validate-token';
import { Spinner } from '@nextui-org/spinner';
import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function GuestLayout({ children }: Props) {
  const { isLogged, isPending } = useValidateToken();

  if (isPending) {
    return (
      <div className='w-dvw h-dvh flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  if (isLogged) {
    redirect('/');
  }

  return children;
}
