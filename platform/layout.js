(function(){

  var client;
  client = new ApiAi.ApiAiClient({accessToken: "585cfd962bea4e58bc07e568b69615a8"});



  const artyom = new Artyom();


  // Add a single command
  var commandHello = {
      smart:true,
      indexes:["okay Ash *"], // These spoken words will trigger the execution of the command
      action:function(i, wildcard){ // Action to be executed when a index match with spoken word
        //  console.log(wildcard);
        //  artyom.dontObey();
        //  artyom.say(wildcard);
        //  artyom.obey();
           client.textRequest(wildcard)
           .then(function(response) {
                   var result;
                   try {
                     result = response.result.fulfillment.speech
                   } catch(error) {
                     result = "";
                   }
                   //console.log(response);
                   //console.log(result);
                   artyom.say(result);
                 })
                 .catch(function(err) {
                   console.log(err);

                 });
      }
  };

  artyom.addCommands(commandHello); // Add the command with addCommands method. Now
  startContinuousArtyom();

  // This function activates artyom and will listen all that you say forever (requires https conection, otherwise a dialog will request if you allow the use of the microphone)
  function startContinuousArtyom(){
      artyom.fatality();// use this to stop any of

      setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
           artyom.initialize({
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




//   client.textRequest("How much is PD?")
//   .then(function(response) {
//           var result;
//           try {
//             result = response.result.fulfillment.speech
//           } catch(error) {
//             result = "";
//           }
//           //console.log(response);
//           console.log(result);
//         })
//         .catch(function(err) {
//           console.log(err);
//
//         });
//
// })();



// (function() {
//   "use strict";
//
//   var ENTER_KEY_CODE = 13;
//   var queryInput, resultDiv, accessTokenInput;
//
//   window.onload = init;
//
//   function init() {
//     queryInput = document.getElementById("q");
//     resultDiv = document.getElementById("result");
//     accessTokenInput = document.getElementById("access_token");
//     var setAccessTokenButton = document.getElementById("set_access_token");
//
//     queryInput.addEventListener("keydown", queryInputKeyDown);
//     setAccessTokenButton.addEventListener("click", setAccessToken);
//   }
//
//   function setAccessToken() {
//     document.getElementById("placeholder").style.display = "none";
//     document.getElementById("main-wrapper").style.display = "block";
//     window.init(accessTokenInput.value);
//   }
//
//   function queryInputKeyDown(event) {
//     if (event.which !== ENTER_KEY_CODE) {
//       return;
//     }
//
//     var value = queryInput.value;
//     queryInput.value = "";
//
//     createQueryNode(value);
//     var responseNode = createResponseNode();
//
//     sendText(value)
//       .then(function(response) {
//         var result;
//         try {
//           result = response.result.fulfillment.speech
//         } catch(error) {
//           result = "";
//         }
//         setResponseJSON(response);
//         setResponseOnNode(result, responseNode);
//       })
//       .catch(function(err) {
//         setResponseJSON(err);
//         setResponseOnNode("Something goes wrong", responseNode);
//       });
//   }
//
//   function createQueryNode(query) {
//     var node = document.createElement('div');
//     node.className = "clearfix left-align left card-panel green accent-1";
//     node.innerHTML = query;
//     resultDiv.appendChild(node);
//   }
//
//   function createResponseNode() {
//     var node = document.createElement('div');
//     node.className = "clearfix right-align right card-panel blue-text text-darken-2 hoverable";
//     node.innerHTML = "...";
//     resultDiv.appendChild(node);
//     return node;
//   }
//
//   function setResponseOnNode(response, node) {
//     node.innerHTML = response ? response : "[empty response]";
//     node.setAttribute('data-actual-response', response);
//   }
//
//   function setResponseJSON(response) {
//     var node = document.getElementById("jsonResponse");
//     node.innerHTML = JSON.stringify(response, null, 2);
//   }
//
//   function sendRequest() {
//
//   }
//
 })();
