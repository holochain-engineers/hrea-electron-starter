import { Injectable } from "@angular/core";
import bindSchema, { autoConnect, APIOptions, DNAIdMappings } from '@valueflows/vf-graphql-holochain'
import { ApolloClientOptions, ApolloClient, InMemoryCache } from '@apollo/client/core'
import { SchemaLink } from '@apollo/client/link/schema';
import { environment } from '@environment'; 


@Injectable({
  providedIn: "root"
})
export class ConnectionService {
  dnaConfig!: DNAIdMappings;
  conductorUri!: string;
  apolloOptions!: ApolloClientOptions<any>


  async init(){
    const conn = await autoConnect("ws://localhost:"+environment.APP_CONDUCTOR_PORT, "hrea_suite").catch(this.onSocketFail)
    if (conn){
      this.dnaConfig = conn.dnaConfig
      this.conductorUri = conn.conductorUri
      //console.log("here",this.dnaConfig,this.conductorUri)
      const options:APIOptions = { dnaConfig: conn.dnaConfig, conductorUri: conn.conductorUri } 
      const schema = await bindSchema(options)

      this.apolloOptions =  {
        cache: new InMemoryCache(),
        link: new SchemaLink({schema}),
        defaultOptions: {
          watchQuery: {
          errorPolicy: 'all'
          }
        }
      };
    }
  }

  onSocketFail(reason:any){
    console.error("holochain websocket connection failed... ",reason)
  }
}