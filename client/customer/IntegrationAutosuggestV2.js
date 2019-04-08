import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/Menu/MenuItem';
import { withStyles } from 'material-ui/styles';
import { fetchCustomers } from '../customer/customerActions';
import { getCustomers } from '../customer/customerReducer';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Select from 'react-select';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import CancelIcon from 'material-ui-icons/Cancel';
import { emphasize } from 'material-ui/styles/colorManipulator';


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 100,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class IntegrationAutosuggestV2 extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(fetchCustomers());
    this.setState({      
      single: {'label':this.props.customer},
    });
  }
  state = {
    single: null,
  };

  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
    if (value) {
      this.props.getInputData(Object.values( value)[0]);      
    }
    else{
      this.props.getInputData(''); 
    }
  };

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <div className={classes.root}>
        <span>نام و نام خانوادگی</span>   <Select
            classes={classes}
            styles={selectStyles}
            options={this.props.customers}
            components={components}
            value={this.state.single}
            onChange={this.handleChange('single')}
            placeholder=""
            isClearable
          />
          <div className={classes.divider} />
      </div>
    );
  }
}
IntegrationAutosuggestV2.need = [() => { return fetchCustomers(); }];
function mapStateToProps(state) {
  return {
    customers: getCustomers(state),
  };
}
IntegrationAutosuggestV2.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  customers: PropTypes.array,
  customer: PropTypes.string.isRequired,
  getInputData: PropTypes.func.isRequired,
};

export default  connect(mapStateToProps) (withStyles(styles, { withTheme: true })(IntegrationAutosuggestV2));