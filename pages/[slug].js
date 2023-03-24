import Message from "../components/message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export default function Details() {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessages] = useState([]);

  //Submit a message
  const submitMessage = async () => {
    //Check if the user is logged
    if (!auth.currentUser) return router.push("/auth/login");

    if (!message) {
      console.log(message);
      toast.error("Don't leave an empty message ", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    const docRef = doc(db, "posts", routeData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        userName: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });
    setMessage("");
  };

  //Get Comments
  const getComments = async () => {
    const docRef = doc(db, "posts", routeData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data().comments);
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [router.isReady]);
  return (
    <div>
      <Message {...routeData}></Message>
      <div className="my-4">
        <div className="flex">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            placeholder="Comment here "
            className="bg-slate-600 text-xl font-popin w-full rounded-l-full p-4 text-emerald-50 text-sm"
          />
          <button
            onClick={submitMessage}
            className="bg-emerald-300 text-xl rounded-r-full font-popin text-slate-900 py-2 px-6 text-sm"
          >
            Submit
          </button>
        </div>
        <div className="py-6">
          <h2 className="font-popin font-popin text-emerald-100 text-2xl">Write your Comments, or any questions you have.</h2>
          {allMessage?.map((message) => (
            <div className="bg-cyan-50 border-violet-300 p-4 my-4 border-4 rounded-xl" key={message.time}>
              <div className="flex items-center gap-2 mb-4">
                <img
                  className="w-10 rounded-full"
                  src={message.avatar}
                  alt=""
                />
                <h2 className="font-popin text-xl">{message.userName}</h2>
              </div>
              <h2 className="font-popin text-lg ">{message.message}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}