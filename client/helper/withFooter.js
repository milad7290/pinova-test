import React from "react";

const withFooter = WrappedComponent => {
  class HOC extends React.Component {
    state = {
      checked: false
    };
    handleChange = event => {
      this.setState({ checked: event.target.checked });
    };
    render() {
      return (
        <WrappedComponent
          {...this.props}
          footerMessage={"its footer"}
          change={this.handleChange}
          checked={this.state.checked}
        />
      );
    }
  }

  return HOC;
};

export default withFooter;
