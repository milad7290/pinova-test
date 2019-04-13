import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { fetchCustomers } from '../customer/customerActions';
import { getCustomers } from '../customer/customerReducer';
import { connect } from 'react-redux';

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          ),
        )}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value,suggestions) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const styles = theme => ({
  root: {
    height: 50,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class IntegrationAutosuggest extends React.PureComponent {
  state = {
    single: '',
    singleid: '',
    popper: '',
    suggestions: [],
  };
   getSuggestionValue=(suggestion)=> {
    this.props.getInputData(suggestion.label,suggestion.value);
    // this.setState({      
    //   singleid:suggestion.value ,
    // });
    return suggestion.label;
  }
  componentDidMount = () => {
    this.props.dispatch(fetchCustomers('A'));
    this.setState({      
      single: this.props.customer,
    });
  }
  handleSuggestionsFetchRequested = ({ value }) => {
    this.props.dispatch(fetchCustomers(value)).then(res=>{
       this.setState({      
          suggestions: this.props.customers,
      });
    })
   
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, { newValue }) => {
    const persian = /^[\u0600-\u06FF\s0-9]+$/;
    if (!persian.test(newValue)&& newValue!=='') {
      return
     }
    this.setState({
      [name]: newValue,
    });
    this.props.getInput(newValue);
  };

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue:this.getSuggestionValue,
      renderSuggestion,
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'نام و نام خانوادگی',
            value: this.state.single,
            onChange: this.handleChange('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    );
  }
}
IntegrationAutosuggest.need = [() => { return fetchCustomers(); }];
function mapStateToProps(state) {
  return {
    // showAddPost: getShowAddPost(state),
    customers: getCustomers(state),
  };
}
IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  customers: PropTypes.array,
  customer: PropTypes.string.isRequired,
  getInputData: PropTypes.func.isRequired,
  getInput: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)( withStyles(styles)(IntegrationAutosuggest));
