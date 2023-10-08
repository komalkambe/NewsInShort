import React, { Component } from 'react'

export class NewsItems extends Component {



  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
    <div>
        <div className="card">
            <img src={!imageUrl?"https://i.ytimg.com/vi/fLPBw_lEs_Q/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLBPce0cqh60ZQum8EMuzCWxh8te_w" :imageUrl }className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...  <span class="position-absolute top-0 translate-middle badge rounded-pill bg-secondary" style={{left: '90%', zIndex:'1'}}>{source}
    
               {/* <span class="visually-hidden">unread messages</span> */}
            </span></h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className='text-muted'>By {!author? "Unknown": author} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-danger">Read More</a>
            </div>
        </div>
    </div>
    )
  }
}

export default NewsItems
