import { ContactForm } from '@albomoni/widgets/contact-form';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa6';

export const ContactTeam = () => {
  return (
    <div className='w-full h-min flex flex-col gap-10 mt-6'>
      <h2 className='text-2xl font-bold'>Связаться с командой</h2>
      <p className='font-medium opacity-50 -mt-6'>
        Нашли баг? Есть предложение? Дайте нам знать!
      </p>
      <div className='flex gap-4 -mt-6 w-full max-w-[700px]'>
        <Button color='primary' size='lg' fullWidth as={Link} href=''>
          <FaTelegram size={30} />
        </Button>
        <Button
          color='success'
          size='lg'
          fullWidth
          as={Link}
          target='_blank'
          href='https://chat.whatsapp.com/GOrS9One2zI4zaFLhXtbqQ'
        >
          <FaWhatsapp size={30} />
        </Button>
      </div>
      <ContactForm />
    </div>
  );
};
