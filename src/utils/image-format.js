module.exports = (image) => ({
  url: image.link,
  snippet: image.snippet,
  thumbnail: image.image.thumbnailLink,
  context: image.image.contextLink
});
