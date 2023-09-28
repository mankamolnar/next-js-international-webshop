"use client"

import { useAppDispatch, useAppSelector } from "./../../redux/hooks";
import { changeMode } from "./../../redux/darkModeSlice";

const DarkModeButton = () => {
  const currentMode = useAppSelector((state) => state.darkModeReducer.darkMode);
  const dispatch = useAppDispatch();

  return <></>
}