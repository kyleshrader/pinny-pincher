import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {CollectionPage} from './pages/collection/collection';


@Component({
  templateUrl: 'build/app.html'
})
export class MyApp {

  private rootPage: any = CollectionPage

  constructor(private platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
