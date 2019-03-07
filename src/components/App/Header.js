import React, {Component} from 'react';
import './css/Header.css';

class Header extends Component {
    render() {
        return (
            <div className="app-header">
                <div className="lab-info">
                    <h2>Лабораторная работа №3</h2>
                    <div>Группа P3201, Вариант 18151</div>
                    <div>Котелевский Павел Георгиевич</div>
                    <div>Гостев Михаил Владимирович</div>
                </div>
            </div>
        )
    }
}

export default Header;