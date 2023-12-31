import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinnerr from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
      country:'in',
      pageSize: 8,
      category: 'general',
    } 
    static propTypes = {
      country:PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string,
    }
  

    constructor() {
      super();
      this.state = {
        articles: [],
        loading: false,
        page:1
      }
    }

//FECTHING NEWS API HERE
  async componentDidMount() {
    let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79df94aa0a09410dbc1643349dc417a7&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url); 
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false
    })
  }


   handlePreviousClick = async () => {
    console.log("Previous");

    let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79df94aa0a09410dbc1643349dc417a7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

    this.setState({loading:true});
        
    let data = await fetch(url); 
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false 
    })
   
  }
  

   handleNextClick = async() => {
    console.log("Next");

    if( !(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
      {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79df94aa0a09410dbc1643349dc417a7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

        this.setState({loading:true});

        let data = await fetch(url); 
        let parsedData = await data.json();
        console.log(parsedData);
    
        this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading: false       
        })
      }    
  
  
   }

  render() 

  {
   
    return (
      <div className='container my-3'>
       <b><em> <h1 className='text-center' style={{margin:`60px 0px;`}}>NewsInShort - Top Headlines</h1></em></b>

       { this.state.loading && <Spinnerr/>}
        <div className='row my-4'>
              {!this.state.loading && this.state.articles.map((element)=> {
              return <div className='col-md-4' key={element.url}>

              <NewsItems  title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):element.title.slice(0, 88)} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>

              {/* <NewsItems  title={element.title?element.title:""} description={element.description?element.description:element.title} imageUrl={element.urlToImage} newsUrl={element.url}/>
              </div> */}
            })} 

            <div className='d-flex justify-content-between'>
              <button disabled={this.state.page<=1} type="button" className="btn btn-danger" onClick={this.handlePreviousClick}> &larr; Previous</button>
              <button disabled= {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-danger" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
            
        </div> 
      </div>
    )
  
}
}

export default News



