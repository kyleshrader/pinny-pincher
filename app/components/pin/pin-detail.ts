import {Component, Input} from '@angular/core';
import {ItemSliding} from 'ionic-angular';
import {Pin} from './pin';
import * as storage from 'localforage';

@Component({
    selector: 'pin-detail',
    templateUrl: 'build/components/pin/pin-detail.html'
})

export class PinDetail {
    static lastItem: ItemSliding = null;
    @Input() pin: Pin;

    incrementPin(pin: Pin, slide: ItemSliding) {
        this.modQty(pin, 1);
        
        // Hack to keep item-sliding open
        slide.moveSliding(0);
        slide.endSliding(0);

        // Closes last opened ItemSliding
        if(PinDetail.lastItem && slide != PinDetail.lastItem) {
            PinDetail.lastItem.close();
        }
        PinDetail.lastItem = slide;
    }

    decrementPin(pin: Pin, slide: ItemSliding) {
        this.modQty(pin, -1);
        
        // Hack to keep item-sliding open
        slide.moveSliding(0);
        slide.endSliding(0);

        // Closes last opened ItemSliding
        if(PinDetail.lastItem && slide != PinDetail.lastItem) {
            PinDetail.lastItem.close();
        }
        PinDetail.lastItem = slide;
    }

    modQty(pin: Pin, mod: number) {
        pin.qty += mod;
        storage.setItem(pin.id, pin.qty);
    }
}
