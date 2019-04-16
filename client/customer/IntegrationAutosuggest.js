import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { fetchCustomers } from "./redux/customerActions";
import {
  updateCustomer,
  updateCustomerId
} from "../invoice/step1/redux/step1Actions";
import { getCustomers } from "./redux/customerReducer";
import { getCustomer } from "../invoice/step1/redux/step1Reducer";
import { connect } from "react-redux";

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
          input: classes.input
        }
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
          )
        )}
      </div>
    </MenuItem>
  );
}

const styles = theme => ({
  root: {
    height: 50,
    flexGrow: 1
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

class IntegrationAutosuggest extends React.PureComponent {

  getSuggestionValue = suggestion => {
    this.props.updateCustomerId(suggestion.value, suggestion.label);
    return suggestion.label;
  };

  componentDidMount = () => {
    // this.props.updateCustomer(this.props.invoiceCustomer);
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.props.fetchCustomers(value);
  };

  handleSuggestionsClearRequested = () => {};

  handleChange = name => (event, { newValue }) => {
    const persian = /^[\u0600-\u06FF\s0-9]+$/;
    if (!persian.test(newValue) && newValue !== "") {
      return;
    }
    this.props.updateCustomer(newValue);
  };

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.props.customers,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: "نام و نام خانوادگی",
            value: this.props.invoiceCustomer,
            onChange: this.handleChange("single")
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
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

IntegrationAutosuggest.need = [
  () => {
    return fetchCustomers();
  }
];
IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  customers: PropTypes.array.isRequired,
  invoiceCustomer: PropTypes.string.isRequired,
  fetchCustomers:PropTypes.func.isRequired,
  updateCustomer:PropTypes.func.isRequired,
  updateCustomerId:PropTypes.func.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest)
