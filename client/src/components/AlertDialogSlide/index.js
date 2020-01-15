import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import axios from 'axios'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})


export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false)
  const [costNoPlan, setCostNoPlan] = React.useState('')
  const [costWithPlan, setCostWithPlan] = React.useState('')



  const handleClickOpen = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_API}/api/v1/calculate`,
    { data: {state: props.state, planName: props.planName} })
    .then(response => {
      setCostNoPlan(response.data.split('-')[0])
      setCostWithPlan(response.data.split('-')[1])

      setOpen(true)
    }).catch((err) => {
      window.alert('Tente outra combinação de DDD. A combinação atual não possui tarifa definida.')
    })
  }

  const handleClose = () => { 
    setOpen(false)
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Calcular
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Valores finais
        </DialogTitle>
        <DialogContent>
            Com Plano: R${costWithPlan} <br/> Sem Plano: R${costNoPlan}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}