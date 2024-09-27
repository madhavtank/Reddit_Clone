# Greddit

Reddit Clone made in MERN stack.

### For starting the app:
- frontend : npm start (`Runs on port 3000`)
- backend : node server.js (`Runs on port 7000`)
- For making docker image : docker-compose up in parent directory

****

### Login and Registration Features:
1. **User Registration & Login**: Provides a registration page and login portal for users to create and access accounts.
2. **Logout Functionality**: Enables users to securely log out of their sessions.
3. **Authentication & Authorization**: Ensures proper authentication and authorization of user credentials for secure access.
4. **Input Validation**: Implements real-time input validation, disabling the submission button if the input is invalid.

****

**Upon login, the user is redirected to the main page.**  
Links to various other pages are provided in the navigation bar.

****

### Profile Page Features:
1. **User Details**: Displays basic user information with an option to edit details.
2. **Followers & Following List**: Shows a list of followers and users the person is following.
3. **Delete Functionality**: Allows the user to remove followers or unfollow others by clicking the delete icon next to their name.

****

### My Sub Greddiits Page:
1. **Create New Sub Greddiit**: Provides a button to create a new Sub Greddiit.
2. **Automatic Follower**: The creator is the first and default follower of any newly created Sub Greddiit.
3. **Moderated Sub Greddiits List**: Displays all Sub Greddiits where the user is the moderator.
4. **Detailed Sub Greddiit Cards**: Each card includes all relevant information about the Sub Greddiit.
5. **Delete Option**: Allows users to delete a Sub Greddiit along with all associated posts, reports, and data.
6. **Open Button**: A button to open the web page for each Sub Greddiit.

****

```Upon clicking the open button the user is navigated to a blank page with keyboard shortcuts and links in the navbar given to proceed further```

****

The Navbar contains link to four pages:
1. Users 
2. Joining Request Page 
3. Stats 
4. Reported Page 

****

### Users Page
1. Displays a list of the users who are and are not blocked.

****

### Joining Requests Page
1. Shows the list of Joining Requests of all the Users who have requested to Join the Sub Greddiit in Context. 
2. Button to accept the user.
3. Button to reject the user.

****

### Stats
Contains four graphs as follows:
1. Growth of the sub greddiit in terms of members over time.
2. Number of daily posts vs date.
3. Number of daily visitors vs date (visitors are counted by the number of people clicking the sub greddiit link).
4. Number of reported posts vs actually deleted posts based on reports on each date.

****

### Reported Page:
1. **List of Reports**: Displays all reports made on the Sub Greddiit, along with relevant details.
2. **Block User Option**:  
   - Button implemented with a 5-second timer before action is executed.  
   - If blocked, the user’s name is replaced with "Blocked User" in the post.  
   - The Sub Greddiit moderator can still view the original name in the report list.
3. **Delete Post Option**:  
   - Allows the moderator to delete the reported post.  
   - If a report is not addressed within 10 days, it is automatically removed without action.
4. **Ignore Report Option**:  
   - Fades out other action buttons when selected, indicating the report has been ignored.

****

### Sub Greddiits Page:
1. **List of Sub Greddiits**: Displays all existing Sub Greddiits.
2. **Search Bar**:  
   - Allows users to search for a Sub Greddiit by name.  
   - **Fuzzy Search** is implemented for better search results.
3. **Tag-based Filter**: Enables filtering of Sub Greddiits based on associated tags.
4. **Sorting Options**: Users can sort Sub Greddiits by:  
   - Name  
   - Number of Followers  
   - Creation Date
5. **Joined Sub Greddiits**:  
   - Displays Sub Greddiits the user has joined, each being clickable.  
   - **Leave Button**: Allows the user to leave a Sub Greddiit.  
     - Once left, the user cannot send a join request again.  
     - If a user tries to rejoin a previously left Sub Greddiit, an alert message is displayed.  
     - If the user is the moderator, the leave button is disabled.

---

**On clicking a Sub Greddiit**, the user is redirected to a page where the left side displays an image, name, and description associated with the selected Sub Greddiit.

---

### Specific Sub Greddiit Page:
1. **Create Post**: A button to create new text-based posts.
2. **Post List**: Displays all posts that have been posted so far.
3. **Post Features**: Each post includes:
   - **Upvote/Downvote Buttons**: For voting on posts.
   - **Commenting**: Allows users to comment on posts.
   - **Save Button**: Lets users save the post for future reference.
   - **Follow Button**: Enables users to follow the creator of the post.
4. **Banned Words Alert**: While creating a post, if banned words (set during Sub Greddiit creation) are detected, an alert is shown notifying the user of the prohibited content.

---

### Saved Post Page:
1. **Saved Posts**: Displays all posts saved by the logged-in user.
2. **Remove Button**: Allows the user to remove posts from the saved list.

---
