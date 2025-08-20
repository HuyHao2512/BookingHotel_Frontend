import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import LayoutOwner from "../layouts/LayoutOwner/LayoutOwner";
import AuthPage from "../pages/AuthPage/AuthPage";
import VerifyEmail from "../pages/AuthPage/VerifyPage";
import Dashboard from "../pages/Owner/Dashboard";
import LayoutAdmin from "../layouts/LayoutAdmin/LayoutAdmin";
import PropertyPage from "../pages/PropertyPage/PropertyPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import BookingInfo from "../pages/Booking/BookingInfo";
import BookingHistory from "../pages/Booking/BookingHistory";
import ListRoom from "../pages/Owner/ListRoom";
import Booking from "../pages/Owner/Booking";
import DashboardAdmin from "../pages/Admin/DashboardAdmin";
import ListUser from "../pages/Admin/ListUser";
import Discount from "../pages/Owner/Discount";
import SignUpOwner from "../pages/AuthPage/SignUpOwner";
import LikePage from "../pages/LikePage/LikePage";
import ListCity from "../pages/Admin/ListCity";
import ListTypeRoom from "../pages/Admin/ListTypeRoom";
import ListAmenity from "../pages/Admin/ListAmenity";
import ListConveniece from "../pages/Admin/ListConvenience";
import ListCategory from "../pages/Admin/ListCategory";
import GoogleCallback from "../pages/AuthPage/GoogleCallback";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import ManangerPage from "../pages/Owner/ManangerPage";
import Information from "../pages/Owner/Information";
import ListDiscountAdmin from "../pages/Admin/ListDiscountAdmin";
import Revenue from "../pages/Admin/Reveune";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
  {
    path: "/login",
    page: AuthPage,
    isShowHeader: false,
  },
  {
    path: "/signup",
    page: SignUpOwner,
    isShowHeader: false,
  },
  {
    path: "/verify",
    page: VerifyEmail,
    isShowHeader: false,
  },
  {
    path: "/property/:id",
    page: PropertyPage,
    isShowHeader: true,
  },
  {
    path: "/search/",
    page: SearchPage,
    isShowHeader: true,
  },
  {
    path: "/booking-info",
    page: BookingInfo,
    isShowHeader: false,
  },
  {
    path: "/booking-history/:id",
    page: BookingHistory,
    isShowHeader: true,
  },
  {
    path: "/like",
    page: LikePage,
    isShowHeader: true,
  },
  {
    path: "/auth/google/callback",
    page: GoogleCallback,
    isShowHeader: false,
  },
  {
    path: "/payment/success",
    page: PaymentSuccess,
    isShowHeader: false,
  },
  {
    path: "/admin",
    page: LayoutAdmin,
    isAdmin: true, // Đánh dấu đây là trang admin
    children: [
      {
        path: "dashboard",
        page: DashboardAdmin,
      },
      {
        path: "users",
        page: ListUser,
      },
      {
        path: "city",
        page: ListCity,
      },
      {
        path: "typeroom",
        page: ListTypeRoom,
      },
      {
        path: "amenity",
        page: ListAmenity,
      },
      {
        path: "convenience",
        page: ListConveniece,
      },
      {
        path: "category",
        page: ListCategory,
      },
      {
        path: "discount",
        page: ListDiscountAdmin,
      },
      {
        path: "revenue",
        page: Revenue,
      },
    ],
  },
  {
    path: "/owner/:id",
    page: LayoutOwner,
    isShowHeader: false,
    children: [
      {
        path: "information",
        page: Information,
      },
      {
        path: "dashboard",
        page: Dashboard,
      },
      {
        path: "rooms",
        page: ListRoom,
      },
      {
        path: "booking",
        page: Booking,
      },
      {
        path: "discount",
        page: Discount,
      },
    ],
  },
  {
    path: "/mananger",
    page: ManangerPage,
  },
];
