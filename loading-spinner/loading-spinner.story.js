import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../.storybook/decorators/section';
import Readme from './README.md';
import LoadingSpinner from './loading-spinner';

storiesOf('Loading', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('LoadingSpinner', () => (
    <Section>
      <LoadingSpinner size={select('size', ['l', 's'])} />
    </Section>
  ));
