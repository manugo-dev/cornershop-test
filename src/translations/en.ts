/* eslint-disable @typescript-eslint/naming-convention */
import i18next from 'i18next';

i18next.addResources('en', 'Global', {
  retry: 'Retry',
  cancel: 'Cancel',
  delete: 'Delete'
});

i18next.addResources('en', 'Welcome', {
  title: 'Welcome to Counters',
  description: 'Capture cups of lattes, frapuccinos, or anything else that can be counted.',
  getStarted: 'Get started'
});

i18next.addResources('en', 'Counters', {
  searchCounters: 'Search Counters',
  cancel: 'Cancel'
});

i18next.addResources('en', 'CounterList', {
  noCounters: 'No counters yet',
  noResults: 'No results',
  couldNotLoad: 'Couldn’t load the counters',
  noConnection: 'The Internet connection appears to be offline.',
  itemCount: '{{count}} item',
  itemCount_plural: '{{count}} items',
  itemSelected: '{{count}} selected',
  itemSelected_plural: '{{count}} selected',
  refreshCount: '{{count}} time',
  refreshCount_plural: '{{count}} times',
  refreshing: 'Refreshing...'
});

i18next.addResources('en', 'CreateCounter', {
  createTitle: 'Create counter',
  examplesTitle: 'Examples',
  examplesDescription: 'Select an example to add it to your counters.',
  name: 'Name',
  exampleHelp: 'Give it a name. Creative block? See',
  exampleLink: 'examples'
});

i18next.addResources('en', 'CounterActions', {
  cannotUndone: 'This cannot be undone.',
  deleteCounter: 'Delete the {{count}} counter?',
  deleteCounter_plural: 'Delete {{count}} counters?'
});
