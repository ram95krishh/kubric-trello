import Noty from 'noty';

export default function notyNotification(header, text, type, layout = 'topRight', timeout = 4000) {
  new Noty({
    type,
    layout,
    theme: 'metroui',
    text,
    header,
    timeout,
    closeWith: ['click', 'button'],
    animation: {
      open: 'noty_effects_open',
      close: 'noty_effects_close',
    },
    queue: 'global',
  }).show();
}
