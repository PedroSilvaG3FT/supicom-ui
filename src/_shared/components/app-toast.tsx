"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function AppToast() {
  return <ToastContainer autoClose={5000} />;
}
