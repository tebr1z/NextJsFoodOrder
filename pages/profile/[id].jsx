import axios from "axios";
import {signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Account from "../../components/profile/Account";
import Order from "../../components/profile/Order";
import Password from "../../components/profile/Password";

const Profile = ({ user }) => {
  const { data: session } = useSession();
  const [tabs, setTabs] = useState(0);
  const { push } = useRouter();


  const handleSignOut = () => {
    setSignOutConfirmation(true); // Show the confirmation dialog
  };

  const confirmSignOut = () => {
    signOut({ redirect: false });
    push("/auth/login");
    setSignOutConfirmation(false); // Close the confirmation dialog
  };

  const [showSignOutConfirmation, setSignOutConfirmation] = useState(false);
  
  useEffect(() => {
    if (!session) {
    
      push("/auth/login");
    }
  }, [session, push]);

  return (
    <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col lg:mb-0 mb-10">
      <div className="lg:w-80 w-100 flex-shrink-0">
        <div className="relative flex flex-col items-center px-10 py-5 border border-b-0">
          <Image
             src={session?.user?.image || user.image || "/images/profile.png"}
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
           <b className="text-2xl mt-1">{user.fullName}</b>
        </div>
        <ul className="text-center font-semibold">
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 0 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(0)}
          >
            <i className="fa fa-home"></i>
            <button className="ml-1 ">Account</button>
          </li>
          <li
            className={`border border-t-0 w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 1 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(1)}
          >
            <i className="fa fa-key"></i>
            <button className="ml-1">Password</button>
          </li>
          <li
            className={`border border-t-0 w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 2 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(2)}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Orders</button>
          </li>
          <li
            className={`border border-t-0 w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all`}
            onClick={handleSignOut}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-1">Exit</button>
          </li>
        </ul>
      </div>
      {tabs === 0 && <Account user={user} />}
      {tabs === 1 && <Password user={user} />}
      {tabs === 2 && <Order />}

      {showSignOutConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-8 rounded-md text-center">
            <p className="text-lg mb-4">Are you sure you want to sign out?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => setSignOutConfirmation(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={confirmSignOut}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps({ req, params }) {
  

 

  const user = await axios.get(
  `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`
);

  return {
    props: {
      user: user ? user.data : null,
    },
  };
}




export default Profile;
