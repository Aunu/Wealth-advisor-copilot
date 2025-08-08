import { animate, state, style, transition, trigger } from '@angular/animations';

export const expandCollapse = trigger('expandCollapse', [
  state('collapsed', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
  state('expanded', style({ height: '80vh', opacity: 1 })),
  transition('collapsed <=> expanded', animate('300ms ease'))
]);