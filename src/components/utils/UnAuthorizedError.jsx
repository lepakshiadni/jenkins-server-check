import React from 'react'
import '../styles/Error.css'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

function Error401() {
  return (
    <section className='main'>
    <div className='head'>
       <div className="icn-top">
       <ReportGmailerrorredIcon style={{fontSize:'150px'}} className='icn-1'/>
        </div> 
        

         <div class="content" >
             <p className='para' >401 ERROR..!!</p>
         </div>

     </div>
    <div className='message' >
             <h1 className='status-code' >Unauthorized Error</h1>
             <div  class="err-msg" >
                <p>You are not authorized to view this page.</p>
               
             </div>
    </div>
    
</section>
  )
}

export default Error401