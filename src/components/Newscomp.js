import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class Newscomp extends Component {
    static defaultProps={
       country:'in',
       pagesize:8,
       category: 'general'
    }

    static propTypes={
        country: PropTypes.string,
        pagesize:PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFunc =(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor (props){
        super(props);
        this.state={
            articles: [],
            loading: false,
            page:1,
            totalResults:0
        }
        document.title=`DailyNews- ${this.capitalizeFunc(this.props.category)}`
    }

<<<<<<< HEAD
   async updateNews(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0d85607882e2420a847f4d5db27d9097&page=${this.state.page}&pagesize=${this.props.pagesize}`
        this.setState({loading: true});
        let data=await fetch(url)
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    }

=======

    async updateNews(){
        this.props.setProgress(0);
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`
        this.setState({loading: true});
        let data=await fetch(url)
        this.props.setProgress(30);
        let parsedData= await data.json();
        this.props.setProgress(70);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);
    }

>>>>>>> 6fa6c4b (Infinite Scrollbar)
    async componentDidMount(){
        this.updateNews();
    }

    handlePrevious= async ()=>{
        this.setState({page: this.state.page - 1});
        this.updateNews();
    }

    handleNext= async ()=>{
    this.setState({page: this.state.page + 1});
    this.updateNews();
    }

    fetchMoreData = async() => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs              
        this.setState({page:this.state.page + 1});
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`
        let data=await fetch(url)
        let parsedData= await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults})

      };
    

    render() {
    return (
        <>
        <h1 className='text-center' style={{margin: '40px 0px'}}>DailyNews - Top {this.capitalizeFunc(this.props.category)} Headlines </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
            
      <div className='container'>
              <div className='row'>
                { this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>                
                })}
        </div> 
    </div>
        </InfiniteScroll>
        {/* // <div className="container d-flex justify-content-between">
        // <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
        // <button disabled={this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        // </div> */}
        </>
    )
  }
}

export default Newscomp
