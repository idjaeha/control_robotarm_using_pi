import React, {Component} from 'react';
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

class RobotArmController extends Component {
  state = {
    customers: ''
    }
    
  componentDidMount() {
  this.callApi()
  .then(res => this.setState({customers: res}))
  .catch(err => console.log(err));
  }
    
  callApi = async () => {
  const response = await fetch('/motor/1');
  const body = await response.json();
  return body;
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
        <div className={classes.margin} />
        <Typography gutterBottom>motor 1</Typography>
        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} />

        <div className={classes.margin} />
        <Typography gutterBottom>motor 2</Typography>
        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} />

        <div className={classes.margin} />
        <Typography gutterBottom>motor 3</Typography>
        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} />

        <div className={classes.margin} />
        <Typography gutterBottom>motor 4</Typography>
        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} />

        <div className={classes.margin} />
        <Typography gutterBottom>motor 5</Typography>
        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} />

        <div className={classes.margin} />
        <Typography gutterBottom>motor 6</Typography>
        <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} />
      </div>
    );
  }
}


export default RobotArmController;
