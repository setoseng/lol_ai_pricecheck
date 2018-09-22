import React, { Component } from 'react';
import Artyom from 'artyom.js';
import {ApiAiClient} from "api-ai-javascript";

import ResultStatement from './result';

class Layout extends Component {
  constructor(props){
    super(props);

    this.state = {
      theResult: 'Hello, My name is Ash',
      input: '',
      itemID:'none'
    };

    this.client = new ApiAiClient({accessToken: "585cfd962bea4e58bc07e568b69615a8"});
    this.artyom = new Artyom();
  }
  componentDidMount(){
    var mythis = this;
    // Add a single command

    var commandHello = {
        smart:true,
        indexes:["okay Ash *"], // These spoken words will trigger the execution of the command
        action:function(i, wildcard){ // Action to be executed when a index match with spoken word
          //  console.log(wildcard);
          //  artyom.dontObey();
          //  artyom.say(wildcard);
          //  artyom.obey();
             mythis.client.textRequest(wildcard)
             .then(function(response) {
                     console.log(response);
                     var result;
                     var itemName;
                     try {
                       result = response.result.fulfillment.speech;
                       itemName = response.result.fulfillment.messages[1].payload.name;
                     } catch(error) {
                       console.log("error: "+ error);
                       result = "";
                       itemName = "";
                     }
                     //console.log(response);
                     console.log(result);
                     console.log("test: " +itemName);
                     mythis.setState({theResult:result, itemID: itemName});
                     mythis.artyom.say(result);

                   })
                   .catch(function(err) {
                     console.log(err);

                   });
        }
    };

    mythis.artyom.addCommands(commandHello); // Add the command with addCommands method. Now
    startContinuousArtyom();
    // This function activates artyom and will listen all that you say forever (requires https conection, otherwise a dialog will request if you allow the use of the microphone)
    function startContinuousArtyom(){
        mythis.artyom.fatality();// use this to stop any of

        setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
             mythis.artyom.initialize({
                lang:"en-US",// A lot of languages are supported. Read the docs !
                continuous:true,// Artyom will listen forever
                listen:true, // Start recognizing
                debug:true, // Show everything in the console
                speed:1 // talk normally
            }).then(function(){
                console.log("Ready to work !");
            });
        },250);
    }

  }

  handleSubmit(event){
    event.preventDefault();

    var mythis = this;

    this.client.textRequest(mythis.state.input)
    .then(function(response) {
            var result;
            var itemName;
            try {
              result = response.result.fulfillment.speech;
              itemName = response.result.fulfillment.messages[1].payload.name;
            } catch(error) {
              result = "";
              itemName="";
            }
            //console.log(response);
            //console.log(result);
            //Component.setState({theResult:result});
            mythis.artyom.say(result);
            mythis.setState({theResult:result, itemID:itemName});
            console.log();
          })
          .catch(function(err) {
            console.log(err);

          });

  }



  render(){
    return(
      <div>
        <div>
          <form onSubmit={event => this.handleSubmit(event)}>
            <div className="User-input">
              <input
                  value={this.state.input}
                  onChange={event => this.setState ({input: event.target.value})} required="Please Say or Input a valid item name"
                  placeholder=" Say or type an item to look up"/>
            </div>
          </form>
        </div>
        <div className="Result">
          <ResultStatement answer={this.state.theResult} itemID={this.state.itemID}  />
        </div>
      </div>
    );
  }
}
export default Layout;
