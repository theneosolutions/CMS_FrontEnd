import React from "react";
import CardMain from "../../../Components/Cards/main";
import facebook from "../../../Assets/Images/facebook.svg";
import youtube from "../../../Assets/Images/youtube.svg";
import Insta from "../../../Assets/Images/insta.svg";
import Twitter from "../../../Assets/Images/twitter.svg";

function AntiFraud() {
  return (
    <div className=" w-full flex flex-row space-x-5 rtl:space-x-reverse">
      <div className="w-1/2">
        <CardMain
          width="w-full	"
          heading={"Personal Identification Information"}>
          <div className="space-y-3">
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Photograph</a>
              <a className="text-gray-700 font-semibold flex flex-row space-x-5 rtl:space-x-reverse">
                <img
                  className="rounded-full h-14 w-14"
                  src="https://w7.pngwing.com/pngs/99/557/png-transparent-computer-icons-avatar-avatar-angle-heroes-recruiter-thumbnail.png"
                />
                <img
                  className="rounded-full h-14 w-14"
                  src="https://w7.pngwing.com/pngs/99/557/png-transparent-computer-icons-avatar-avatar-angle-heroes-recruiter-thumbnail.png"
                />
                <img
                  className="rounded-full h-14 w-14"
                  src="https://w7.pngwing.com/pngs/99/557/png-transparent-computer-icons-avatar-avatar-angle-heroes-recruiter-thumbnail.png"
                />
              </a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Full Name</a>
              <a className="text-gray-700 font-semibold">Zain MALIK</a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Date of Birth</a>
              <a className="text-gray-700 font-semibold">30 Feb 2000</a>
            </div>

            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Government Issued ID</a>
              <a className="text-gray-700 font-semibold">1231232331232</a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Address</a>
              <a className="text-gray-700 font-semibold">lorem ipsum ipsum</a>
            </div>
          </div>
        </CardMain>

        <CardMain width="w-full	mt-5" heading={"Employment Information"}>
          <div className="space-y-3">
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Current Employer</a>
              <a className="text-gray-700 font-semibold flex flex-row space-x-5 rtl:space-x-reverse">
                ABC, COMPANY ABC
              </a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Employment History:</a>
              <a className="text-gray-700 font-semibold">ABC COMPANY</a>
            </div>
          </div>
        </CardMain>

        <CardMain width="w-full	mt-5" heading={"Risk Assessment"}>
          <div className="space-y-3">
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 "> Credit Score: </a>
              <a className="text-gray-700 font-semibold flex flex-row space-x-5 rtl:space-x-reverse">
                03182932332332 , 03182932332332
              </a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Fraud Risk Score:</a>
              <a className="text-gray-700 font-semibold">03182932332332</a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Alerts/Flags: </a>
              <div className="text-gray-700 font-semibold flex flex-row space-x-3 rtl:space-x-reverse">
                <div className="bg-green-600 h-5 w-8 rounded-sm"></div>
                <div className="bg-red-600 h-5 w-8 rounded-sm"></div>
              </div>
            </div>
          </div>
        </CardMain>
      </div>

      <div className="w-1/2">
        <CardMain width="w-full	" heading={"Contact Information"}>
          <div className="space-y-3">
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 "> Phone Number(s)</a>
              <a className="text-gray-700 font-semibold flex flex-row space-x-5 rtl:space-x-reverse">
                03182932332332 , 03182932332332
              </a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Email Address</a>
              <a className="text-gray-700 font-semibold">
                newSolutions@neo.com
              </a>
            </div>
          </div>
        </CardMain>

        <CardMain width="w-full	mt-5" heading={"Financial Information"}>
          <div className="space-y-3">
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 "> Bank Account Details:</a>
              <a className="text-gray-700 font-semibold flex flex-row space-x-5 rtl:space-x-reverse">
                03182932332332 , 03182932332332
              </a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">
                Credit/Debit Card Information:
              </a>
              <a className="text-gray-700 font-semibold">03182932332332</a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Loan Information:</a>
              <a className="text-gray-700 font-semibold">03182932332332</a>
            </div>
          </div>
        </CardMain>

        <CardMain width="w-full	mt-5" heading={"Digital Footprint"}>
          <div className="space-y-3">
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Social Media Profiles: </a>
              <a className="text-gray-700 font-semibold flex flex-row space-x-5 rtl:space-x-reverse flex flex-row space-x-4 rtl:space-x-reverse">
                <img src={facebook} />
                <img src={youtube} />
                <img src={Insta} />
                <img src={Twitter} />
              </a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Online Activity:</a>
              <a className="text-gray-700 font-semibold">
                Active last 5 minutes ago
              </a>
            </div>
          </div>
        </CardMain>
      </div>
    </div>
  );
}
export default AntiFraud;
