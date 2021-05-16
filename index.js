const { promises: fs } = require("fs");

(async function () {
  for (let id = 1; id <= 20000; id++) {
    const data = JSON.parse(
      await fs.readFile(__dirname + "/json-data" + `/beebits-${id}.json`)
    );
    const minData = {
      id,
      imageURL: `https://cdn.beebits.xyz/full/beebits-${id}.png`,
      type: data.type,
    };

    await fs.writeFile(
      __dirname + "/public/beebits-min" + `/beebits-${id}.json`,
      JSON.stringify(minData)
    );
  }
})();
