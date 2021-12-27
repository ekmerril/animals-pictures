const axios = require("axios");

async function getAnimalPics(animalName) {
  var finalImages = [];
  await axios
    .get(
      "https://customsearch.googleapis.com/customsearch/v1?searchType=image&imgSize=large&key=AIzaSyBFDHBga7FTKUVTgbW-L69HZmBAi6Q95aA&cx=5c89643ee7e674541&q=" +
        animalName
    )
    .then((res) => {
      var results = res.data.items;
      if (results.length > 0) {
        results.forEach(function (item, index, array) {
          if (item.link) {
            finalImageUrl = item.link;
          }
          finalImages.push({ url: finalImageUrl });
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  return finalImages;
}

module.exports.resolvers = {
  Animal: {
    pictures(animal) {
      return getAnimalPics(animal.ID);
    },
  },
};
