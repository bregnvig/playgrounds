import { Coordinate } from './coordinate';

export interface Playground {
  id: string;
  name: string;
  addressDescription?: string;
  description?: string;
  position: Coordinate;
}
