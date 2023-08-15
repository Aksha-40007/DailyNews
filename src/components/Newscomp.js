import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


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
            page:1
        }
        document.title=`DailyNews- ${this.capitalizeFunc(this.props.category)}`
    }

    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0d85607882e2420a847f4d5db27d9097&page=${this.state.page}&pagesize=${this.props.pagesize}`
        this.setState({loading: true});
        let data=await fetch(url)
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    }

    async updateNews(){
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
    render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin: '40px 0px'}}>DailyNews - Top {this.capitalizeFunc(this.props.category)} Headlines </h1>
        {this.state.loading && <Spinner/>}
        <div className='row'>
                {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>                
                })}
        </div> 
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
        <button disabled={this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default Newscomp
