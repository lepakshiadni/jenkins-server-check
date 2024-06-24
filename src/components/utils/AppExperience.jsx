import React from 'react'
import styles from  '../styles/AppExperience.module.css'
// import imgbox1 from '../assets/Frame 1.png'
import imgbox2 from '../assets/Layer_1 1.png'
function AppExperience() {
  return (
    <>
  
    <div className={styles.main}>
        <div className={styles.contentbox}>
       
          <h1>Download <span >Sissoo App</span> </h1>
          <h4>to level up your experience..</h4>
           <div className={styles.content}>
           <p>
            We are introducing a sissoo mobile app <br /> to improve your experience.
          </p>
          <span className={styles.clicklink}>click the link below to Explore...</span>
           </div>
           <div className={styles.downloadbtn}>
            <button>Download App</button>
           </div>
        </div>
        <div className={styles.imagesection}>
                 <div  className={styles.imgbox}>
            <img src={imgbox2} alt="" />
        </div>
        </div>
    

     

    </div>

    </>
  )
}

export default AppExperience