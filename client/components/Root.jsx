require('./style/Root.pcss');

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Root = ({ children }) => {
  return (
    <div className="app-root">
      <div className="group-page">
       
        <ReactCSSTransitionGroup
          component="div"
          className="t-page-container"
          transitionName="page-transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
            {React.cloneElement(children, { key: 'router-' + children.props.route.path })}
        </ReactCSSTransitionGroup>
      </div>
    </div>
  );
};

export default Root;
