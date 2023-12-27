import LocationIcon from "../../../Assets/Images/location.svg";
import facebook from "../../../Assets/Images/facebook.svg";
import Insta from "../../../Assets/Images/insta.svg";

import Twitter from "../../../Assets/Images/twitter.svg";

import Youtube from "../../../Assets/Images/youtube.svg";
import User from "../../../Assets/Images/user.svg";
function ProfileSidebar() {
  return (
    <div className="border border-primary px-2 	 py-6 bg-white rounded-lg">
      <div className="items-center justify-center  flex ">
        <img className="h-32 w-32 rounded-full" src={User} />
      </div>
      <div className="flex flex-col items-center">
        <div className="mt-2 font-semibold">Daved John</div>
        <div className="flex flex-row mt-2">
          <img src={LocationIcon} className="px-2" />
          <a className="text-sm ">4140 Parker Rd. Allentown</a>
        </div>
        <div className="flex flex-row mt-6 space-x-3 rtl:space-x-reverse">
          <div className=" font-semibold text-gray-700  text-sm W-20">
            Mobile :{" "}
          </div>

          <a className="text-sm text-gray-700">+232 4334 2343</a>
        </div>
        <div className="flex flex-row mt-4 space-x-3 rtl:space-x-reverse">
          <div className=" font-semibold  text-gray-700  text-sm">
            ID Number :{" "}
          </div>

          <a className="text-sm text-gray-700">239945354</a>
        </div>

        <div className="flex flex-row mt-4 space-x-3 rtl:space-x-reverse">
          <div className=" font-semibold  text-gray-700  text-sm">Email : </div>

          <a className="text-sm text-gray-700">Davedjohn345@gmail.com</a>
        </div>
        <div className="flex flex-row mt-4 space-x-3 rtl:space-x-reverse">
          <div className=" font-semibold text-gray-700  text-sm">Gender : </div>

          <a className="text-sm text-gray-700">Male</a>
        </div>
        <div className="flex flex-row mt-4 space-x-3 rtl:space-x-reverse">
          <div className=" font-semibold  text-gray-700 text-sm">DOB : </div>

          <a className="text-sm text-gray-600">March 23,1995</a>
        </div>
        <div className="flex flex-row space-x-3 mt-12 rtl:space-x-reverse">
          <img src={facebook} />
          <img src={Insta} />
          <img src={Youtube} />
          <img src={Twitter} />
        </div>
      </div>
    </div>
  );
}
export default ProfileSidebar;
