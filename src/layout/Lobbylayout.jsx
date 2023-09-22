import { Outlet } from 'react-router-dom';

const Lobbylayout = () => {
  return (
    <main className='w-screen h-screen bg-violet-900 flex flex-col justify-center items-center'>
      <Outlet />
    </main>
  );
};
export default Lobbylayout;
