import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'
import AlertDialogSlide from './../AlertDialogSlide'
import "./styles.scss"


export default function Calculator() {

  const [planName, setPlanName] = React.useState(['FaleMais 30'])
  const [state, setState] = React.useState({
    time: 60,
    origin: '011',
    destination: '016',
  })

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    })
  }

  const handleChangeMultiple = event => {
    const { options } = event.target
    const value = []

    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value)
      }
    }
    setPlanName(value)
    }

    const marks = [
      {
        value: 0,
        label: '0 min',
      },
      
      {
        value: 120,
        label: '120 min',
      }
    ]

    return (
        <>
          <Card
          className="main_card"
          >
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
            >
              {/* PRIMEIRO INPUT */}
              <Grid item>
                <FormControl className="input">
                  <InputLabel
                  htmlFor="origin-id"
                  >
                    DDD Origem
                  </InputLabel>
                  <Select
                  fullWidth
                  native
                  value={state.origin}
                  onChange={handleChange('origin')}
                  inputProps={{
                    name: 'origin',
                    id: 'origin-id',
                  }}
                  >
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                  </Select>
                </FormControl>
              </Grid>

              {/* SEGUNDO INPUT */}
              <Grid item>
                <FormControl className="input">
                  <InputLabel
                  htmlFor="destination-id"
                  >
                    DDD Destino
                  </InputLabel>
                  <Select
                  fullWidth
                  native
                  value={state.destination}
                  onChange={handleChange('destination')}
                  inputProps={{
                    name: 'destination',
                    id: 'destination-id',
                  }}
                  >
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                  </Select>
                </FormControl>
              </Grid>

              {/* TERCEIRO INPUT */}
              <Grid item>
              <FormControl>
                <InputLabel shrink htmlFor="select-multiple-native">
                  Plano FaleMais
                </InputLabel>
                <Select
                style={{height: "80px", width: "200px"}}
                multiple
                native
                value={planName}
                onChange={handleChangeMultiple}
                inputProps={{
                  id: 'select-multiple-native',
                }}
                >
                  <option value={'FaleMais 30'}>
                  FaleMais 30
                  </option>
                  <option value={'FaleMais 60'}>
                  FaleMais 60
                  </option>
                  <option value={'FaleMais 120'}>
                  FaleMais 120
                  </option>
                </Select>

             </FormControl>
              </Grid>

              {/* QUARTO INPUT */}
              <Grid item>
                <InputLabel
                htmlFor="discrete-slider"
                >
                  Tempo de Ligação
                </InputLabel>
                <Slider
                defaultValue={state.time}
                aria-labelledby="discrete-slider"
                step={1}
                valueLabelDisplay="auto"
                min={0}
                max={120}
                marks={marks}
                style={{width: "200px"}}
                onChange={ (e, val) => state.time = val } 
                />
              </Grid>

              <AlertDialogSlide state={state} planName={planName}/>
            
          </Grid>

        </Card>
         
        </>
    )
}