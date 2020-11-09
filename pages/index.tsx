import React from "react";
import MahjongTable from "../components/MahjongTable";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <MahjongTable />
    </div>
  );
}
