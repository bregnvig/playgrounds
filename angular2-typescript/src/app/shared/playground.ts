import { Coordinate } from './coordinate';

export interface Playground {
  id: number;
  name: string;
  addressDescription?: string;
  description?: string;
  position: Coordinate;
}
