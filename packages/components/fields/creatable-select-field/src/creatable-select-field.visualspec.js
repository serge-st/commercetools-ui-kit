import percySnapshot from '@percy/puppeteer';

describe('CreatableSelectField', () => {
  beforeAll(async () => {
    await page.goto(`${globalThis.HOST}/creatable-select-field`);
  });

  it('Default', async () => {
    await expect(page).toMatch('State');
    await percySnapshot(page, 'CreatableSelectField');
  });
});
