import { Stack } from '@mui/material';
import { LocationIcon } from 'assets/svg/location';

interface IProps {
  search: string;
  Icon?: any;
  openLink?: boolean;
  showIcon?: boolean;
}

const LocationLink = ({ search, Icon = <LocationIcon />, openLink = true, showIcon }: IProps) => {
  return (
    <Stack component="span" direction="row" alignItems="center" spacing={0.5}>
      {showIcon && Icon}
      <a
        href={`https://www.google.com/maps/place/${search}`}
        onClick={(event) => {
          if (!openLink) {
            event.preventDefault();
          }
        }}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: 'inherit',
          color: 'inherit',
          cursor: openLink ? 'pointer' : 'default'
        }}
      >
        {search}
      </a>
    </Stack>
  );
};

export default LocationLink;
