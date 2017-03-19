import { FinplanAngularPage } from './app.po';

describe('finplan-angular App', () => {
  let page: FinplanAngularPage;

  beforeEach(() => {
    page = new FinplanAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
