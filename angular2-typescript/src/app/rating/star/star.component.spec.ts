/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {StarComponent} from './star.component';

describe('Component: Star', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarComponent],
    });
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(StarComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should give fa-star, when the rating is equal to or above expected rating', () => {
    const fixture = TestBed.createComponent(StarComponent);
    const component = fixture.componentInstance;

    component.expectedRating = 1;
    component.rating = 1;
    expect(component.ratingCSSClass).toBe('fa-star');
    component.rating = 1.1;
    expect(component.ratingCSSClass).toBe('fa-star');
    component.rating = 2;
    expect(component.ratingCSSClass).toBe('fa-star');
    component.rating = 0.9;
    expect(component.ratingCSSClass).not.toBe('fa-star');
  });
});
