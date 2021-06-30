import './dropdownMenu.css';
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DropdownMenu extends Component {
    static propTypes = {
        title: PropTypes.node.isRequired,
        children: PropTypes.element.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.closeMenu);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({
            showMenu: true
        }, () => {
            setTimeout(() => {
                document.addEventListener('click', this.closeMenu);
            }, 100);
        });
    }

    closeMenu(e) {
        if (e.srcElement.className === 'dpm_toggle') {
            return;
        }

        this.setState({
            showMenu: false
        }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    render() {
        return (
            <div className='dpm_container'>
                <div className="dpm_toggle" onClick={this.showMenu}>
                    {this.props.title}
                </div>

                {
                    this.state.showMenu &&
                    <div className='dpm_menu_item_container'>
                        {this.props.children}
                    </div>
                }
            </div>
        )
    }
}

export default DropdownMenu;
