import { Spinner } from '@nextui-org/spinner';

export default function Loading() {
  return (
    <div className='w-dvw h-dvh flex justify-center items-center pb-40'>
      <Spinner />
    </div>
  );
}
