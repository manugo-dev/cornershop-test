/* eslint-disable @typescript-eslint/naming-convention */
import i18next from 'i18next';

i18next.addResources('en', 'Global', {
  save: 'Save',
  retry: 'Retry',
  cancel: 'Cancel',
  delete: 'Delete',
  dismiss: 'Dismiss',
  noConnection: 'The Internet connection appears to be offline.',
  serverError: 'Something went wrong.'
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
  itemCount: '{{count}} item',
  itemCount_plural: '{{count}} items',
  itemSelected: '{{count}} selected',
  itemSelected_plural: '{{count}} selected',
  refreshCount: '{{count}} time',
  refreshCount_plural: '{{count}} times',
  refreshing: 'Refreshing...',
  couldNotUpdate: 'Couldn’t update “{{title}}” to {{tryValue}}'
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
  couldNotRemove: 'Couldn’t delete {{count}} counter',
  couldNotRemove_plural: 'Couldn’t delete {{count}} counters',
  cannotUndone: 'This cannot be undone.',
  deleteCounter: 'Delete the {{count}} counter?',
  deleteCounter_plural: 'Delete {{count}} counters?',
  share: 'Share {{count}} counter',
  share_plural: 'Share {{count}} counters',
  copy: 'Copy',
  copied: 'Copied ✓'
});
