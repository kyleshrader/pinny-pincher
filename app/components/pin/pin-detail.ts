import {Component, Input} from '@angular/core';
import {Pin} from './pin';

@Component({
    selector: 'pin-detail',
    templateUrl: 'build/components/pin/pin-detail.html'
})

export class PinDetail {
    @Input() pin: Pin;

    incrementPin(pin: Pin) {
        pin.qty++;
    }

    decrementPin(pin: Pin) {
        pin.qty--;
    }
}
