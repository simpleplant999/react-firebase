import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import {
  addDoc,
  getDocs,
  collection,
  doc,
  documentId,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { Post } from "./components/Post";
import { CreateForm } from "./components/CreateForm";

export const Home = () => {
  const [user] = useAuthState(auth);

  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState(null);
  const [postBody, setPostBody] = useState(null);

  const postRef = collection(db, "posts");
  const likesRef = collection(db, "likes");

  const getPosts = async () => {
    const data = await getDocs(postRef);
    console.log(data);
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleCreatePost = async () => {
    await addDoc(postRef, {
      title: postTitle,
      body: postBody,
      username: user.displayName,
      userId: user.uid,
      userPhoto: user.photoURL,
    });
    setPostTitle(null);
    setPostBody(null);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          {user && (
            <div className="col-md-3">
              <div className="card">
                <div className="card-body text-center">
                  <img
                    src={user?.photoURL}
                    className="rounded-circle border mb-3"
                    width={100}
                    height={100}
                    alt=""
                  />
                  <h5>{user?.displayName}</h5>
                  <p className="text-muted">{user.email}</p>
                </div>
              </div>
            </div>
          )}
          <div className={`${user ? "col-md-6" : "col-md-12"}`}>
            <CreateForm
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleCreatePost={handleCreatePost}
            />
            {posts.length > 0 &&
              posts.map((post) => {
                return <Post post={post} key={post.id} getPosts={getPosts} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
