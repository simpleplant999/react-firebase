import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../config/firebase";

export const Post = (props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState(null);
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const handleLikePost = async (postId) => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user.uid,
        postId: postId,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlikePost = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user.uid)
      );

      const likeToDeleteDate = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteDate.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const userLiked = likes?.find((like) => like.userId == user.uid);

  useEffect(() => {
    getLikes();
  }, []);
  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center mb-3">
              <img
                src={post.userPhoto}
                className="rounded-circle border me-3"
                width={50}
                height={50}
                alt=""
              />
              <h6>{post.username}</h6>
            </div>
            <div className="text-end d-flex align-items-start ">
              <div className="d-flex align-items-center">
                <p className="text-muted mb-1 me-1">{likes && likes.length}</p>
                {!userLiked ? (
                  <svg
                    onClick={() => {
                      handleLikePost(post.id);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-heart text-secondary hand"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>
                ) : (
                  <svg
                    onClick={() => {
                      handleUnlikePost(post.id);
                    }}
                    xmlns="
                   http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-heart-fill text-danger hand"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <h6 className="text-primary">{post.title}</h6>
          <p className="text-muted">{post.body}</p>
        </div>
      </div>
    </>
  );
};
