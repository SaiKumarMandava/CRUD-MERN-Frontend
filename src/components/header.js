import React from 'react'

export default function header() {
  return (
    <div>
         <header
            style={{
              padding: 0,
              backgroundColor:"black",
              color:"white",
              display:"flex",
              justifyContent:"space-between",
              boxShadow:"0.9px 0.9px 0.9px black",
              position: 'sticky', 
              zIndex: 1, 
              top:0
              

            }}
          ></header>
    </div>
  )
}
