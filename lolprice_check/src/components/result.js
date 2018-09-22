import React from 'react';
import {ITEMS} from '../ITEMS';
import './result.css';
import ReactTooltip from 'react-tooltip';

const ResultStatement = ({answer,itemID}) =>{

  var itemBuildTo;
  var itemBuidToDiv=[];
  var itemBuildFrom={};
  var itemBuildFromDivOne=[];
  var itemBuildFromDivTwo=[];

  //if items existed show the image of that item
  if(itemID !== "none"){
    itemBuildTo = ITEMS.data[itemID].into;

    //building divs for items that can be build to
    if(itemBuildTo !== undefined){
      for(let i = 0 ;i<itemBuildTo.length; i ++){
        let temstyle ={
              backgroundImage: 'url(item/' + ITEMS.data[itemBuildTo[i]].image.full+')'
            };
        let statTemp = [];
        let tip=[];
        let stat = ITEMS.data[itemBuildTo[i]].description.replace(/(<a\b[^>]*>)[^<>]*(<\/a>)/g, "");
         stat = stat.replace(/<\/?[^>]+(>|$)/g, "@");
         stat = stat.replace(":@", ":");
        statTemp = stat.split(/[@]+/);

        for(let tipRunner = 0 ; tipRunner<statTemp.length; tipRunner++){
          if(statTemp[tipRunner] !== ""){

            if(statTemp[tipRunner].includes("Passive")){
              tip.push(<br className = "Breaker"/>);
              tip.push(<p className = "UNIQUE">{statTemp[tipRunner]}</p>);
            }else{
              tip.push(<p className = "REQULAR">{statTemp[tipRunner]}</p>);
            }
          }
        }
        let temp = <div className ="outerItem" key = {itemBuildTo[i]} >
                      <div className = "inner" data-tip data-for={itemBuildTo[i]}>
                        <div className = "item" style={temstyle} >
                        </div>
                      </div>
                      <ReactTooltip id={itemBuildTo[i]} aria-haspopup='true'>
                        <img className="tipImage" src = {'item/'+ITEMS.data[itemBuildTo[i]].image.full} alt=""/>
                        <div className= "tipText">
                        <p className = "tipName">{ITEMS.data[itemBuildTo[i]].name}</p>
                        {tip}
                        </div>
                     </ReactTooltip>
                  </div>;
        itemBuidToDiv.push(temp);


      }

    }
    //building required items list recursively
    build(1,itemBuildFrom, itemID);




     for(let i = 2;i<=4;i++){
       if(itemBuildFrom[i] !== undefined){
         let temp = [];
         for(let j = 1;j<=3;j++){
           if(itemBuildFrom[i*3 - (j-2)] !==undefined){
             temp.push(<li>{itemBuildFrom[i*3 - (j-2)]}</li>);
           }
         }
         if(temp.length >0){
           itemBuildFromDivTwo.push(<li>{itemBuildFrom[i]} <ul>{temp}</ul> </li>);
         }else{
           itemBuildFromDivTwo.push(<li>{itemBuildFrom[i]}</li>);
         }
       }
     }

     if(itemBuildFrom[2] === undefined){
       itemBuildFromDivOne.push(itemBuildFrom[1]);
     }else{
       itemBuildFromDivOne.push(<li>{itemBuildFrom[1]} <ul>{itemBuildFromDivTwo}</ul></li>);
     }

  }
  return(
    <div>
      <div className="Answer">
        <p>{answer}</p>
      </div>
      <div className="BuildInto">
        <div className="BuildIntoText">
          <p>Build Into: </p>
        </div>
        {itemBuidToDiv}
      </div>
      <br/>
      <div className="Shop">
        <div className="ShopText">
          <p>Requires: </p>
        </div>
        <div className="tree">
          <ul>
            {itemBuildFromDivOne}
            </ul>
        </div>
      </div>
    </div>


  )
}

//recusive function for building required items list
function build(index,items,itemID){
  var myindex = index;
  //exit condition
  if(itemID === undefined){
    return;
  }
  let temstyle ={
    backgroundImage: 'url(item/' + ITEMS.data[itemID].image.full+')'
  };

  let statTemp = [];
  let tip=[];
  let stat = ITEMS.data[itemID].description.replace(/(<a\b[^>]*>)[^<>]*(<\/a>)/g, "");
   stat = stat.replace(/<\/?[^>]+(>|$)/g, "@");
   stat = stat.replace(":@", ":");
  statTemp = stat.split(/[@]+/);

  for(let tipRunner = 0 ; tipRunner<statTemp.length; tipRunner++){
    if(statTemp[tipRunner] !== ""){

      if(statTemp[tipRunner].includes("Passive")){
        tip.push(<br className = "Breaker"/>);
        tip.push(<p className = "UNIQUE">{statTemp[tipRunner]}</p>);
      }else{
        tip.push(<p className = "REQULAR">{statTemp[tipRunner]}</p>);
      }
    }
  }

  let temp   = <div className = "outer" key = {itemID+index}>
                <div className = "inner" data-tip data-for={itemID}>
                  <div className = "item" style={temstyle}>
                  </div>
                  <p>{ITEMS.data[itemID].gold.total}</p>
                </div>
                <ReactTooltip id={itemID} aria-haspopup='true'>
                  <img className="tipImage" src = {'item/'+ITEMS.data[itemID].image.full} alt=""/>
                  <div className= "tipText">
                  <p className = "tipName">{ITEMS.data[itemID].name}</p>
                  {tip}
                  </div>
               </ReactTooltip>
              </div>;


  items[index] = temp;


  if(ITEMS.data[itemID].from !==undefined){
    var buildfrom = ITEMS.data[itemID].from;
    for(let i =0 ;i<buildfrom.length ; i++){

      if(items[(index *3)-1]  === undefined){ // x * 3 -1 = first child
        myindex = (index * 3) -1;
        build(myindex,items,buildfrom[i]);

      }else if(items[index *3] === undefined){// x * 3 = second child
        myindex = (index * 3);
        build(myindex,items,buildfrom[i]);

      }else if (items[index *3 + 1] === undefined && i ===2 ) { // x * 3 + 1 = third child
        myindex = (index * 3) +1;
        build(myindex,items,buildfrom[i]);

      }else{
        myindex = (index * 3) +2;
      }
    }
  }

}

export default ResultStatement;
