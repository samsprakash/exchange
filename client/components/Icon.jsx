import React from 'react';

export const Icon = ({ icon, title }) => (
  <i className={'fa fa-' + icon} title={title || undefined}></i>
);
