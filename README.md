# PianOrganizer

## Purpose

At collegiate music institutions, students are required to fulfill a number of degree-fulfilling performance obligations. These include Junior Recitals, Senior Recitals, Master Classes, Juries, and more. Generally, a challenge for Piano faculty at these institutions is to manage the assignments of Pianists (whether staff or other students) to collaborate with these music students at these performances. PianOrganizer provides a way for piano faculty coordinators to assign, manage, and maintain these musical relationships.

## Usage

Coordinators may register for a unique account with PianOrganizer. Upon logging into their account, coordinators are greeted with a welcome page, which includes a "To-Do" list of events that do not yet have (or no longer have) an assigned pianist.

Coordinators can:

- View all upcoming events, chronologically, for their institution
- View events for a particular month
- Add a new event
- Delete an existing event
- Assign an available pianist (or none) to a particular event
- Edit an existing event, including its assigned pianist
- Add or Delete Pianists
- Add or Delete Students
- View all exiting events for a particular pianist (along with other details)
- View all existing events for a particular student (along with other details)
- Change their view preference to light or dark mode. This preference is saved and maintained between sessions and on different devices
- Logout


---

## Structure and Stack

PianOrganizer is a full-stack application, with a user-facing interface that interacts with a back end and database. Front end files are located in the `client` directory, and utilize the following tools:
- JavaScript/React
- Redux for maintaining some application-wide state
- React-Router for client-side routing
- Formik and Yup for forms and form validation
- CSS modules for styling

Back end files are located in the `server` directory and utilize the following tools:
- Flask and Flask-SQLAlchemy
- flask_restful for RESTful server-side routes
- flask-bcrypt for password hashing and user authentication
- python-dotenv for .env (secret key and URI) management
- flask_cors for managing Cross Origin Resource Sharing
- flask_migrate for Alembic migrations
- faker for generating some aspects of seed data
- Several other small sub-libraries like SerializerMixin (for data serialization) and "validates" for validation decorators
- SQLite for local development; live deployment forthcoming


## Client

The following is a brief overview of the components in the `client/src/components` directory and the purposes they serve:

#### App.js

Serves as the entry point for the entire React application. All other components are imported here, along with several React and Redux hooks. A useEffect is run to hit 'check-session' on the back end, which check is there is a currently logged in user. If there is no logged in user, the user is redirected to the home route; otherwise, a Redux "dispatch" is run to apply that user's information to the global store. Another useEffect dispatches that user's light mode/dark mode preference to the store if a user is logged in. If there is no logged in user, a Switch is returned between the home and sign up routes; otherwise, a NavBar component is returned, followed by a Switch between the other routes available to the user and their respective components. A Redirect path is used in conjunction with useLocation to redirect the user to their current route if a refresh occurs while using the application.

A style is applied to override browser default margins and paddings, so that components can be style more consistently throughout the application.


#### reduxSlices / store.js

There are two slices present here, one for the logged in user information and the other for light mode vs dark mode preferences. The reducers for these pieces of "global state" are defined here, and are configured in <strong>store.js</strong>.

#### Assets

The logo image is stored here.

### Components

Throughout many components, the Redux store is accessed, providing information about both the logged in user and the current view mode (light vs dark) preference. Most components contain two module.css files (one for each preference). A conditional checks the view mode preference in the store, and applies the appropriate style file accordingly.

#### AllEvents / EventListing / EventInfo

A useEffect fetches all of the events from the 'api/events' route. These objects are then mapped over, displaying an EventListing component (with a corresponding link). A dropdown with months updates the selectedMonth state, which filters the displayed results by month (or all events, if selected). Each EventListing component renders the appropriate event information, and is a link to the EventInfo component, which itself displays the event information, along with buttons linking to edit and delete options (see below for more details).

There is also a "Create New Event" button that renders the NewEvent component (see below).

#### NewEvent

New Event is a controlled form that uses formik and yup for validation and state handling. All available students and pianists are retrieved and stored in local state, which is then used to populate the appropriate dropdowns in the form. Once all fields are completed in the appropriate shape, the submit button will trigger a POST request to the back end to save the information to the database.

