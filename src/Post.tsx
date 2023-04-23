import React, { ReactNode, useEffect, useState } from "react"

const postUrl = "http://localhost:5000/post"
const userUrl = "http://localhost:5000/user/me"

export interface PostSchema {
  _id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  likesCount: number;
  excerpt: string | undefined;
  author: {
    _id: string,
    name: string
  }
  // updatedAt: Date;
  // deletedAt: Date | null;
}

export interface UserSchema {
  _id: string;
  name: string;
  age: string;
  friends: Array<UserSchema>;
  likes: Array<PostSchema["_id"]>;
}

function Post() {
  const [posts, setPosts] = useState<PostSchema[]>([])
  const [user, setUser] = useState<UserSchema>();
  useEffect(() => {
    fetch(postUrl, { credentials: "include" })
      .then(response => {
        return response.json()
      })
      .then(response => {
        setPosts(response.posts)
      })
  }, [])
  useEffect(() => {
    fetch(userUrl, { credentials: "include" })
      .then(response => {
        return response.json()
      })
      .then(response => {
        setUser(response.user)
      })
  }, [])

  return (
    <main>
      <div className="profile">
        <div>
          {user?.name}
        </div>
      </div>
      <div className="post">
        {posts.map((post, index) => (
          <div key={index}>
            <p>{post.author.name}</p>
            <p>{new Intl.DateTimeFormat('id', { dateStyle: 'full' }).format(new Date(post.createdAt))}</p>
            <h2>{post.title}</h2>
            <p>{post.excerpt ?? (post.content.length >= 150) ? post.content.substring(0, 150).concat("...") : post.content.substring(0, 150)}</p>
          </div>
        ))}
      </div>
      <div className="other">
        <div className="friend">
          <h2>Friends</h2>
          {!(user?.friends) ? user?.friends.map((friend) =>
            (<div>{friend.name}</div>)
          ) : <p>You have no friend</p>}
        </div>
      </div>
    </main>
  )
}

export default Post
