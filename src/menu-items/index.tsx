// project import
import dashboard from './dashboard';
// import support from './support';

// types
import { NavItemType } from 'types/menu';
import pages from './pages';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [pages]
};

export default menuItems;
