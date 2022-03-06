import React from "react";
import { FaHome } from "react-icons/fa";
import { GoProject, GoPerson, GoSettings } from "react-icons/go";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Link from "next/link";
import styles from "../styles/Sidebarmenu.module.css";
import image from "../public/Vias-Logo.png";
import Image from "next/image";
import authenticateUser from "./authenticateUser";

function Sidebarmenu() {
  return (
    <div className={styles.sidebarComponent}>
      <div className={styles.logobox}>
        <Image src={image} />

        <span className={styles.logotext}></span>
      </div>
      <div className={styles.line}></div>
      <div className={styles.menus}>
        <div className={styles.itemnav}>
          <div className={styles.itemlink}>
            <span className={styles.itemicon}>
              <FaHome />
            </span>
            <span className={styles.itemname}>
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            </span>
          </div>
        </div>

        <div className={styles.itemnav}>
          <div className={styles.itemlink}>
            <span className={styles.itemicon}>
              <GoProject />
            </span>
            <span className={styles.itemname}>
              <Link href="/project">
                <a>Project</a>
              </Link>
            </span>
          </div>
        </div>

        <div className={styles.itemnav}>
          <div className={styles.itemlink}>
            <span className={styles.itemicon}>
              <BsFillPersonLinesFill />
            </span>
            <span className={styles.itemname}>
              <Link href="/employee">
                <a> Employee </a>
              </Link>
            </span>
          </div>
        </div>

        <div className={styles.itemnav}>
          <div className={styles.itemlink}>
            <span className={styles.itemicon}>
              <GoPerson />
            </span>
            <span className={styles.itemname}>
              <Link href="/client">
                <a>Client </a>
              </Link>
            </span>
          </div>
        </div>

        <div className={styles.itemnav}>
          <div className={styles.itemlink}>
            <span className={styles.itemicon}>
              <GoSettings />
            </span>
            <span className={styles.itemname}>
              <Link href="/setting">
                <a>Setting</a>
              </Link>
            </span>
          </div>
        </div>
      </div>
      {/* <User image={image}  username={'shreya'}/> */}
    </div>
  );
}

export default Sidebarmenu;
