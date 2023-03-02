<!-- Add any assumptions here -->

## Project setup choices

I wanted Typescript for its features in the editor. Simple JS would not have been a terrible choice.

I chose Cypress since we are both most familiar with it.
Furthermore, Cypress bundles Chai and Mocha out of the box. https://docs.cypress.io/guides/references/bundled-libraries 
It would not have made sense to install those separately and start configuring them.

I chose:
- eslint as it's the most popular linting tool for JS; I didn't bother looking for anything else;
- prettier for the code formatter; it is super useful to keep code readable and uniform; it also works well with eslint;
- faker for objects factory; I am familiar with factorybot as well, but faker has been given new life recently after a lash out from the main supporter;
  it is well maintained by lots of people and not likely to die for no reason;
- I am using VSCode for its nice integrations with all of the above tools; a list of extensions can also be provided to be installed by default
  for anyone using VSCode as well;
- Dockerized service for the API; while I could've used the URL without setting it up, it was very easy to pull the latest image and run the container;
  this provides more stability for the test environment, fewer surprises, and debugging options (`docker container -it` to enter the container if I recall correctly)
- yarn for the package manager; I am most familiar with it; I could've used npm; it makes no real difference aside from being comfortable with the tooling;
- to disable Cypress videos because they were always generating and were useless for API calls only; Screenshots too, but I didn't disable those... yet;
- the e2e test framework configs as a default config for the API tests; it would've taken me a lot more time to do some custom configs that are not really needed;
- to copy-paste a template .gitignore file from google
- use `cy.fixture('findPetByTag/tag1.json').then((json)` instead of adding another library to directly import json files; that was the con, adding more complexity; for handling multiple json files at the same time, it's surely needed, but I didn't find it necessary for one fixture at a time;
- to try sticking to Conventional Commits commit messages; I could've done better;
- not to install Husky hooks for automated checks and code formatting; found it unnecessary for the time being;

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
