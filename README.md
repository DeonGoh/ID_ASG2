# ID_ASG2
 Assignment 2 for Interactive Development
## Github link: https://github.com/DeonGoh/ID_ASG2.git

## Overall concept
Our aim is to encourage users to gain more knowledge by taking quizzes in a fun and exciting manner. A website where users are able to sign up for an account and earn points to purchase cosemetic items from a shop. Quizzes are sorted into categories and give different points according to the difficulty as well as the time taken to complete the quiz. A leaderboard is assigned to each quiz and showcases the fastest user to complete it.

## Design Process
This website will be aimed at people that want to take quizzes during their free time, to grow their knowledge and relieve stress with some fun quizzes! It will encourage users by adding gamification elements to our website.

User stories:
- As a new person, I would like to be able to sign in to the website and create an account to be able to earn points from solving quizzes and use them to get exciting prizes.

- As a person that already has an account, I would like to be able to log in to the website from a different device.

## Features

### Existing Features

#### Account
Users are able to register and log in on an account on the website.
Users are also able to set profile pictures.

#### Quiz
Quizes are sorted into categories and have different difficulties which will award different amount of points accordingly.

#### Unlocks
Users are able to unlock cosmetics using their points earned from playing quizes.
Some of the unlocks are
- Name text color
- Title

#### Points
Points can be used to purchase cosemetics for the user which will change the aesthitics of that user in different ways. 

### Features left to Implement

#### Leaderboard
Score will be calculated by the number of correct answers and the time taken to complete the quiz.

## Technology Used
### Hyper Text Markup Language
- The project uses HTML to display frontend in a browser.

### Cascading style sheet
- The project uses CSS to style frontend in a browser,specifically HTML.

### [JQuery](https://jquery.com/)
- The project uses JQuery to simplify DOM manipulation.

### [LottieFiles](https://lottiefiles.com/)
- The project uses Lottie Animations for animated images for multiple purposes.

### [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- The project uses Bootstrap to simplify front-end development.

### [RestDB]()
Account, Quiz, Leaderboards, Unlock details will all be stored in RestDB and retrieved from there using an API

The following data structure is used
#### account
|Field|Data Type|Constraint|Description|
|-----|---------|----------|-----------|
|ProfilePic|text||Contains link for user's profile pic|
|Username|text|      |Username of the account|
|Password|text|     |Password|
|Profile-title|text|    |title of user|
|text-color|text|    |what color is the user text|
|Points|number|Required, Auto Generated as 0 when creating an account|
|item-list|Select many item-list||Used to select items from item list / serves as inventory|

#### item-list
|Field|Data Type|Constraint|Description|
|-----|---------|----------|-----------|
|item-name|text||name of the item|
|item-desc|text||description of the item|
|cost|number||Cost of item|
|item-cat|text|||category of the item|
|change|text|||
|item-image   |text   |   |url to the image   |

#### quizes
|Field|Data Type|Constraint|Description|
|-----|---------|----------|-----------|
|QuizName|text||Name of Quiz|
|QuizCat|text||Category of what the quiz in|
|QuizDesc|text|Not Required|Description of Quiz|
|Image|text|Not Required|
|Event|bool|Required|Used to say if there's an event going on|

## Testing
1. Sign in page
    1. Once you enter the website you will face the "Login" page
    2. If you want do not have an account click the "sign up" link 
    3. Try to submit a form with the a name that already is registered with an incorrect password
    4. Try to submit an empty form
    5. Try to submit a form with empty password field 
    6. Try to submit a form with different inputs in "create password" and "check password" field
    7. Try to submit a form with a name and correct passwords and see if after sign in, it will redirect to the log in page

2. log in page
    1. Try to submit an empty form
    2. Try to submit a form with an empty password field 
    3. Try to submit a form with the correct name and correct password and see if after log in, it will redirect to the home page

3. Home page
    1. Try to go to profile page
    2. Try to go to Quizzes and click one of the dropdown items
    3. Try to click through the carousel
    4. Try to click on one of the quizzes under 'Quizzes to Start The Day'
    5. Try to click the logo in the navbar to go back to home page
    6. Try to click the 'and more...' option to go to Quizzes page

4. Quizzes page
    1. Try to click on one of the quizzes which leads to the quiz page
    2. Try to click the 'and more' button to go to the quiz-section page of the category of your choice
    3. Try to click on the logo in navbar to go back to the home page

5. Quiz section page
    1. Check if the category of the quiz section is the correct one you chose
    2. Try to click on one of the quizzes to go to the quiz page
    3. Try to click on the logo in navbar to go back to the home page

6. Quiz page
    1. Check if the quiz is the correct one you chose
    2. Try to click on the logo in navbar to go back to the home page
    3. Try to solve the question and get points
    4. Try to get the questions wrong and run out of time and not get points

7. Item page
    1. Try to click on the logo in navbar to go back to the home page
    2. Try to buy an item

8. Profile Section
    1. Try to click on the logo in navbar to go back to the home page
    2. Try to Equip an item from the inventory

## Credits

### Content
- We received the questions and answers for our project from
1. https://www.worldatlas.com/mountains/10-highest-mountains-in-the-world.html
2. https://www.worldometers.info/geography/largest-countries-in-the-world/
3. https://quiz-questions.uk/horror-quiz/
4. https://parade.com/1037122/alexandra-hurtado/pop-culture-trivia/
### Media
- We received the lottie animations for this project from [LottieFiles](https://lottiefiles.com/).
### Acknowledgements
- We received inspiration for this project from [Sporcle](https://www.sporcle.com/).