import React, { ReactNode, useEffect, useState } from "react"

const postUrl = "http://localhost:5000/post"
const userUrl = "http://localhost:5000/user/me"

enum Status {
  OK = 200,
  Unauthorized = 401
}

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

export default function Home() {
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
      .then((response: Response) => {
        if (response.ok) return response.json()
        if (response.status === Status.Unauthorized) window.location.href = "/signin"
      })
      .then(response => {
        console.log(response);
        
        setUser(response.user)
      })
  }, [])

  return (
    <main>
      <div className="profile">
        <p>Welcome, <u>{user?.name}!</u></p>
      </div>
      <div className="post">
        {posts?.map((post, index) => (
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
