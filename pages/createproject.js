import React, { useState } from 'react';
import styles from "../styles/Createproject.module.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
function createproject() {
    const [tags, setTags] = useState([ ]);
  return (
    <div className={styles.projectContainer}>
    <div className={styles.projectMaxContainer}>
      <div className={styles.projectBase}>
      <div className={styles.projectTitle}>
            <label>Enter Title </label> <input type="text" />
        </div>
        <div className={styles.projectBadges}>
            <label>technologies</label> 
            <ReactTagInput 
      tags={tags} 
      onChange={(newTags) => setTags(newTags)}
      placeholder="Type and press enter"
      maxTags={10}
      editable={true}
      readOnly={false}
      removeOnBackspace={true}
    />

        </div>
        <div className={styles.projectDesc}>
        <label>Description </label>
                <textarea
                  cols="30"
                  rows="5"
                  
                  className={styles.textAreaContainer}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>

              <hr/>
              <div className={styles.deadline}>
                Deadline =
                <input
                  type="date"
                 
                  className={styles.deadlinePicker}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>

              <div className={styles.tasksContainer}>
              <div className={styles.task}>
                    Enter New Task { "  "}
                    <input
                      type="text"
                      className={styles.taskInput}
                      onChange={(e) => {
                        setNewTask(e.target.value);
                        
                      }}
                    />
                    <input type="button" value="Add" className={styles.addBtn} onClick={(e) => {
                        setNewTaskArr([...newTaskArr,  {task : newTask, username : "", assigned_on: currentDate, completed: false }]);
                        // console.log(newTaskArr)
                        
                      }} />

<table className={styles.tasks}>
                    <tbody>
                    <tr className={styles.taskRow}>
                      <th className={styles.taskRow}>Task</th>
                      <th className={styles.taskRow}>Intern</th>
                      <th className={styles.taskRow}>Status</th>
                      <th className={styles.taskRow}>Assigned Date</th>
                    </tr>
                
</tbody>

</table>
</div>
              </div>
    </div>
    </div>
    </div>
  )
}

export default createproject;