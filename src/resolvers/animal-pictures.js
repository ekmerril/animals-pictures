
const fs = require('fs');
const axios = require('axios')

async function getAnimalPic(animalName) {
  
  var finalImage = undefined
  await axios
    .get('https://customsearch.googleapis.com/customsearch/v1?searchType=image&key=AIzaSyBFDHBga7FTKUVTgbW-L69HZmBAi6Q95aA&cx=5c89643ee7e674541&q=' + animalName)
    .then(res => {
      var results = res.data.items
      if (results.length > 0) {
        var firstResult = results[0]
        if (firstResult.link) {
          finalImageUrl = firstResult.link
        }
      }
      finalImage = {url: finalImageUrl}
    })
    .catch(function (error) {
      console.log(error);
    })

    return finalImage
}

// class Animal {}

module.exports = {
Animal: {
  picture(animal) {
    return getAnimalPic(animal.selectedAnimal)
  } 
}


  // Animal: {
  //   __resolveReference(animal) {
  //     var final = {
  //       // ...animal,
  //       picture: getAnimalPic(animal.commonName)
  //     };
  //     return final
  //   }
  // }

  // Animal: {
  //   picture: (animal) => {
  //     return getAnimalPic(animal.commonName)
  //   }
  // }
  
}
