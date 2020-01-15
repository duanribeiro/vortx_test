import React from 'react'
import Grid from '@material-ui/core/Grid'
import Calculator from './../Calculator'
import "./styles.scss"

export default function MainWindow() {

    return (
        <>
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
        >
          <Grid
          item
          >
             <div className="title">
              CALCULADORA <br/> DE LIGAÇÃO
            </div>
          </Grid>

          <Grid
          item
          >
            <Calculator/>
             
          </Grid>
          
        </Grid>
         
        </>
    )
}