#### AllPianists / PianistInfo

A useEffect fetches all pianists from '/api/pianists'. Similar to AllEvents, each piece of data is mapped over, and returns the appropriate information in a useful format for the user. If there are no pianists, a message displaying this fact to the user is presented. Clicking on any listing will direct the user to that specific PianistInfo component, which itself displays the pianist's contact information. It also maps over the pianist's events array, and displays each of that pianist's associated events.

#### NewPianistModal

The New Pianist Modal utilizes Formik and Yup in a similar fashion to New Event. One of the primary differences is that, as the name implies, this form pops up in a modal. All Pianists triggers the rendering of a backdrop (to prevent the user from clicking on other parts of the application), with the modal (which has a higher Z-index) appearing on top. Submitting the form triggers a POST request to save a new pianist to the database.


#### AllStudents / NewStudentModal / StudentInfo

These components function simialrly to their Pianist counterparts. The primary differences lay, of course, within what information/rows are expected by the forms and retrieved information. However, the modals and requests function in an otherwise similar fashion to their Pianist counterparts. useHistory is utilized (via history.go(0)) to refresh the listing of available students after a successful submission.

#### Backdrop

A simple component that is primarily used for its style file, which enables a translucent background behind modals, thus compelling the user to interact with the modal itself.

#### ConfirmDeleteModal

This component's visibility is triggered from other components when their delete button is clicked. The changeState function which updates this visibility is received by ConfirmDeleteModal as a prop, so it can again be triggered when a user concludes their interaction with it. Predictably, clicking YES will trigger a DELETE request to the appropriate backend route and redirect the user to the events page listing, while clicking NO will simply close the modal by triggering the state update that was passed in.

#### EditEventModal

