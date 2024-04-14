import { useState } from "react";
import Message from "./Message";

const Threads = ({ replies }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="thread-message">
      {collapsed ? (
        <span className="collapse-thread-button" onClick={toggleCollapse}>+ Show all</span>
      ) : (
        <>
          {replies.map((message) => (
            <div key={message.post_id} style={{ marginLeft: 70  }}>
              <Message {...message} />
            </div>
          ))}
          {replies.length > 0 && (
            <span className="collapse-thread-button" onClick={toggleCollapse}>
              - Show Less
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default Threads;
