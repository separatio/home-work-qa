<!-- Add any assumptions here -->

## General assumptions

There is no need to test response headers such as:

```
Headers: {
  "Connection": "keep-alive",
  "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Cypress/12.7.0 Chrome/106.0.5249.51 Electron/21.0.0 Safari/537.36",
  "accept": "*/*",
  "accept-encoding": "gzip, deflate",
  "content-type": "application/json",
  "content-length": 205
}
```

## findPetByTag

- when tags such as [tag1, tag2] exist, it is expected to return the same object twice
- when no pets are found, the status code returned is 200

## createPet

- the documentation mentions only name and photoUrls as mandatory fields; I am assuming that is correct;

## updatePet

- I am assuming it is unnecessary to test status values in PUT requests as well for now
