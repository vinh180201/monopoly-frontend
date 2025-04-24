"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MonopolyBoard from "@/components/MonopolyBoard/MonopolyBoard";
import MainLayout from "@/Layout/MainLayout/MainLayout";
import { landCellData } from "@/constant/landcell";
import { initializeLands } from "@/redux/features/landSlice";

export default function Home() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(landCellData)
  //   dispatch(initializeLands(landCellData));
  // }, [dispatch]);

  return (
    <MainLayout
      sidebar={
        <>
          <h2>🎯 Quảng cáo</h2>
          <button>Đăng ký quảng cáo</button>
          <hr />
          <h3>🧍 Người chơi</h3>
          <ul>
            <li>Bạn (👑)</li>
            <li>Bot 1</li>
            <li>Bot 2</li>
            <li>Bot 3</li>
          </ul>
        </>
      }
    >
      <MonopolyBoard />
    </MainLayout>
  );
}
