'use client';

import { UserAvatar } from '@albomoni/entities/user';
import { getUserAsync } from '@albomoni/entities/user/api/get-user';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { PiCaretRightBold } from 'react-icons/pi';

export const ProfileUser = () => {
  const token = getCookie('token');
  console.log(token);
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserAsync(token as string),
  });

  return (
    data && (
      <div className='w-full flex flex-row gap-2 md:gap-4'>
        <div className='w-20 h-20 lg:w-28 lg:h-28 flex-shrink-0 p-2'>
          <UserAvatar src={data.avatar} isSubscribed={data.subscription} />
        </div>
        <div className='w-full flex flex-col justify-center'>
          <h3 className='text-xl md:text-2xl font-semibold'>
            {data.first_name}
          </h3>

          {data.subscription ? (
            <button type='button' className='flex gap-2 items-center '>
              <p className='font-medium text-primary'>Albomoni Pro</p>
              <PiCaretRightBold size={16} className='mt-[2px] text-primary' />
            </button>
          ) : (
            <button
              type='button'
              className='flex gap-2 items-center opacity-50'
            >
              <p className='font-medium'>Стандартный аккаунт</p>
              <PiCaretRightBold size={16} className='mt-[2px]' />
            </button>
          )}
        </div>
      </div>
    )
  );
};