Similar to other modals in the application, the modal in EditEventModal receives the state setter function that makes itself visible (to be re-triggered upon completion). A formik/yup form is displayed, with the available pianists portion of the form populated from local state, which is itself set through a fetch request for available pianists. Unlike the New Event form, this form's initial values are set to be the existing event's values. A ternary checks for a pianist assignment, providing an empty string assignment if no pianist is already assigned to the event. enableReinitialize is set to true, in case the formik form renders prior to any other information being available to it for the intial values. Submitting the form triggers a PATCH request the appropriate route (the id is gathered from React-Router's useParams), and the event's listing is then refreshed so the user can immediately see the changes.

#### LandingPage

As the name implies, this landing page is rendered at the home route for the application. It provides an attractive display of available features for the program, a logo image, an imbedded Login component (detailed below), and a link to the Sign Up component/route.

#### Login

A small formik/yup controlled form asks for the user to input their username and password. Appropriate error messages are displayed for the forms not meeting requirements. The information is submitted to the '/api/login' route via a POST request. The response to this request may trigger an update to the local failedLogin state if the response is not of code 200; this state being true will provide the user with a message that their login failed and ask them to try again. Otherwise, assuming the login post was successful, a dispatch to changeLoggedInUser is executed, which allows for the rest of the application (NavBar, home route, etc) to be displayed.

#### NavBar

The NavBar component is displayed at the top of the page when the loggedInUser Redux slice is not empty. NavLinks (from react-router) are displayed with active stylings as appropriate. The Dark Mode button triggers an update to the viewMode Redux slice (thereby applying the appropriate style to all components in the application), and also PATCH's the coordinator's database entry with this new preference so that it may be retained between sessions, through refreshes and across different devices.


#### SignUp / SignUpConfirmation

The SignUp component first checks if a user is already logged in (via a request to '/api/check-session'). If they are, they are redirected the WelcomeLanding component/route. A user should not easily be able to arrive at this URL, but technically could do so if they typed in the signup route manually. This guards against that issue (i.e. a user cannot try to log in again if they are already logged in).

Similar to the other forms in the application, a yup/formik form with an appropriate schema and error display is used. Once a successful POST is completed, the local state signUpSuccess is set to true, which triggers a render of the SignUpConfirmation component. This component informs the user of their successful sign-up, then provides a link back to the Landing Page where they can now log in to their account.

#### WelcomeLanding

The WelcomeLanding component is displayed to a user who has logged in. It greets the user by their name and institution/organization. On the right side of the page, the user can see all of their "To-Do" events, that is, events that do not yet or no longer have an assigned pianist. This data is retrieved from the '/api/unassigned-events' route, which simply returns events that do not have an assigned pianist. If the length of this data is 0, we can assume all events are assigned, and therefore a message is displayed informing the user that they are all caught up with their assignments. Otherwise, all such events are displayed as EventListing components.



## Server

The following is a brief survey of some of the important back end files for PianOrganizer, which reside in the `/server` directory of the project.

#### config.py

Config is where much of the "setup" for the Flask application resides. flask itself, along with numerous flask-related libraries, are imported and instantiated here.
* Currently, the secret key is applied directly within config.py. When deployed, this information will be imported via a .env file to avoid exposure of the secret key on GitHub.
* `app` is instantiated as flask application, and the DATABASE_URI iset to a local sqlite instance. Again, this will be updated with deployment.
* a `bcrypt` instance is created with `app` passed into it
* metadata is defined, with a naming convention set for foreign keys (see https://medium.com/@scottschwab86/no-anonymous-constraints-a-bit-about-the-sqlalchemy-naming-convention-ef2681e3fda0 for some thoughts on naming_convention!)
* This metadata is passed into `db`, an instantiated SQLAlchemy object
* `app` and `db` are passed as arguments to `Migrate` and SQLAlchemy's `init_app`
* `flask_restful` is used to instantiate an API object with `app`
* CORS (Cross-Origin-Resource-Sharing) is set up to allow the server to accept requests from the front end


#### app.py

The app file is where the routes for the Flask application are set up.

* Routes are passed into `render_template`, enabling routes to be accessed directly (i.e. without user navigation). Without this, the deployed application would crash if a user were to "refresh" a page that accesses some of these routes.
* `before_request` calls upon a function that checks whether a user is logged in. If the an endpoint is accessed and there is no active user session, the API will return an error object before attempting to complete any of the actions intended to be available only to authenticated users.

### Routes
* Coordinators accepts GET and POST routes. The former returns a serialized list of all coordinators, the POST route creates a new Coordinator object with the json() data from the SignUp form and saves it to the database

* CoordinatorInfo's GET route returns a specific coordinator based on an ID passed in. The PATCH route is primarily used for patching a user's dark mode preferences, which it receives when the dark mode button is clicked.

* Pianists has a GET route that ascertains the current coordinator's ID from the session, then returns all pianists who belong to that coordinator. There is also a POST route that creates a new Pianist object from the form's json data plus the current coordinator's id, and adds that new pianist to the database.

* PianistInfo has a GET and DELETE route, both of which accept a pianist's ID as an argument. The GET route returns the pianist with the specified ID, the DELETE route deletes the pianist with the specified ID from the database.

* The Students and StudentInfo routes work similarly to their Pianists and PianistInfo counterparts, respectively.

* The Events GET route ascertains the current coordinator id from the session, then returns all Events whose coordinator_id matches the current coordinator id. The POST route gets event information from the request's json data sent from the front end form, constructs a new Event object with this data, then persists it to the database. The DateTime object is parsed from the date string passed in using strptime (see https://medium.com/@scottschwab86/a-sign-of-the-date-times-99fa41bd86c3 for more details).

* EventInfo has GET and PATCH routes that works similarly to PianistInfo and StudentInfo. The PATCH route parses the data from two possible string formats, depending on their origin (again, see aforementioned Medium article for more details). There is also a DELETE route which deletes the event from the database. It is worth noting that the cascade-rules and relationships have been set up such that deleting an event will NOT delete pianists or students, but deleting students WILL delete their corresponding events, and deleting pianists will cause events to have their pianist_id column updated appropriately.

* The Login route accepts a POST request. First the appropriate user is queried from the database based on the entered username (which is parsed from the received JSON). The password string is also parsed from the form, and passed into the coordinator object's `authenticate` method (defined in the Coordinator model). If the authentication is successful, the session's logged in coordinator id is then set with the coordinator's id, and a 200 reponse is sent with the coordinator information. If the authentication fails, a 401 response with an error message is sent back to the front end, where the appropriate failure message will then be displayed to the user.

* Logout accepts only a DELETE request, which simply sets the session's logged in coordinator id to be None, and then returns a confirmation response.

* CheckSession is used to check whether a user is currently logged into the application. The session is object is checked for a current user, and if one is found, that session's user id is then used to query the database for a Coordinator with a matching id. This Coordinator is then serialized and returned in the response. If there is no current user in the session, then None is returned, and then front end can handle the response appropriately.

* UnassignedEvents is designed to return events that do not have a pianist currently assigned to them. The query utilizes SQLAlchemy's `or_` method, checking if an event's pianist_id is either `None` or empty string. This check is necessary, as removing a pianist from the database entirely and changing an event's pianist assignment to "unassigned" results in one of these two different values being saved for this column in the Event.




#### models.py

Currently, PianOrganizer contains four models: Coordinator, Pianist, Student, and Event. The relationships between these models (and database tables) is roughly as follows:

* A Coordinator can have many pianists, students, and events; each of these other models can only have one Coordinator
* An Event can have one Pianist; a Pianist can have many Events
* An Event can have one Student; a Student can have many Events
* A Pianist can have many students (via Events)
* A Student can have many pianists (via Events)

Examining each model in some more detail:


##### Coordinator
A coordinator has five columns: id, username, organization, viewModePreference, and _password_hash. All columns are not nullable, are strings except for the id (which is obviously an integer), and the primary_key constraint is set on id. `password_hash` has getter and setter methods; the former simply returns the _password_hash column; the latter uses bcrypt's `generate_password_hash` method to encode the received password string and save it as a hash in the database. The `authenticate` method compares the password_hash with a hash generated by the entered password, and returns a Boolean reflecting the result.

##### Pianist
The pianists table has five columns: id, name, role, email, and coordinator_id. Again, all are not nullable, the id is primary_key, and types are defined as string or integer. The `@validates` decorator is used to perform some custom validation on the entered email (in this case, simply checking for both an "@" and "." character to be present in the string before committing the Pianist to the db). A ForeignKey relationship is established with the Coordinator table via the coordinator_id column, a relationship is established with Events, and serialize_rules are in place to ensure that serializing events and pianists will not lead to inifinite loop.


##### Student
In many ways, the Student table is set up similarly to the Pianist table, with some different columns (instrument, teacher). Email is similarly validated, and serialize_rules again prevent a circuitous serialization with Events. The relationship is defined wit hEvents, and a ForeignKey relationship is in place with coordinator as well. One interesting thing to note here is the `cascade` rules: If a Student is deleted, their related events are also deleted. In short, an Event cannot exist without a student, even if it can exist without a pianist.

#### Event

Many of the relationships coalesce around the Event model. While many of the columns are similar and self-explanatory when compared with the other models, we also note that Events have three foreign keys: coordinator_id, student_id, and pianist_id. Relationships are explicitly defined with students and pianists as well, and these foreign key columns help establish this bi-directional relationship between these tables.


### seed.py
A seed file is included for development and testing purposes. Two hard-coded coordinators are created, and then Faker is used within loops to create numerous fake pianists, students, and events. For Events, random numbers (within the range of the number of created pianists and students) are used to provide student_id and pianist_id values.

## Ideas For Future Development

PianOrganizer can already do many things, but there is still room for growth. Some potential goals include:
* Responsive styling for mobile devices
* Improved styling organization to reduce redundancy
* Interaction with an external calendar API (like Google Calendar) to enable events to populate in a user's calendar
* Automatic deletion (or somehow separation) of events that have already passed, i.e. are before the current date

Please submit any ideas for further development to Scott Schwab, scottschwab86@gmail.com

Developed by Scott Schwab, 2024