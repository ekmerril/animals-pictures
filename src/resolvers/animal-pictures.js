const axios = require("axios");
const dotenv = require("dotenv")

// First, make sure we have a .env file that holds our private Google creds for searching
const searchConfig = dotenv.config({ path: "config/search.env" });
if (searchConfig.error) {
  console.log(
    "ERROR: missing config/search.env file that must contain Google Search parameters"
  );
  process.exit();
}

// Go to our Google custom search engine (CSE) and ask for images. Return them all (up to 10 it seems)
// Returning them all allows the client to refresh if they get a weird or inapplicable image (like a diagram)
async function getAnimalPics(animalName) {
  var finalImages = [];
  await axios
    .get(
      "https://customsearch.googleapis.com/customsearch/v1?searchType=image&imgSize=" +
        searchConfig.parsed.GOOGLE_SEARCH_IMAGE_SIZE +
        "&key=" +
        searchConfig.parsed.GOOGLE_SEARCH_KEY +
        "&cx=" +
        searchConfig.parsed.GOOGLE_SEARCH_APP_ID +
        "&q=" +
        animalName
    )
    .then((res) => {
      var results = res.data.items;
      if (results && results.length > 0) {
        results.forEach(function (item) {
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
