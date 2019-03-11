# News Site Part IV

## High Level Objectives
1. Build the Section Page - a page that displays articles for a specific section.
2. Create article search feature on Home Page 

## Initial Setup
You will want to copy over the work you did in the News Site III challenge into this repo - this time, you can copy and paste the entire `src` directory from the `news-site-III` repo and paste it directly into this repo.

Once you've copied over these files, run `npm install ; npm run start` - verify that no errors appear in your browser console or terminal, and that your app functions the same as it did in the last challenge.

## The Section Page
The Section Page will be used to display articles that belong to a specific section (specifically, "Opinion", "World", "National",  or "Business").  The Section Page should be loaded when a user clicks on one of these options in the top navigation.

The route that should display a section page should be `/sections/:sectionID`, where the :sectionID parameter would be one of the supported sections (listed above).  For example, Clicking on the "World" link in the top navigation would redirect to http://localhost:3000/section/world - this page would only display articles whose "section" property is set to "world".

To accomplish this, you will need to:

1. Create `SectionPage.js` inside of `src/pages`
2. Define the route `/sections/:sectionID` to point to `SectionPage.js`
3. Within `SectionPage.js`, utilize the `fetchArticlesBySection(section)` function you created in the News Site III challenge to retrieve articles by a specific section, and store the response in state - in `this.state.articles`.
4. Pass `this.state.articles` into the `<ArticleList>` component, thereby rendering the `ArticleList` with articles for the desired section.

**Tip 1:** `SectionPage.js` is going to be almost identical to `HomePage.js`.  Consider copying the code from `HomePage.js` and pasting it into `SectionPage.js`, and adjusting it per the specifications above.

**Tip 2:** Typically, we put calls to fetch data in the `componentDidMount()` method.  You should do that here as well, but there is another scenario to account for.  If you go from one section page to another (e.g. going from "Opinion" to "World"), the fetch call that you made in `componentDidMount()` will not occur again - the `SectionPage`, at this point, has been and is mounted.  Instead, you will need to hook into the `componentDidUpdate()` method and add your fetch request here. You'll need to add a condition in this function to avoid an infinite loop. Check out the docs on `componentDidUpdate()` [here](https://reactjs.org/docs/react-component.html). 

While developing, attempt to load **http://localhost:3000/sections/world** - once this page is displaying the correct content, you may proceed.

## Section Links in App`AppNav.js`

In the current iteration of `AppNav.js`, the component accepts a function prop called `handleNavClick` - the function provided via that prop is called when one of the Nav Items/Section links is clicked.  Ultimately, we were going to use this functionality to redirect/link to the section pages, but there is a better way.  We can simply use the `Link` component that `react-router` provides to us to create the link button.

 1. Delete the `handleNavClick` prop that's being passed into the `AppNav` component in `App.js`
 2. Remove references to it in `AppNav.js`
 3. In `AppNav.js`, modify the array of nav items that we're creating by mapping through the array that we're importing from `config/Sections.js`:

Before: 

```javascript
const navItems = NavItems.map(
  (navItem, index) => <NavItem eventKey={index} onClick={() => this.props.handleNavClick(navItem.value)}>{navItem['label']} </NavItem>
)
```

After:

```javascript
const navItems = NavItems.map((navItem, index) => {
  return (
    <li key={index}><Link to={`/sections/${navItem.value}`}>{navItem.label}</Link></li>
  );
});
```

`Link` is a React library that's part of `react-router-dom`. You will need to add the following line to the top of `AppNav.js`:

```javascipt
import { Link } from 'react-router-dom';
```

Within `AppNav.js`, you will also need to modify the node/element that contains the `navItems` variable.  Previously, `navItems` was being placed inside of a Bootstrap `<Nav>` element:

```javascript
<Nav>
  {navItems}  
</Nav>
```

You will want to replace the `<Nav>` component used here with a simple `<ul>`:
```javascript
<ul className="nav navbar-nav">
  {navItems}
</ul>
```

Why did we do all of this?  React Router's `<Link>` component cannot be used inside React Bootstrap's `<NavItem>` component, and vice versa.  The benefit of using `<NavItem>` was purely cosmetic - it provided styling to our navigation elements.  Using React Router's `<Link>` component reduced complexity in our app - we no longer had to worry about passing callback functions around through props in order to change the page.  The styling that React Bootstrap's `<NavItem>` component provided was also easily recreatable - by structuring markup and adding CSS classes, we could manually achieve the same styling.

Once these changes are complete, you should be able to successfully navigate to Section Pages using the top navigation.

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

As with `fetchArticlesBySection()`, `searchArticles()` should return a Fetch promise.

**HomePage.js**

As mentioned above, you will want to add a text input to the HomePage.  Why not use React Bootstrap's nicely styled text input? (Remember that you'll need to import all of these new libraries from `react-bootstrap` at the top of your file!)

```javascript
<FormGroup>
  <FormControl onChange={this.handleSearch.bind(this)} type="text" placeholder="Search" />
</FormGroup>
```

Note that I've provided the method that should be called from the `onChange` event - it's a class method called `handleSearch()`.  Create this class method on the `HomePage.js` component.  Within this event handler, you should (a) extract the value of the text input, (b) call `ArticlesAPI.searchArticles(textToSearchFor)`, and then (c) call `this.setState()` and set the json returned from the API to the "articles" object within your state object.

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

## Next Steps
There is quite a bit of repeated code and our code base is not organized very well at all! Refactor the code base to something you can be proud of.
