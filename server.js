const express = require("express");
const { faker, fakerEN_US } = require("@faker-js/faker")
const app = express();
const port = 8000;

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

// function createUser
function createUser() {
    const newUser = {
        _id: faker.string.uuid(), // Correct way to generate a unique ID
        firstName: faker.person.firstName(), // Correct method
        lastName: faker.person.lastName(), // Correct method
        email: faker.internet.email(),
        password: faker.internet.password(),
        phoneNumber: faker.phone.number(), // Correct method
    };
    return newUser;
}
    
const newFakeUser = createUser();
console.log(newFakeUser);


// function createCompany
function createCompany() {
    const newCompany = {
        _id: faker.string.uuid(), 
        name: faker.company.name(),
        address: {
            street: fakerEN_US.location.street(), 
            city: fakerEN_US.location.city(), 
            state: fakerEN_US.location.state(), 
            zipCode: faker.location.zipCode(), 
            country: fakerEN_US.location.country(), 
        },
    };
    return newCompany;
}
    
const newFakeCompany = createCompany();
console.log(newFakeCompany);


app.get("/", (req, res) => {
    res.json({message: "Welcome to the API"})
  })

//rout for newUser
app.get("/api/users/new" , (req, res) => {
    res.json( createUser() );
});

//rout for newCompany
app.get("/api/companies/new" , (req, res) => {
    res.json( createCompany() );
});

//rout for newUser & newCompany
app.get("/api/user/company" , (req, res) => {
    res.json({user:createUser(), company:createCompany()});
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

