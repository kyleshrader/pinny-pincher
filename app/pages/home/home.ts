import {Component} from '@angular/core';
import {Pin} from '../../components/pin/pin';
import {PinDetail} from '../../components/pin/pin-detail';
import * as _ from 'underscore';
import * as storage from 'localforage';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [PinDetail]
})

export class HomePage {
  private PINS: Pin[] = [{
    id: 'megaman',
    name: 'WEST MegaMan',
    desc: 'Booth 214',
    sets: ['WEST','2016'],
    thumb: 'https://pinnypals.com/imgs/pin_megaman.png',
    qty: 1
  },
  {
    id: 'megaman',
    name: 'EAST MegaMan',
    desc: 'Booth 214',
    sets: ['EAST','2016'],
    thumb: 'https://pinnypals.com/imgs/pin_megaman.png',
    qty: 0
  },
  {
    id: 'megaman',
    name: 'W15 MegaMan',
    desc: 'Booth 214',
    sets: ['WEST','2015'],
    thumb: 'https://pinnypals.com/imgs/pin_megaman.png',
    qty: -1
  },
  {
    id: 'megaman',
    name: 'E15 MegaMan',
    desc: 'Booth 214',
    sets: ['EAST','2015'],
    thumb: 'https://pinnypals.com/imgs/pin_megaman.png',
    qty: 0
  },
  {
    id: 'megaman',
    name: 'MegaMan',
    desc: 'Booth 214',
    sets: ['WEST','2016'],
    thumb: 'https://pinnypals.com/imgs/pin_megaman.png',
    qty: 0
  },
  {
    id: 'emily',
    name: 'Emily',
    desc: 'Booth 212',
    sets: ['WEST','2015'],
    thumb: 'https://pinnypals.com/imgs/pin_emily.png',
    qty: 0
  }];

  pins: Pin[];
  filters: string[] = [];
  constructor() {
    this.PINS.forEach((pin) => {
      storage.getItem(pin.id).then((value: number) => {
        pin.qty = value;
      }).catch((err) => {
        pin.qty = 0;
      })
    })
    this.pins = this.PINS;
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
    });
  }
}
