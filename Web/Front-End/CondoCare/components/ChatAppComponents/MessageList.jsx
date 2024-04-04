import React from "react";
import Message from "./Message";
import { useStore } from "../../store/store";
import Threads from "./Threads";

const MessageList = () => {
  /**
   * posts: {
   *  post: PostData;
   *  replies: PostData[] (sort by posted_at)
   * }[]
   */
  let posts = [];
  const [state, dispatch] = useStore();

  const { postData } = state;
  filterPostData(postData, posts);

  return (
    <div className="message-list">
      {posts.map((msg) => {
        let hasThread = msg.replies.length > 0;
        return (
          <>
            <Message
              key={msg.post.post_id}
              posted_at={msg.post.posted_at}
              creator_name={msg.post.creator_name}
              content={msg.post.content}
            />
            {hasThread ? <Threads replies={msg.replies} /> : ""}
          </>
        );
      })}
    </div>
  );
};

export default MessageList;

/**
 * Filters and sorts post data into a tree structure of parent posts and replies.
 *
 * Sorts posts so parents come before replies. Extracts parent posts into
 * separate objects with empty reply arrays. Pushes replies into the reply
 * array of the parent post they are in response to.
 * Finally sorts replies in each post by timestamp.
 *
 * @param {PostData[]} postData - Array of post data objects
 * @param {{post: PostData; replies: PostData[]}[]} posts - Array to contain transformed post tree objects
 */
function filterPostData(postData, posts) {
  const sortedPosts = postData.sort((a, b) => {
    if (!a.replied_to && b.replied_to) return -1;
    else if (a.replied_to && !b.replied_to) return 1;
    return 0;
  });

  let count = 0;
  while (!sortedPosts[count].replied_to) {
    posts.push({
      post: sortedPosts[count],
      replies: [],
    });
    count++;
  }

  posts = posts.sort((a, b) => {
    if (new Date(a.post.posted_at) > new Date(b.post.posted_at)) return -1;
    else if (new Date(a.post.posted_at) < new Date(b.post.posted_at)) return 1;
    return 0;
  });

  for (let i = count; i < sortedPosts.length; i++) {
    posts[
      posts.findIndex((obj) => obj.post.post_id === sortedPosts[i].replied_to)
    ].replies.push(sortedPosts[i]);
  }

  posts.forEach((post) => ({
    ...post,
    replies: post.replies.sort(
      (a, b) => new Date(a.posted_at) - new Date(b.posted_at)
    ),
  }));
}
