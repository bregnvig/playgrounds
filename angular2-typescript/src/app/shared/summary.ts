import { Observable } from 'rxjs';
import { Rating, Coordinate } from './';

export interface Summary {
  position: Coordinate;
  averageRating?: number;

  getRatings(): Observable<Rating[]>;
  addRating(rating: Rating): void;
}
