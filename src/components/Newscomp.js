import React, {useState, useEffect} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const Newscomp = (props) => {

    const [articles, setArticles]=useState([])
    const [loading, setLoading]=useState(true)
    const [page, setPage]=useState(1)
    const [totalResults, setTotalResults]=useState(0)

    const capitalizeFunc =(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews= async ()=>{
        props.setProgress(0);
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`
        setLoading(true)
        let data=await fetch(url)
        props.setProgress(30);
        let parsedData= await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false)
        props.setProgress(100);
    }
    
    useEffect(() => {
        document.title=`DailyNews- ${capitalizeFunc(props.category)}`
        updateNews();
        //eslint-disable-next-line   
    }, [])

    // const handlePrevious= async ()=>{
    //     setPage(page-1)
    //     updateNews();
    // }

    // const handleNext= async ()=>{
    //     setPage(page+1)
    //     updateNews();
    // }

    const fetchMoreData = async() => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs              
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pagesize}`
        setPage(page+1)
        let data=await fetch(url)
        let parsedData= await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      }
    return (
        <>
        <h1 className='text-center' style={{margin: '40px 0px', marginTop: '90px'}}>DailyNews - Top {capitalizeFunc(props.category)} Headlines </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
            
      <div className='container'>
              <div className='row'>
                {articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title ? element.title : ""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>                
                })}
        </div> 
    </div>
        </InfiniteScroll>
        {/* // <div className="container d-flex justify-content-between">
        // <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
        // <button disabled={this.state.page + 1> Math.ceil(this.state.totalResults/props.pagesize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        // </div> */}
        </>
    )
}

Newscomp.defaultProps={
    country:'in',
    pagesize:8,
    category: 'general'
 }

 Newscomp.propTypes={
     country: PropTypes.string,
     pagesize:PropTypes.number,
     category: PropTypes.string
 }

export default Newscomp
