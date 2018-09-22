require("./ITEMS");

var fs  = require("fs");


  // fs.readFileSync('./template.json').toString().split('\n').forEach(function (line) {
  //     console.log(line);
  //     //fs.appendFileSync("./test.json", line.toString() + "\n");
  // });

for (let key in ITEMS.data){
  fs.readFileSync('./template.json').toString().split('\n').forEach(function (line) {

      let tempst = line.toString();
      tempst = tempst.replace("*", ITEMS.data[key].name);
      tempst = tempst.replace("$", ITEMS.data[key].gold.total);
      tempst = tempst.replace("#", key);
      fs.appendFileSync("./"+key.toString()+".json", tempst + "\n");

  });
}
