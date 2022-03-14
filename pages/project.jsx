import React, { useEffect, useState } from "react";
import styles from "../styles/Project.module.css";
import { FcSearch } from "react-icons/fc";
import { HiFolderAdd } from "react-icons/hi";
import { FaPencilAlt } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import Link from "next/link";
import LinesEllipsis from 'react-lines-ellipsis';
import ProgressBar from "@ramonak/react-progress-bar";

function project() {
  const colors = ["#7242f5", "#f59042", "#75f749", "#4287f5", "#f542a1", "#95f542"];
  const [mount, setMount] = useState(false);
  const num = [3, 8, 11, 7, 5];
  useEffect(() => {
    setMount(true);
  });
  const getUniqueFromRange = (min, max) => {
    return Math.floor(min + Math.random() * (max - min + 1));
  };
  const getRandomItem = items => {
    return items[getUniqueFromRange(0, items.length)];
  };
  return (
    <div className={styles.projectContainer}>
      <div className={styles.menuProject}>
        <div className={styles.menuProjectItem}>
          <input
            type="search"
            className={styles.searchMenu}
            placeholder="Search Project"
          />

          <FcSearch className={styles.searchSubmit} />
        </div>
        <div className={styles.menuProjectItem}>
          <button
            className={styles.inputAddBtn}
            data-tip="Create"
          >
            {" "}
            <HiFolderAdd />{" "}
            {mount && (
              <ReactTooltip
                place="bottom"
                type="dark"
                effect="solid"
                
              />
            )}{" "}
          </button>
        </div>
      </div>

      <div className={styles.projectPostContainer}>
       {num.map((n) => (
        <Link href={'/projects/' + n }><a>
           <div className={styles.projectMaxContainer}>
           
        <div className={styles.projectBase}>
        <div className={styles.projectProgress}>
          <ProgressBar completed={60} bgColor="#0384fc" />
          </div>
          <div className={styles.projectTitle}>
            <h4>Project Title</h4>
          </div>
          <div className={styles.projectEdit}>
            <Link href={"#"}><a><FaPencilAlt className={styles.pencil} /></a></Link>
          </div>
          <div className={styles.projectBadges}>
            <div className={styles.Badges} style={{
              background: getRandomItem(colors)
            }}>
              CRM
            </div>
            <div className={styles.Badges}  style={{
              background: getRandomItem(colors)
            }}>
              SCM
            </div>
          </div>
          <div className={styles.projectDesc}>
          <LinesEllipsis
              text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur id maiores quo perspiciatis facere ipsam iure repellendus quod explicabo temporibus.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, labore quisquam! Voluptatem fugit quae voluptates unde ducimus eos molestias. Debitis!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi quod eum doloribus in dicta omnis suscipit enim blanditiis nobis odit!"

              maxLine={3}
              ellipsis='...'
  trimRight
  basedOn='letters'
            />
            
          </div>
        </div>  
        </div>
        </a></Link> 
        

        ) )}
      </div>
    </div>
  );
}

export default project;
