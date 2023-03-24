import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {

    const [user, loading] = useAuthState(auth);
    return(
    <nav className="flex justify-between items-center py-10">
      <Link href="/">
        <button className="mobile-tit text-7xl text-cyan-200 tracking-widest font-pop font-bold tracking-wide">Small Talks </button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link legacyBehavior href={"/auth/login"}>
            <a className="mobile py-3 px-5 text-2xl text-medium bg-emerald-200 text-cyan-900 rounded-3xl font-popin ml-8">
              Join Now
            </a>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link href="/post">
              <button className="mobile font-popin bg-emerald-200 text-slate-900 py-3 px-5 rounded-3xl textx-lg">
                Post
              </button>
            </Link>
            <Link href="/dashboard">
            <img
                className="pic w-20 rounded-3xl border-solid border-2 border-emerald-100 cursor-pointer"
                src={user.photoURL}
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
);
}