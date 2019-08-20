import './style/Dropdown.pcss';
import React from 'react';
import { ClickCapture } from './ClickCapture';
import { Icon } from './Icon';

export const Dropdown = React.createClass({
  
  getInitialState () {
    return {
      selected: this.props.selectedItem,
      open: false
    };
  },

  componentWillReceiveProps (newProps) {
    if(newProps.selectedItem && newProps.selectedItem !== this.state.selectedItem) {
      this.setState({
        selected: newProps.selectedItem
      });
    }
  },

  toggleDropdown () {
    this.setState({ open: !this.state.open });
  },

  closeDropdown () {
    this.setState({ open: false });
  },

  openDropdown () {
    this.setState({ open: true });
  },

  handleChange (newItem) {
    
    if(this.props.onChange && newItem !== this.state.selected) {
    
      this.props.onChange(newItem);
    }

    this.closeDropdown();
  },

  render () {
    return (
      <div className="dropdown" tabIndex="0">
        <div className="button" onClick={this.toggleDropdown}>
          <Icon icon={this.state.open ? 'caret-up' : 'caret-down'} />
        </div>
        <div className="display" onClick={this.toggleDropdown}>
          {this.state.selected ? this.state.selected.text : '-'}
        </div>
        {this.state.open && (
          <ClickCapture mountedByClick={true} onClickOutside={this.closeDropdown}>
            <div className="dropdown-selection">
              <div className="dropdown-content">
                {this.props.items.map((item, idx) => (
                  <div key={'dropdown_item_' + idx} className="dropdown-item" onClick={() => this.handleChange(item)}>
                    {this.props.itemComponent 
                      ? React.createElement(this.props.itemComponent, { item: item })
                      : (
                        <div className="standard-item">
                          {item.text}
                        </div>
                      )
                    }
                  </div>
                ))}
              </div>
            </div>
          </ClickCapture>
        )}
      </div>
    );
  }
});

export default Dropdown;