## assignment12_category_0011

# JustHome.com

1. Admin email: admin@justhome.com

2. Admin password: Admin1234

3. Front-end Live Site Link: [https://just-home-625cb.web.app/]

## Technologies used in this project

- Express
- mongodb
- I've tried to use MVC pattern in this project to make code more readable
- jwt to athenticate logged in user

## Main Features of this site (Front End)

### Features for Common user

- Normal User can find his/her preferable home by location, can see properties by sorting minimum and maximum price range
- User can add a particular property in his/her wishlist
- And then he/she can make offer for the property to the agent of this property
- if the agent accept his offer then user will be able to pay the offered amount through smart payment system which is stripe
- user will be able to give review for particular property
- user can see all his offered, bought properties from his/her dahsboard

### features for agent

- An agent will be able to add and update his/her property to sell
- when common users will offer prices to a particular property then the agent will accept or reject
- if agent accept one of the offer from the list other offer will be automatically rejected
- after the acceptance of agent the user will pay for this property
- agent can see his/her added list, sold properties and offered properties from his dashboard

### features for agent

- An admin will be assign the role of the users, firstly a logged in user will be user as role
- if admin wants, he can make them agent, admin and mark as fraud as well
- when admin will make one user fraud, all properties of this particular agent will be deleted from the list
- admin can manage all properties and review. he will have the authority to delete any of the properties and reviews from the list.
