# Introduction
**This project is designed to handle receiving customer orders of various bakery items**
It demonstrates clean techniques to filter user input data and output an order receipt that optimises the packaging types to best fulfil the order requirements. Whilst the sample data is for a bakery, it could easily be adjusted for more generic purposes, hence the project name is order-inventory-packager.

Under the hood, it has been created in such a way that the App-constants.js file can be adjusted with new items, packs and other data and the application will pick up on these changes and continue to produce expected results always selecting the most efficient grouping of packs for a given quantity of items.

Aside from the ability to dynamically adjust to change, the application was built to demonstrate instantiated components connected to a global store via MobX.

# Install instructions
- Clone the repository
- Open a terminal / cmd prompt and run `npm i`

# Running the application
- Once installed, run `npm start` to fire up a the application on localhost:3000 (it should open a browser window for you)

# Running the unit tests
- In a terminal / cmd prompt run `npm run test`

#### Total Dev Time
The total dev time to produce this application has bee 18hours over the span of 3 days.
