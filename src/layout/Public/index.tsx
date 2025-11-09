import { Outlet } from 'react-router-dom';
import Header from 'layout/Simple/Header';

// ==============================|| LAYOUT - BLANK PAGES ||============================== //

export default function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
