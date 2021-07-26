import React, { Component } from 'react';
import ArticleList from '../components/ArticleList/ArticleList.js'
import { fetchArticles, searchArticles } from '../api/ArticlesAPI';
import { InputGroup, Input } from 'reactstrap';

class HomePage extends Component {
  state = {
    articles: []
  };

  async componentDidMount() {
    try {
      const articlesJson = await fetchArticles();
      this.setState({ articles: articlesJson });
    } catch (e) {
      console.error('error fetching articles: ', e);
    }
  }

  async handleSearch(event) {
    const textToSearchFor = event.target.value;
    let articlesJson = await searchArticles(textToSearchFor)
    
    this.setState({
      articles: articlesJson
    })
    // Add call to ArticlesAPI.searchArticles
    // and subsequently the code to
    // put the results from that call into
    // state.
  }
  

  render() {
    return (
      <div>
        <InputGroup>
          <Input type="text" placeholder="Search" onChange={(event) => this.handleSearch(event)}></Input>
        </InputGroup>
        <ArticleList articles={this.state.articles} />
      </div>
    );
  }
}

export default HomePage;


// Functional solution:
// function HomePage(props) {
//   const [ articles, setArticles ] = React.useState([]);

//   React.useEffect(() => {
//     const fetchArticlesAsync = async () => {
//       try {
//         const articlesJson = await fetchArticles();
//         setArticles(articlesJson);
//       } catch (e) {
//         console.error('error fetching articles: ', e);
//       }
//     };

//     if (!articles.length) {
//       fetchArticlesAsync();
//     }
//   }, [articles])

//   return (
//     <div>
//       <ArticleList articles={articles} />
//     </div>
//   );
// }
