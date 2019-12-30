import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

class RobotArmController extends React.Component {
  state = {
    motors: ''
    }

  componentDidMount() {
    this.callApi()
    .then(res => this.setState({motors: res}))
    .catch(err => console.log(err));

    this.setMotor(0, this.state.motors.m6);
  }
    
  callApi = async () => {
  const response = await fetch('/motors/');
  const body = await response.json();
  return body;
  }

  setMotor = async (idx, value) => {
    document.getElementById("motor1").value = value
  }
    
  render() {
    const classes = makeStyles(theme => ({
      root: {
        width: 300 + theme.spacing(3) * 2,
      },
      margin: {
        height: theme.spacing(3),
      },
    }));

    return (  
      <div className={classes.root}>
        <div>{this.state.motors.m6}</div>
        <form method="POST" action = "http://localhost:5000/motors">
          <div className={classes.margin} />
          <Typography gutterBottom>motor 1</Typography>
          <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} id="motor1"/>

          <div className={classes.margin} />
          <Typography gutterBottom>motor 2</Typography>
          <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} />

          <div className={classes.margin} />
          <Typography gutterBottom>motor 3</Typography>
          <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0}/>

          <div className={classes.margin} />
          <Typography gutterBottom>motor 4</Typography>
          <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} />

          <div className={classes.margin} />
          <Typography gutterBottom>motor 5</Typography>
          <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} />

          <div className={classes.margin} />
          <Typography gutterBottom>motor 6</Typography>
          <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={parseInt(this.state.motors.m6)} />

          <button action="submit"> 보내기 </button>
        </form>
      </div>
    );
  }
}


export default RobotArmController;
