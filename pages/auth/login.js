import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {

    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    //Sign in with google
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        route.push("/");
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
        if (user) {
          route.push("/");
        } else {
          console.log("login");
        }
      }, [user]);

return(
    <div className="shadow-2xl mt-32 mb-32 p-10 bg-cyan-50 text-gray-700 rounded-lg">
    <h2 className="text-2xl font-bold font-popin text-center">Join Today</h2>
    <div className="py-4">
      <h3 className="py-4 font-popin text-xl text-center">Sign in with Google provider</h3>
      <button  
        onClick={GoogleLogin}
        className="text-white bg-gray-700 w-full font-popin rounded-lg flex align-middle p-4 gap-2">
        <FcGoogle className="text-2xl" />
        Sign in with Google
      </button>
    </div>
  </div>
)
};
  