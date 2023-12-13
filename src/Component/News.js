import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static deafaultProps = {

    country : "in",
    category : "general"

  }

  static propTypes = {
    country: propTypes.string,
    category : propTypes.string,
  }
      //  capitalized = (str) => {
      //      return str.chartAt(0).toUpperCase() + str.slice(1);
      //   }
       constructor(props){
        super(props);
        this.state = {
            articles:[],
            page:1
            // totalResults:0
        }
        document.title = `${this.props.category} "- News App"`
    }
async updatedNews (){
  let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=751bcce9d9ae4f56a3967d9ea0f41d3c&page=${this.state.page}&pagesize=12`);
  let parsedData = await data.json()
  this.setState({articles: parsedData.articles})
}
    async componentDidMount(){
      let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=751bcce9d9ae4f56a3967d9ea0f41d3c&page=1&pagesize=12`);
      let parsedData = await data.json()
      this.setState({articles: parsedData.articles})
    }
    handlePreviousClick=async() => {
    
      // let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=751bcce9d9ae4f56a3967d9ea0f41d3c&page=${this.state.page -1}&pagesize=12`);
      // let parsedData = await data.json()
      // this.setState({articles: parsedData.articles,
      //                 page: this.state.page -1
      // })
        this.setState ({page: this.state.page -1});
        this.updatedNews();
    }
    handleNextClick = async () => {
    //   console.log("next");
    //   if (this.state.page +1 > Math.ceil(this.state.totalResults/12)){

    //   }
    //   else {
    //   let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=751bcce9d9ae4f56a3967d9ea0f41d3c&page=${this.state.page +1}&pagesize=12`);
    //   let parsedData = await data.json()
    //   this.setState({page: this.state.page +1,
    //     articles: parsedData.articles
                      
    //   })
    // }
    this.setState ({page: this.state.page +1});
    this.updatedNews();
    }
    fetchMoreData = async () => {
      this.setState({page:this.state.page + 1})
      let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=751bcce9d9ae4f56a3967d9ea0f41d3c&page=${this.state.page}&pagesize=12`);
      let parsedData = await data.json()
      this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
  })
    }

  render() {
    return (
     
      <div className="container my-5">
       <h1 className="text-center" style = {{margin: '90px 0px 50px' }}>News App - Top Headlines from {this.props.category}</h1>
       
       
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4 className= "text-center" ><Spinner/> </h4>}
        >
              {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark my-3" onClick = {this.handlePreviousClick}>  &larr; Previous</button>
                    <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/12)} type="button" className="btn btn-dark my-3" onClick = {this.handleNextClick}>Next &rarr;</button>
                    </div> */}
                    <div className="container">
        <div className="row">
                  {this.state?.articles?.map((elem) => {
                   return <div className="col-md-4" key={elem.url}>
                    <NewsItem title={elem.title?elem.title.slice(0,44):""} description ={elem.description?elem.description.slice(0,88):""} imageurl ={elem.urlToImage}
                    newsUrl = {elem.url} author = {elem.author} date= {elem.publishedAt}/>
                    
                    </div>

            })}
           </div>
            {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark my-3" onClick = {this.handlePreviousClick}>  &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/12)} type="button" className="btn btn-dark my-3" onClick = {this.handleNextClick}>Next &rarr;</button>
                    </div> */}
            
        </div>
        </InfiniteScroll>
      </div>
      
    )
  }
}

export default News
