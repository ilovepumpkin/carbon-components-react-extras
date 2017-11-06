import React from 'react';
import { configure, setAddon, addDecorator } from '@storybook/react';
import infoAddon from '@storybook/addon-info';
import Container from './Container';

addDecorator(story => <Container story={story} />);
setAddon(infoAddon);

function loadStories() {
  require('../stories/SimpleTable');
}

configure(loadStories, module);
