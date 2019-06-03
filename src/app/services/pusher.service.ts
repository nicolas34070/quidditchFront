import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';
import {environment} from '../../environments/environment';

// this is here to discourage the instantianting of pusher any where its
// needed, better to reference it from one place
@Injectable()
export class PusherService {
  private pusher: any;

  constructor() {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: 'eu',
      encrypted: true
    });
  }
  // any time it is needed we simply call this method
  getPusher() {
    return this.pusher;
  }

}
