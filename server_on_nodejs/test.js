const fs = require("fs"); //require filesystem module

const motorObjs = [
  {
    id: 0,
    value: 1
  },
  {
    id: 1,
    value: 4
  },
  {
    id: 2,
    value: 7
  }
];

function writeData() {
  const fileUrl = `${__dirname}\\public\\data\\motorData.json`;
  console.log(JSON.stringify(motorObjs));
  fs.writeFile(fileUrl, JSON.stringify(motorObjs), "utf8", err => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}

writeData();
