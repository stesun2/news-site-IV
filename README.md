# News Site Part IV

## High Level Objectives
1. Build the Section Page - a page that displays articles for a specific section.
2. Create article search feature on Home Page

## Initial Setup
If you want to use your own code, go ahead and copy the entire `src` directory from your `news-site-III` repo and paste it directly into this repo (replacing the solution code provided here in `src`).

Once you've copied over these files, run `npm install ; npm run start` - verify that no errors appear in your browser console or terminal, and that your app functions the same as it did in the last challenge.

## The Section Page
The Section Page will be used to display articles that belong to a specific section (specifically, "Opinion", "World", "National",  or "Business").  The Section Page should be loaded when a user clicks on one of these options in the top navigation.

The route that should display a section page should be `/sections/:sectionID`, where the `:sectionID` parameter would be one of the supported sections (listed above).  For example, Clicking on the "World" link in the top navigation would redirect to http://localhost:3000/sections/world - this page would only display articles whose "section" property is set to "world".

To accomplish this, you will need to:

1. Create `SectionPage.js` inside of `src/pages`
2. Define the route `/sections/:sectionID` to point to `SectionPage.js`
3. Within `SectionPage.js`, utilize the `fetchArticlesBySection(section)` function you created in the News Site III challenge to retrieve articles by a specific section, and store the response in state - in `this.state.articles`.
4. Pass `this.state.articles` into the `<ArticleList>` component, thereby rendering the `ArticleList` with articles for the desired section.

**Tip:** `SectionPage.js` is going to be almost identical to `HomePage.js`.  Consider copying the code from `HomePage.js` and pasting it into `SectionPage.js`, and adjusting it per the specifications above.

While developing, attempt to load **http://localhost:3000/sections/world** - once this page is displaying the correct content, you may proceed.

## Section Links in `AppNav.js`
In the current iteration of `AppNav.js`, the component accepts a function prop called `handleNavClick` - the function provided via that prop is called when one of the Nav Items/Section links is clicked.  Ultimately, we were going to use this functionality to redirect/link to the section pages, but there is a better way.  We can simply use the `Link` component that `react-router` provides to us to create the link button.

 1. Delete the `handleNavClick` prop that's being passed into the `AppNav` component in `App.js`. Make sure the `<AppNav />` component is nested under `<Router>`.
 2. Remove references to the deprecated method in `AppNav.js`.
 3. In `AppNav.js`, modify the array of nav items that we're creating by mapping through the array that we're importing from `config/Sections.js`. These should now return `<Link>`s.

**Hint:** We're already using `<Link>`s to navigate to individual articles. If you're stuck, take a look at `ArticleTeaser.js`.

Once these changes are complete, you should be able to successfully navigate to Section Pages using the top navigation.

**Tip:** Typically, we put calls to fetch data in the `componentDidMount()` method.  You should do that here as well, but there is another scenario to account for.  If you go from one section page to another (e.g. going from "Opinion" to "World"), the fetch call that you made in `componentDidMount()` will not occur again - the `SectionPage`, at this point, has been and is mounted.  Instead, you will need to hook into the `componentDidUpdate()` method and add your fetch request here. You'll need to add a condition in this function to avoid an infinite loop. Check out the docs on `componentDidUpdate()` [here](https://reactjs.org/docs/react-component.html#componentdidupdate).

**Note for Functional Component refactor:** Since `useEffect()` runs on all component updates by default, all of your fetch logic can be contained in one `useEffect()`. Remember that the second paramater of `useEffect()` is an optional array of what state to track/subscribe to. Previously, we've only included one piece of state in this array (`article` in the `ArticlePage` component and `articles` in the `HomePage` component). This time, however, there is a second piece of state that could change: `props.match.params.sectionID`. When writing your `useEffect()` think about the two conditions that should trigger a re-fetching of articles and be sure to include a conditional statement for each one.

## Article Search

Let's add the ability to search for articles on the Home Page.  In order to accomplish this, the high-level things we need to build are:

1. Add a new function in `src/api/ArticlesAPI.js` that accepts a search term, constructs a filter object using that search term, and then fetches data from the API
2. Add an input box to the `src/pages/HomePage` component that calls the function above, and updates state.

**ArticlesAPI.js**

Create a new method in `ArticlesAPI.js` called `searchArticles(text)`.  **This function should be almost identical to fetchArticlesBySection** - the only difference is the filter object that's included in the request.

The filter object that can be used to return articles from the API that contain text looks like this:

```javascript
{
  where: {
    title: {
      ilike: textToSearchFor
    }
  }
}
```

As with `fetchArticlesBySection()`, `searchArticles()` should be an async/await.

**HomePage.js**

As mentioned above, you will want to add a text input to the `HomePage`.  Why not use Reactstrap's nicely styled text input? (Remember that you'll need to import all of these new libraries from `reactstrap` at the top of your file!) Go ahead and put this above your `<ArticleList>` component:

```javascript
<InputGroup>
  <Input onChange={(e) => this.handleSearch(e)} type="text" placeholder="Search" />
</InputGroup>
```

Note that we've provided the method that should be called from the `onChange` event - it's a class method called `handleSearch()`. (Javascript note: Here we've chosen to  use an arrow function to preserve the context of `this` in the `handleSearch` method. This can also be accomplished via [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind): `onChange={this.handleSearch.bind(this)}`.)
Create the `handleSearch()` class method on the `HomePage.js` component.  Within this event handler, you should (a) extract the value of the text input, (b) call `ArticlesAPI.searchArticles(textToSearchFor)`, and then (c) call `this.setState()` and set the json returned from the API to the "articles" object within your state object. Also consider what should happen if a user deletes their search text... we probably shouldn't just leave the page blank. Be sure to handle that use case!

```javascript
handleSearch(event) {
  const textToSearchFor = event.target.value;
  // Add call to ArticlesAPI.searchArticles
  // and subsequently the code to
  // put the results from that call into
  // state.
}
```

If these steps are completed successfully, the list of articles displayed on the home page should change as you interact with the text box.

**Note for Functional Component refactor:** Since `useEffect()` can be used to track multiple state changes, let's add another piece of state to the `HomePage` component so that we can track the search text and update the articles accordingly:
```javascript
const [ searchText, setSearchText ] = React.useState('');
```
Now, all the `handleSearch()` method needs to do is update the search text:
```javascript
const handleSearch = (e) => setSearchText(e.target.value);
```
Finally, add `searchText` to the array of state that `useEffect()` will track, and update the `useEffect()` method to account for the `searchText`.

## Next Steps
1. Open your `functional-version` branch and refactor away! Be sure to go back to the special **Note**s for functional component refactoring in the previous sections.
2. There is quite a bit of repeated code and our code base is not organized very well at all! Refactor the code base to something you can be proud of. You can choose to do this in _either_ your master branch OR your `functional-version` branch. Or both if you have time!

## Extended Challenge #1
Can you extend the search feature to work for the Home or any Section page? *HINT: Consider moving the search input to the AppNav component!*

## Extended Challenge #2
There is a something bad about our current design for filtering articles. Currently, we're making an API call for **every** character that a user types into the search field. This may seem okay when our total data size is around 40 articles, but imagine what would happen if we had to serve 40,000 articles, or even worse, 40 million articles! Making so many API calls is not the best design, especially if it can be avoided. In this case, there should be a way to cut down the number of API calls we need to make, right? Think about all of the tools we have at our disposal... <ins>can you update the design of News Site so that the filtering functionality is retained, but our total API calls are reduced?</ins>
