import React from 'react'

const NewsItem=(props)=>  { 
  let {title,description,imgUrl,newsUrl,badgeText}=props;

    const safeTitle = title ? String(title) : 'Untitled';
    const safeDescription = description ? String(description) : 'No description available.';

    const displayTitle = safeTitle.length > 80 ? `${safeTitle.slice(0, 80)}…` : safeTitle;
    const displayDescription =
      safeDescription.length > 140 ? `${safeDescription.slice(0, 140)}…` : safeDescription;

    return (
      <div className="card h-100 nm-card">
        <img
          src={imgUrl?imgUrl:"https://a.espncdn.com/combiner/i?img=%2Fphoto%2F2025%2F1118%2Fr1577429_1296x729_16%2D9.jpg"}
          className="card-img-top"
          alt={displayTitle}
          style={{ height: '180px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className="badge text-bg-secondary">{badgeText || 'News'}</span>
          </div>
          <h5 className="card-title">{displayTitle}</h5>
          <p className="card-text">{displayDescription}</p>
          <a
            href={newsUrl || '#'}
            rel="noreferrer"
            className={`btn btn-secondary mt-auto${newsUrl ? '' : ' disabled'}`}
            target="_blank"
            aria-disabled={!newsUrl}
          >
            Read More
          </a>
        </div>
      </div>
    )
}

export default NewsItem
