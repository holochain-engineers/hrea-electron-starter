import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import { ApolloClientOptions } from '@apollo/client/core'

import { AppComponent } from './app.component';
import { ConnectionService } from './services/connection.service';
import { HreaComponent } from './content/hrea.component';

export function initializeConnection(connectionService: ConnectionService) {
  return (): Promise<any> => { 
    return connectionService.init();
  }
}

export function createApollo(conn:ConnectionService): ApolloClientOptions<any> {
  return conn.apolloOptions
}

@NgModule({
  exports: [ApolloModule],
  declarations: [
    AppComponent,
    HreaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: APP_INITIALIZER, 
      useFactory: initializeConnection, 
      deps: [ConnectionService], 
      multi: true
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [ConnectionService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
