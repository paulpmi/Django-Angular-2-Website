import { PersonalWebsitePage } from './app.po';

describe('personal-website App', () => {
  let page: PersonalWebsitePage;

  beforeEach(() => {
    page = new PersonalWebsitePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
