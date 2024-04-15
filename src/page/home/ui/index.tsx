import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { Spacer } from '@nextui-org/spacer';
import { AdsList } from '@albomoni/widgets/ads-list';
import { AdsListSkeleton } from '@albomoni/widgets/ads-list/ui/skeleton';
import { CategoriesList } from './categories-list';
import { WelcomeBlock } from './welcome-block';
import { CategoriesListSkeleton } from './categories-list/skeleton';
import { HomeAdsList } from './ads-list';

export const HomePage = async ({ lng }: I18nLangParam) => {
  const cookie = cookies().get('token');

  return (
    <main className='flex flex-col items-center z-10 pb-40'>
      {!cookie?.value ? <WelcomeBlock /> : <Spacer className='h-6' />}

      <Suspense fallback={<CategoriesListSkeleton />}>
        <CategoriesList lng={lng} />
      </Suspense>

      <Spacer className='h-14' />

      <div className='w-full max-w-7xl px-4'>
        <Suspense fallback={<AdsListSkeleton />}>
          <HomeAdsList lng={lng} />
        </Suspense>
      </div>
    </main>
  );
};
