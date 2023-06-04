import { User } from "firebase/auth";

type UserAvatarProps = {
  user: User | null;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <div>
      <div className="border border-black rounded-full h-8 w-8 overflow-hidden">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="User profile" className="h-full w-full object-cover" />
        ) : (
          <div className="bg-blue-500 w-8 h-8" />
        )}
      </div>
    </div>
  );
};

export default UserAvatar;
