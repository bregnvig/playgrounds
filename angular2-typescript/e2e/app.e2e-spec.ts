import { PlaygroundsPage } from './app.po';

describe('playgrounds App', function() {
  let page: PlaygroundsPage;

  beforeEach(() => {
    page = new PlaygroundsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
