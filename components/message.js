
export default function Message({ children, avatar, username, description }) {
    return (
      <div className="msg bg-cyan-50 font-popin border-stone-300 p-10 mb-3 border-b-2 border-l-2 rounded-l-full rounded-r-full">
        <div className="flex items-center gap-3">
          <img src={avatar} className="msgpic w-14 rounded-2xl" />
          <h2 className="msgheading">{username}</h2>
        </div>
        <div className="msgdesc py-4">
          <p>{description}</p>
        </div>
        {children}
      </div>
    );
  }