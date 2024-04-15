import { Button } from '@nextui-org/button';
import {
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Dropdown,
} from '@nextui-org/dropdown';
import Link from 'next/link';
import {
  PiCaretDownBold,
  PiCaretRightBold,
  PiCurrencyRubBold,
  PiMapPinBold,
  PiTranslateBold,
  PiUserBold,
} from 'react-icons/pi';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { Avatar } from '@nextui-org/avatar';
import { ChangeThemeButton } from './change-theme-button';

export const MenuAside = () => {
  const { isLogged, user } = useSession();

  return (
    <aside className='w-full tablet:w-80 flex-shrink-0 flex flex-col gap-4'>
      {isLogged ? (
        <Link href='/unauth'>
          <div className='w-full h-16 flex gap-4 items-center'>
            <Avatar
              isBordered
              src={user?.avatar && (user.avatar as any)}
              icon={<PiUserBold size={24} className='opacity-50' />}
              className='w-14 h-14 m-1 flex-shrink-0'
              classNames={{
                base: 'ring-black/10 dark:ring-white/10 ring-[3px] ring-offset-[3px]',
              }}
            />
            <div className='flex flex-col gap-1 justify-between w-full h-full'>
              <p className='text-lg font-bold'>{user?.first_name}</p>
            </div>
          </div>
        </Link>
      ) : (
        <Link href='/login'>
          <button
            type='button'
            className='w-full h-12 bg-gradient-to-r rounded-2xl from-blue-300 to-indigo-400 dark:from-blue-500 dark:to-indigo-400 text-white shadow-lg shadow-blue-400/40 font-semibold hover:scale-105 active:scale-95 transition-transform'
          >
            Вход и регистрация
          </button>
        </Link>
      )}

      <div className='flex gap-4'>
        <Dropdown
          backdrop='blur'
          placement='bottom'
          classNames={{ backdrop: 'bg-white/30 dark:bg-black/30' }}
        >
          <DropdownTrigger>
            <Button className='w-full h-28 bg-[--bg] dark:bg-[--element] shadow-base rounded-3xl flex flex-col gap-0 items-start justify-between p-4 relative overflow-clip'>
              <div className='flex flex-col gap-0 justify-start items-start'>
                <p className='font-semibold text-md'>Язык</p>
                <p className='font-semibold text-md opacity-60'>Русский</p>
              </div>

              <PiCaretDownBold size={20} />

              <PiTranslateBold
                size={80}
                className='absolute -bottom-2 -right-2 flex-shrink-0 !max-w-full opacity-10'
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            closeOnSelect={false}
            disallowEmptySelection
            selectionMode='single'
            selectedKeys={new Set(['ru'])}
            aria-label='Language selector'
          >
            <DropdownItem key='ru'>Русский</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown
          backdrop='blur'
          placement='bottom'
          classNames={{ backdrop: 'bg-white/30 dark:bg-black/30' }}
        >
          <DropdownTrigger>
            <Button className='w-full bg-[--bg] dark:bg-[--element] shadow-base h-28 rounded-3xl flex flex-col gap-0 items-start justify-between p-4 relative'>
              <div className='flex flex-col gap-0 justify-start items-start'>
                <p className='font-semibold text-md'>Валюта</p>
                <p className='font-semibold text-md opacity-60'>RUB</p>
              </div>

              <PiCaretDownBold size={20} />

              <PiCurrencyRubBold
                size={80}
                className='absolute -bottom-2 -right-2 flex-shrink-0 !max-w-full opacity-10'
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            closeOnSelect={false}
            disallowEmptySelection
            selectionMode='single'
            selectedKeys={new Set(['rub'])}
            aria-label='Currency selector'
          >
            <DropdownItem key='rub'>RUB</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <ChangeThemeButton />

      <Button className='w-full h-28 bg-[--bg] dark:bg-[--element] shadow-base rounded-3xl flex flex-col gap-0 items-start justify-between p-4 relative overflow-clip'>
        <div className='flex flex-col gap-0 justify-start items-start'>
          <p className='font-semibold text-md'>
            Регион отображаемых объявлений
          </p>
          <p className='font-semibold text-md opacity-60'>Турция, Анкара</p>
        </div>

        <PiCaretRightBold size={20} />

        <PiMapPinBold
          size={80}
          className='absolute -bottom-2 -right-2 flex-shrink-0 !max-w-full opacity-10'
        />
      </Button>
    </aside>
  );
};