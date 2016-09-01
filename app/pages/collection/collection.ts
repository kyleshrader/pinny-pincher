import {Component} from '@angular/core';
import {Pin} from '../../components/pin/pin';
import {PinDetail} from '../../components/pin/pin-detail';
import * as _ from 'underscore';
import * as storage from 'localforage';

declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

var pinJson = require('../../pins.json');

@Component({
  templateUrl: 'build/pages/collection/collection.html',
  directives: [PinDetail]
})

export class CollectionPage {
  private PINS: Pin[] = <Pin[]> pinJson;

  pins: Pin[];
  filters: string[] = [];
  constructor() {
    this.PINS.forEach((pin) => {
      storage.getItem(pin.id).then((value: number) => {
        pin.qty = value;
      }).catch((err) => {
        pin.qty = 0;
      });
    });
    this.filter(['2016']);
  }
  
  toggleFilter(filter: string) {
    let filters: string[] = [].concat(filter);
    this.filters = _.difference(this.filters, filters).concat(_.difference(filters, this.filters));
    this.update();
  }

  addFilter(filter: string) {
    let filters: string[] = [].concat(filter);
    this.filters = _.union(this.filters, filters);
    this.update();
  }

  removeFilter(filter: string) {
    let filters: string[] = [].concat(filter);
    this.filters = _.difference(this.filters, filters);
    this.update();
  }

  update() {
    this.filter(this.filters);
  }

  filter(filter: string[]) {
    this.pins = this.PINS.filter(pin => {
      return filter.every(filter => {
        return (pin.sets.indexOf(filter) >= 0);
      });
    }).reverse();
  }
}
