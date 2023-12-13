import React from 'react'

const NewsItem = (props) => {
    let {title, description, imageurl, newsUrl, author, date} = props
    return (
      <div>
        <div className="card">
                <img src={!imageurl ? "https://www.hindustantimes.com/ht-img/img/2023/12/07/550x309/INDIA-RATES-OUTLOOK-0_1701959684924_1701959740828.JPG" : imageurl} className="card-img-top" alt="..."/>
                {console.log(imageurl, "imageurl")}
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text" style = {{color : "red"}}>By {author ? author : "unknown"} at {new Date(date).toGMTString()}</p>
                    <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                 </div>
        </div>
      </div>
    )
  }


export default NewsItem
