import { LuLayoutDashboard } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineQuestionAnswer } from "react-icons/md";

import DashboardIndex from "../Pages/Dashboard/DashboardIndex";
import DashboardPageLayout from "../Pages/Dashboard/DashboardPageLayout";
import Applications from "../Pages/Dashboard/Applications";
import Demo from "../Pages/Dashboard/Demo";
import UserList from "../Pages/Dashboard/UserList";
import UsersPageLayout from "../Pages/Users/UsersPageLayout";
import Verified from "../Pages/Users/verified";
import Unverified from "../Pages/Users/unverified";
import Dump from "../Pages/Users/dump";
import DecisionLayout from "../Pages/Decision/DecisionPageLayout";
import QuestionsAnswers from "../Pages/Decision/Question&Answers";
import CreateSet from "../Pages/Decision/CreateSet";
import CreateDecision from "../Pages/Decision/CreateDecision";
import AllDecisions from "../Pages/Decision/AllDecisions";
import CreateUser from "Pages/Users/create-user";
import Response from "Pages/Response/decisionsResponse";
import ResponsePageLayout from "Pages/Response/ResponsePageLayout";

import BrandingPageLayout from "dmsPages/Branding/BrandingPageLayout";

import Logo from "dmsPages/Branding/Logo";
import Color from "dmsPages/Branding/Color";
import Splash from "dmsPages/Branding/Splash";
import ListMedia from "dmsPages/Branding/ListMedia";
import Dashboard from "dmsPages/dashboard";
import CreateBrand from "dmsPages/Branding/createBrand";
import Fonts from "dmsPages/Branding/Fonts";
import Slider from "dmsPages/Branding/Slider";
import InternalApiTree from "dmsPages/dashboard/internalApiTree";
import ExternalApiTree from "dmsPages/dashboard/externalApiTree";

const appRoutes = [
  {
    index: true,
    element: <UserList />,
    state: "home",
  },

  {
    path: "/branding",
    element: <BrandingPageLayout />,
    state: "branding",
    sidebarProps: {
      displayText: "Branding",
      icon: <LuLayoutDashboard />,
    },
    child: [
      {
        index: true,
        element: <Logo />,
        state: "branding.index",
      },
      // {
      //   path: "/branding/create-brand",
      //   element: <CreateBrand />,
      //   state: "branding.create-brand",
      //   sidebarProps: {
      //     displayText: "Create Brand",
      //   },
      // },
      {
        path: "/branding/logo",
        element: <Logo />,
        state: "branding.logo",
        sidebarProps: {
          displayText: "App Logos",
        },
      },
      {
        path: "/branding/Colors",
        element: <Color />,
        state: "branding.colors",
        sidebarProps: {
          displayText: "App Colors",
        },
      },

      {
        path: "/branding/splash",
        element: <Splash />,
        state: "branding.splash",
        sidebarProps: {
          displayText: "App Splash",
        },
      },
      {
        path: "/branding/fonts",
        element: <Fonts />,
        state: "branding.fonts",
        sidebarProps: {
          displayText: "App Fonts",
        },
      },
      {
        path: "/branding/slider",
        element: <Slider />,
        state: "branding.slider",
        sidebarProps: {
          displayText: "App Sliders",
        },
      },
      // {
      //   path: "/branding/list-media",
      //   element: <ListMedia />,
      //   state: "branding.list-media",
      //   sidebarProps: {
      //     displayText: "List Media",
      //   },
      // },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <LuLayoutDashboard />,
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "dashboard.index",
      },
      {
        path: "/dashboard/userlist",
        element: <Dashboard />,
        state: "dashboard.userlist",
        sidebarProps: {
          displayText: "User List",
        },
      },
      {
        path: "/dashboard/internal-api-tree",
        element: <InternalApiTree />,
        state: "dashboard.internalapitree",
        sidebarProps: {
          displayText: "Internal Api Tree",
        },
      },
      {
        path: "/dashboard/external-api-tree",
        element: <ExternalApiTree />,
        state: "dashboard.externalapitree",
        sidebarProps: {
          displayText: "External Api Tree",
        },
      },
      {
        path: "/dashboard/application",
        element: <Applications />,
        state: "dashboard.application",
        sidebarProps: {
          displayText: "Applications",
        },
      },

      {
        path: "/dashboard/demo",
        element: <Demo />,
        state: "dashboard.demo",
        sidebarProps: {
          displayText: "Demo",
        },
      },
    ],
  },

  {
    path: "/users",
    element: <UsersPageLayout />,
    state: "users",
    sidebarProps: {
      displayText: "Users",
      icon: <FaUser />,
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "users.index",
      },
      {
        path: "/users/verified",
        element: <Verified />,
        state: "users.verified",
        sidebarProps: {
          displayText: "Verified",
        },
      },
      {
        path: "/users/unverified",
        element: <Unverified />,
        state: "users.unverified",
        sidebarProps: {
          displayText: "Unverified",
        },
      },
      {
        path: "/users/dump",
        element: <Dump />,
        state: "users.dump",
        sidebarProps: {
          displayText: "Dump",
        },
      },
      {
        path: "/users/create-user",
        element: <CreateUser />,
        state: "users.create-user",
        sidebarProps: {
          displayText: "Create User",
        },
      },
    ],
  },
  {
    path: "/decisions",
    element: <DecisionLayout />,
    state: "decisions",
    sidebarProps: {
      displayText: "Decisions",
      icon: <IoMdCheckboxOutline />,
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "decisions.index",
      },
      {
        path: "/decisions/q/a",
        element: <QuestionsAnswers />,
        state: "decisions.qa",
        sidebarProps: {
          displayText: "Question & Answers",
        },
      },
      {
        path: "/decisions/create-set",
        element: <CreateSet />,
        state: "decisions.create-set",
        sidebarProps: {
          displayText: "Create Set",
        },
      },

      {
        path: "/decisions/create-decision",
        element: <CreateDecision />,
        state: "decisions.create-decision",
        sidebarProps: {
          displayText: "Create Decision",
        },
      },
      {
        path: "/decisions/all-decisions",
        element: <AllDecisions />,
        state: "decisions.all-decisions",
        sidebarProps: {
          displayText: "All Decisions",
        },
      },
    ],
  },
  {
    path: "/response",
    element: <ResponsePageLayout />,
    state: "response",
    sidebarProps: {
      displayText: "Response",
      icon: <MdOutlineQuestionAnswer />,
    },
    child: [
      {
        index: true,
        element: <Response />,
        state: "response.index",
      },
      {
        path: "/response/response",
        element: <Response />,
        state: "response.response",
        sidebarProps: {
          displayText: "Decision Responses",
        },
      },
    ],
  },
];
export default appRoutes;
