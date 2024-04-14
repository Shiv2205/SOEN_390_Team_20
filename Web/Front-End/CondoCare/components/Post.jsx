
const Post = ({ content, creator_id, posted_at }) => {
    // Convert the provided ISO date string to a more readable format
    const date = new Date(posted_at).toLocaleString();
  
    return (
      <div className="message-item">
        <div className="message-content">{content}</div>
        <div className="message-footer">
          <span className="message-creator">User ID: {creator_id}</span>
          <span className="message-timestamp">{date}</span>
        </div>
      </div>
    );
  };
  