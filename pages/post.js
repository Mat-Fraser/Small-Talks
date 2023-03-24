import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addDoc, collection, doc, serverTimestamp,updateDoc} from "firebase/firestore";


export default function Post() {
  //Form state
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const routeData = route.query;

  //Submit Post
  const submitPost = async (e) => {
    e.preventDefault();
    //Run checks for description
    if (!post.description) {
      toast.error("Description Field empty 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    if (post.description.length > 300) {
      toast.error("Description too long 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    if (post?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id);
      const updatedPost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedPost);
      return route.push("/");
    } else {
      //Make a new post
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPost({ description: "" });
      toast.success("Post has been made 🚀", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return route.push("/");
    }
  };

  //Check our user
  const checkUser = async () => {
    if (loading) return;
    if (!user) route.push("/auth/login");
    if (routeData.id) {
      setPost({ description: routeData.description, id: routeData.id });
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);

    return(
        <div className="my-20 p-12 bg-cyan-50 shadow-lg rounded-3xl max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-3xl font-popin font-bold text-center">
         Create Post
        </h1>
        <div className="py-2">
          <h3 className="text-xl text-center font-popin py-2">Description</h3>
            <textarea 
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-slate-500 h-48 w-full font-popin text-white text-xl rounded-lg p-2 text-sm"></textarea>
            <p
            className={`text-cyan-600 font-medium text-sm ${
              post.description.length > 250 ? "text-red-600" : ""
            }`}
          >
                {post.description.length}/250</p>
        </div>
        <button
          type="submit"
          className="postingbtn w-full bg-cyan-800 text-white font-popin py-3 px-5 p-2 my-2 rounded-3xl textx-2xl"
        >
          Submit
        </button>
            </form>
        </div>
    );
          }