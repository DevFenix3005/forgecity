# Firebase Chat

Create a chat application using [Firebase](https://firebase.google.com/) as your backend.

Firebase is one of the most widely used service platforms for creating applications worldwide. Thanks to it, we can
integrate in our app (and at no cost to start) features as common as authentication, push notifications, real-time
database, among many other services.

Well, let's create a chat application (never wondered how they work?) that uses as many Firebase services as you want.

You will focus on the frontend, and Firebase will be your backend.

![Brais Moure Challenge card](.github/assets/rviewer-mouredev.png)
> This is a challenge created by [MoureDev](https://www.twitch.tv/mouredev). He will review and give feedback to some
> proposed solutions from the community in one of his Twitch livestreams 😻

**Surprise us! 😉**

## What you'll create

### General level:

- The application will have a screen where you will have to login with your Google account.
- Once logged in, you will be able to select another registered user to chat with from a list.
- The chat will start.

### Main screen:

- Here you can select your Google account to access the App. This registration must be persisted in Firebase. If you are
  already logged in, this screen will NOT be shown.
- Somewhere in the application there must be the possibility to logout.

### Chat screen:

- Here comes the tricky part. You will have to represent the interaction in text format of the two users.
- This chat will be in real time and the conversations will be saved, this means that every time you return to the chat
  room you will be able to consult the previous messages.
- As in most chats, your answers will be aligned to the right and those of the other users to the left.
- You only have to represent text and the name of the user who sent it (it can be the text before the @ of your email).
  This is a test application, keep in mind that in a real App you must protect the privacy of the users.

### Extra points (optional)

Here you rule! 😎

- Are you able to send push notifications to another device every time you are texted?
- And also send images (and save them) through the chat?

## Technical requirements

* Create a **clean**, **maintainable** and **well-designed** code. We expect to see a good and clear architecture that
  allows to add or modify the solution without so much troubles.
* **Test** your code until you are comfortable with it. We don't expect a 100% of Code Coverage but some tests that
  helps to have a more stable and confident base code.

To understand how you take decisions during the implementation, **please write a COMMENTS.md** file explaining some of
the most important parts of the application. You would also be able to defend your code through
[Rviewer](https://rviewer.io), once you submit your solution.

## How to submit your solution

* Push your code to the `devel` branch - we encourage you to commit regularly to show your thinking process was.
* **Create a new Pull Request** to `main` branch & **merge it**.

Once merged you **won't be able to change or add** anything to your solution, so double-check that everything is as you
expected!

Remember that **there is no countdown**, so take your time and implement a solution that you are proud!

--- 

<p align="center">
  If you have any feedback or problem, <a href="mailto:help@rviewer.io">let us know!</a> 🤘
  <br><br>
  Made with ❤️ by <a href="https://rviewer.io">Rviewer</a>
</p>
