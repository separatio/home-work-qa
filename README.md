## YourBourse Candidate Evaluation (QA Automation)

Your task is to create a small working automation framework using [Cypress](https://docs.cypress.io/).

The framework should run against a public PetStore3 API (the definition can be found here: [Swagger UI] (https://petstore3.swagger.io/))
and execute the required test cases.

## Scope

1. Prepare a list of test cases covering three operations:

   - Create a pet `/pet`
     ![image](https://user-images.githubusercontent.com/109854076/220346748-6ed5693c-e5f5-415c-825a-66b5e592f569.png)

   - Modify the existing pet `/pet`
     ![image](https://user-images.githubusercontent.com/109854076/220346795-dac3402f-a371-4509-82ef-3e629b4c427c.png)

   - Search for the specified pet by a tag `/pet/findByTag`
     ![image](https://user-images.githubusercontent.com/109854076/220346838-acd4547a-871f-403b-997e-588df03ad1c3.png)

2. Create a test framework that can be executed, and it should verify that all test cases are adequately handled.

3. API calls should be made from Cypress using application/json content type

## Out of scope

1. Authorization is not required in this task
1. Don’t record any video on how to run the solution

---

### Additional Comments

Please document any assumptions, notes, or considerations that you make in the [Assumptions.md](Assumptions.md) file in the root of the repository. Please also document any libraries you use to complete the task in this file; a note on why you chose some of the libraries over an alternative would be appreciated.

It's expected for you to spend no more than 2 hours on this work, but please regularly commit so we can see the approach you take to get to the end result.

Please host your solution in a public repository of a platform such as GitHub, and upon completion, a link should be sent to us.
