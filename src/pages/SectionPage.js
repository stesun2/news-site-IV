import { Component } from 'react' 
import ArticleList from '../components/ArticleList/ArticleList'
import { fetchArticlesBySection } from '../api/ArticlesAPI' 

class SectionPage extends Component {
    state = {
        articles: []
    }
}