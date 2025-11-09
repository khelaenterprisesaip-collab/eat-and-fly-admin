// @ts-nocheck
import { Link } from "react-router-dom";
import { To } from "history";

// material-ui
import ButtonBase from "@mui/material/ButtonBase";
import { SxProps } from "@mui/system";
import logo from "assets/images/Smart Global__2_-removebg-preview.png";
import newLogo from "assets/images/Smart Global__4_-removebg-preview.png";
import logo2 from "assets/images/app/newlogo.png";

// project-imports
import Logo from "./LogoMain";

import useAuth from "hooks/useAuth";
import { APP_DEFAULT_PATH } from "config";
import Avatar from "components/@extended/Avatar";
import LogoIcon from "./LogoIcon";
import LogoSvg from "assets/svg/header";
import NewLogo from "components/newLogo";

interface Props {
  isIcon?: boolean;
  sx?: SxProps;
  to?: To;
}

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection({ isIcon, sx, to }: Props) {
  const { isLoggedIn } = useAuth();

  return (
    <ButtonBase
      disableRipple
      {...(isLoggedIn && {
        component: Link,
        to: !to ? APP_DEFAULT_PATH : to,
        sx,
      })}
    >
      {!isIcon ? (
        <NewLogo />
      ) : (
        <a
          className="flex items-center space-x-2 text-primary hover:text-primary-light transition-smooth group"
          href="/"
        >
          <div className="p-1.5 bg-[#334735] rounded-lg shadow-soft group-hover:shadow-glow transition-smooth">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-plane h-6 w-6 text-white"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
            </svg>
          </div>
        </a>
      )}
    </ButtonBase>
  );
}
