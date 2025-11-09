import { Method } from 'axios';

export interface ApiEndpoint {
  uri: string;
  version: string;
  method: Method;
  headerProps?: Record<string, string>;
}
