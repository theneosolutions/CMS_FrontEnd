import { LuLayoutDashboard } from "react-icons/lu";
import DashboardPageLayout from "../Pages/Dashboard/DashboardPageLayout";
import Applications from "../Pages/Dashboard/Applications";
import BrandingPageLayout from "dmsPages/Branding/BrandingPageLayout";
import Logo from "dmsPages/Branding/Logo";
import Color from "dmsPages/Branding/Color";
import Splash from "dmsPages/Branding/Splash";
import Fonts from "dmsPages/Branding/Fonts";
import Slider from "dmsPages/Branding/Slider";
import InternalApiTree from "dmsPages/dashboard/internalApiTree";
import ExternalApiTree from "dmsPages/dashboard/externalApiTree";
import Screens from "Pages/Dashboard/Screens";
import Builder from "Pages/Dashboard/builder";

const appRoutes = [
  {
    index: true,
    element: <Logo />,
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
        element: <InternalApiTree />,
        state: "dashboard.index",
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
        path: "/dashboard/screens",
        element: <Screens />,
        state: "dashboard.screens",
        sidebarProps: {
          displayText: "Screens",
        },
      },
      {
        path: "/dashboard/builder",
        element: <Builder />,
        state: "dashboard.builder",
        sidebarProps: {
          displayText: "Builder",
        },
      },
    ],
  },
];
export default appRoutes;
