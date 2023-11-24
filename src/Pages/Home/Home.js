import React, { useContext, useState } from "react";
import "./Home.css";
import healthyHeart from "../../assets/images/healthyHeart.png";
import physicalHealth from "../../assets/images/physicalHealth.png";
import stress from "../../assets/images/stress.png";
import family from "../../assets/images/family.png";
import happy from "../../assets/images/happy.png";
import BloodChart from "../../components/Charts/BloodChart";
import Group from "./Group";
import { AuthContext } from "../../context/AuthProvider";
import CreateGroupPopup from "../../components/Popups/CreateGroupPopup";
import Loader from "../../components/Loader/Loader";
import AddGroup from "./AddGroup";
import AgeChart from "../../components/Charts/AgeChart";

const Home = () => {
  const { user, userGroupsDetails, userAllGroupsMembers, loading } =
    useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  if (loading) return <Loader></Loader>;
  else
    return (
      <div className="relative lg:mx-36">
        <div className="banner mb-32">
          <div className="relative text-white font-semibold pt-36 pl-6 lg:pl-32">
            <div className="mb-7">
              <h1 className="text-6xl sm:text-8xl font-bold">Welcome</h1>
              {user && (
                <h1 className="text-6xl sm:text-8xl font-bold">
                  {user?.name?.split(" ")[0]}
                </h1>
              )}
            </div>
            <p className="text-2xl sm:text-3xl">Make a big difference,</p>
            <p className="text-2xl sm:text-3xl">By giving a little</p>
          </div>
        </div>
        {user && (
          <div>
            <div className="text-center mx-6 lg:mx-0 mb-32">
              <h3 className="text-dark text-4xl sm:text-5xl font-bold mb-5">
                Family Groups
              </h3>
              <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-dark">
                {userGroupsDetails?.map((group) => (
                  <Group key={group._id} detail={group}></Group>
                ))}
                <AddGroup setShowModal={setShowModal}></AddGroup>
              </div>
            </div>
            {userAllGroupsMembers.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mx-6 sm:mx-0 mb-32">
                <div className="flex flex-col items-center mb-12 lg:mb-0">
                  <h3 className="text-dark text-4xl font-bold">
                    Blood Group Summary
                  </h3>
                  <BloodChart></BloodChart>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-dark text-4xl font-bold mb-5">
                    Age Summary
                  </h3>
                  <AgeChart></AgeChart>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="text-center mx-6 lg:mx-0 mb-32">
          <h3 className="text-dark text-2xl sm:text-4xl font-bold mb-5">
            Benefits of Donating Blood
          </h3>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-dark text-xl font-semibold">
            <div className="text-center w-60 h-60 border border-borderGrey rounded-lg shadow-xl px-5 py-8">
              <img
                src={healthyHeart}
                alt="healthyHeart"
                className="inline bg-bgLightRed w-20 rounded-full mb-3"
              />
              <p>Save lives and may get saved in return</p>
            </div>
            <div className="text-center w-60 h-60 border border-borderGrey rounded-lg shadow-xl px-5 py-8">
              <img
                src={physicalHealth}
                alt="physicalHealth"
                className="inline bg-bgLightRed w-20 rounded-full mb-3"
              />
              <p>Benefit of physical health</p>
            </div>
            <div className="text-center w-60 h-60 border border-borderGrey rounded-lg shadow-xl px-5 py-8">
              <img
                src={stress}
                alt="stress"
                className="inline bg-bgLightRed w-20 rounded-full mb-3"
              />
              <p>Reduce stress and negative feelings</p>
            </div>
            <div className="text-center w-60 h-60 border border-borderGrey rounded-lg shadow-xl px-5 py-8">
              <img
                src={family}
                alt="family"
                className="inline bg-bgLightRed w-20 rounded-full mb-3"
              />
              <p>Provide a sense of belonging and reduce isolation</p>
            </div>
            <div className="text-center w-60 h-60 border border-borderGrey rounded-lg shadow-xl px-5 py-8">
              <img
                src={happy}
                alt="happy"
                className="inline bg-bgLightRed w-20 rounded-full mb-3"
              />
              <p>A happier and longer life</p>
            </div>
          </div>
        </div>
        <CreateGroupPopup
          onClose={() => setShowModal(false)}
          visible={showModal}
        ></CreateGroupPopup>
      </div>
    );
};

export default Home;
