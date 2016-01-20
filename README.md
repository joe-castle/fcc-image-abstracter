# FCC Image Abstracter Project

Please see challenge page for more info: http://www.freecodecamp.com/challenges/image-search-abstraction-layer

_The app uses redis to persist the latest search results.
You can install redis with homebrew._
```
> brew install redis
> redis-server
```
The app is configured to work with the default ip and ports so once redis-server is up, it will automatically work.
```
> npm install
> node src/server.js
```
---
The Search results are powered by Google. You will need to sign up for a [Custom Search Engine](https://cse.google.co.uk/cse/) (enabling image searches) and create a new project at [Google Developers](https://console.developers.google.com/) (enabling the custom search api).

Then export an object under src/_keys/googleapi.js with the following signature: (I recommend not uploading this file to the internet).
```
{
  _API: {String} // Developer Project API
  _CSEID: {String} // Custom Search Engine ID
}
```
This is generally for development, the app looks for API & CSEID env variables for production purposes.

---
### Example Image Search:
```
https://fcc-image.herokuapp.com/api/imagesearch/programming
```
**Output:**
```
[
  {
    url: "https://www.greenedu.com/img/ajax-programming.jpg",
    snippet: "AJAX Programming Courses",
    thumbnail: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR289ZWtkg48qnxeaTe6SQMWZIkIdifZyWiO1azaX8dYKXooWuYXjlVFwo",
    context: "https://www.greenedu.com/ajax-programming-courses"
  },
  {...}
]
```
You can pass an offset number, e.g: `?offset=2`, to paginate through the results. 10 results per page.
### Example Latest Image Searches:
Only the latest 10 results are returned.
```
https://fcc-image.herokuapp.com/api/latest/imagesearch
```
**Output:**
```
[
  {
    term: "programming",
    when: "2016-01-20T12:25:00+00:00"
  },
  {...}
]
```
