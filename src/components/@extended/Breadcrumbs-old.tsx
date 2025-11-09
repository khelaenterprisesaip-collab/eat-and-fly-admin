import { CSSProperties, ReactElement, useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

// project-imports
import MainCard from 'components/MainCard';
import navigation from '../../../src/menu-items/index';
import { ThemeDirection } from 'config';

// assets
import { Buildings2, Home3 } from 'iconsax-react';
import ArrowRightIcon from 'assets/svg/ChevronRight';
// types
import { OverrideIcon } from 'types/root';
import { NavItemType } from 'types/menu';
import classes from './Breadcrumbs.module.css';
import NavigateBack from './NavigateBack';
import useAuth from 'hooks/useAuth';

interface BreadcrumbLinkProps {
  title: string;
  to?: string;
  icon?: string | OverrideIcon;
}

export interface BreadCrumbSxProps extends CSSProperties {
  mb?: string;
  bgcolor?: string;
}

interface Props {
  card?: boolean;
  custom?: boolean;
  divider?: boolean;
  heading?: string;
  icon?: boolean;
  icons?: boolean;
  links?: BreadcrumbLinkProps[];
  maxItems?: number;
  rightAlign?: boolean;
  separator?: OverrideIcon;
  title?: boolean;
  titleBottom?: boolean;
  sx?: BreadCrumbSxProps;
  showBackButton?: boolean;
}

// ==============================|| BREADCRUMBS ||============================== //

export default function Breadcrumbs({
  card = false,
  custom = false,
  divider = false,
  heading,
  icon,
  icons,
  links,
  maxItems,
  rightAlign,
  separator,
  title = true,
  titleBottom = true,
  showBackButton = false,
  sx,
  ...others
}: Props) {
  const theme = useTheme();
  const location = useLocation();
  const [main, setMain] = useState<NavItemType | undefined>();
  const [item, setItem] = useState<NavItemType>();
  const [children, setChildren] = useState<any>('');
  const { user } = useAuth();

  const iconSX = {
    marginRight: theme.direction === ThemeDirection.RTL ? 0 : theme.spacing(0.75),
    marginLeft: theme.direction === ThemeDirection.RTL ? theme.spacing(0.75) : 0,
    width: '1rem',
    height: '1rem',
    color: theme.palette.secondary.main
  };

  let customLocation = location.pathname;

  const pathname = useParams();

  // only used for component demo breadcrumbs
  if (customLocation.includes('/components-overview/breadcrumbs')) {
    customLocation = '/apps/customer/customer-card';
  }

  useEffect(() => {
    navigation?.items?.map((menu: NavItemType) => {
      if (menu.type && menu.type === 'group') {
        if (menu?.url && menu.url === customLocation) {
          // setMain(menu);
          // setItem(menu);
        } else {
          getCollapse(menu as { children: NavItemType[]; type?: string });
        }
      }
      return false;
    });
  });

  const getCollapse = (menu: NavItemType) => {
    if (!custom && menu.children) {
      menu.children.filter((collapse: NavItemType) => {
        if (collapse?.children) {
          collapse?.children?.filter((ite: any) => {
            if (
              Object.values(pathname)[0]
                ? customLocation === ite.url?.split(':')[0] + Object.values(pathname)[0]
                : customLocation === ite.url
            ) {
              setMain(menu);
              setItem(collapse);
              setChildren(ite);
            }
          });
        }
        if (collapse.type && collapse.type === 'item') {
          if (customLocation === collapse.url) {
            setMain(menu);
            setItem(collapse);
            setChildren('');
          }
        }
        return false;
      });
    }
  };

  // item separator
  const SeparatorIcon = separator!;
  const separatorIcon = false ? <SeparatorIcon size={12} /> : <ArrowRightIcon className={classes.arrowRight} />;

  let mainContent;
  let itemContent;
  let breadcrumbContent: ReactElement = <Typography />;
  let itemTitle: NavItemType['title'] = '';
  let CollapseIcon;
  let ItemIcon;

  // collapse item
  if (!custom && main && main.type === 'collapse' && main.breadcrumbs === true) {
    CollapseIcon = main.icon ? main.icon : Buildings2;
    mainContent = (
      <Typography
        component={Link}
        to={document.location.pathname}
        variant="body1"
        sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        color={window.location.pathname === main.url ? 'text.secondary' : 'text.primary'}
      >
        {icons && <CollapseIcon style={iconSX} />}
        {main.title}
      </Typography>
    );
    breadcrumbContent = (
      <MainCard
        border={card}
        sx={card === false ? { mb: 3, bgcolor: 'transparent', ...sx } : { mb: 3, ...sx }}
        {...others}
        content={card}
        boxShadow={false}
      >
        <Grid
          container
          direction={rightAlign ? 'row' : 'column'}
          justifyContent={rightAlign ? 'space-between' : 'flex-start'}
          alignItems={rightAlign ? 'center' : 'flex-start'}
          spacing={0.5}
        >
          <Grid item>
            <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems || 8} separator={separatorIcon}>
              <Typography
                component={Link}
                to="/"
                variant="body1"
                sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                color="text.primary"
              >
                {icons && <Home3 style={iconSX} />}
                {icon && !icons && <Home3 variant="Bold" style={{ ...iconSX, marginRight: 0 }} />}
                {(!icon || icons) && 'Home'}
              </Typography>
              {mainContent}
            </MuiBreadcrumbs>
          </Grid>
          {title && titleBottom && (
            <Grid item sx={{ mt: card === false ? 0 : 1 }}>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                {main.title}
              </Typography>
            </Grid>
          )}
        </Grid>
        {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
      </MainCard>
    );
  }

  // items
  if ((item && item.type === 'item') || (item?.type === 'group' && item?.url) || custom) {
    itemTitle = item?.title;
    ItemIcon = item?.icon ? item.icon : Buildings2;
    itemContent = (
      <Typography
        component={Link}
        to={`${item?.url}`}
        variant="body1"
        color="text.secondary"
        sx={{ fontSize: 14, display: 'flex', alignItems: 'center', textDecoration: 'none', fontWeight: 600 }}
      >
        {icons && <ItemIcon style={iconSX} />}
        {itemTitle}
      </Typography>
    );

    const isRootPath = location.pathname?.split('/').length === 2;
    let tempContent = (
      <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems || 8} separator={separatorIcon}>
        <Typography
          component={Link}
          to="/"
          color="text.secondary"
          variant="h6"
          sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 600 }}
        >
          {showBackButton && !isRootPath && <NavigateBack className={classes.arrowBack} />}
          {icons && <Home3 style={iconSX} />}
          {icon && !icons && <Home3 variant="Bold" style={{ ...iconSX, marginRight: 0 }} />}
          {(!icon || icons) && 'Home'}
        </Typography>
        {mainContent}
        {itemContent}
        {children?.title && (
          <Typography variant="body1" textTransform={'capitalize'} fontSize={14} fontWeight={600}>
            {children?.title}
          </Typography>
        )}
      </MuiBreadcrumbs>
    );

    // if (custom && links && links?.length > 0) {
    //   tempContent = (
    //     <MuiBreadcrumbs aria-label="breadcrumb" maxItems={maxItems || 8} separator={separatorIcon}>
    //       {links?.map((link: BreadcrumbLinkProps, index: number) => {
    //         CollapseIcon = link.icon ? link.icon : Buildings2;

    //         return (
    //           <Typography
    //             key={index}
    //             {...(link.to && { component: Link, to: link.to })}
    //             variant="body1"
    //             sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
    //             color={link.to ? 'text.primary' : 'text.secondary'}
    //           >
    //             {link.icon && <CollapseIcon style={iconSX} />}
    //             {link.title}
    //           </Typography>
    //         );
    //       })}
    //     </MuiBreadcrumbs>
    //   );
    // }

    // main
    if (item?.breadcrumbs !== false || custom) {
      breadcrumbContent = (
        <MainCard
          border={card}
          sx={card === false ? { mb: 3, bgcolor: 'transparent', ...sx } : { mb: 3, ...sx }}
          {...others}
          content={card}
          boxShadow={false}
        >
          <Grid
            container
            direction={rightAlign ? 'row' : 'column'}
            justifyContent={rightAlign ? 'space-between' : 'flex-start'}
            alignItems={rightAlign ? 'center' : 'flex-start'}
            spacing={0.5}
          >
            {title && !titleBottom && (
              <Grid item>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {custom ? heading : item?.title}
                </Typography>
              </Grid>
            )}
            <Grid item>{tempContent}</Grid>
          </Grid>
          {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
}
