import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

function dateAdd(date, interval, units) {
  var ret = new Date(date); //don't change original date
  var checkRollover = function() { if(ret.getDate() !== date.getDate()) ret.setDate(0);};
  switch(interval.toLowerCase()) {
    case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
    case 'quarter':  ret.setMonth(ret.getMonth() + 3*units); checkRollover();  break;
    case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
    case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
    case 'day'    :  ret.setDate(ret.getDate() + units);  break;
    case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
    case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
    case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
    default       :  ret = undefined;  break;
  }
  return ret;
}

class App extends Component {
  constructor(props) {
    super(props);
    const now = new Date();
    const monday = dateAdd(now, "day", 1-now.getDay());
    let week_day_dates = [monday];
    for (let i = 1; i < 7; i++){      
      week_day_dates.push( dateAdd(monday, "day", i) );
    }
    this.state = {
      today_date : now.toISOString().slice(0,10),
      week_day_dates : week_day_dates.map(day => day.toISOString().slice(0,10)),
      days : ["Понеідлок","Вівторок","Середа","Четвер","П'ятниця","Субота","Неділя"] 
    };
  }

  render() {
    return (
      <div className="App">
        Дата дня неділі:<DayDate date={this.state.today_date} />
        <Week days={this.state.days}/>
      </div>      
    );
  }
}

class Series extends Component{
  render(){
     return (
      <div>
        <select name="series_name">
          <option value="Помста1">Помста1</option>
          <option value="Помста2">Помста2</option>
          <option value="Помста3">Помста3</option>
          <option value="Помста4">Помста4</option>
          <option value="Рятівники">Рятівники</option>
          <option value="Віталька">Віталька</option>
          <option value="Зустрічна смуга">Зустрічна смуга</option>
          <option value="Вечірка">Вечірка</option>
        </select>    
        <input type="number" min="1" />  
        <input type="number" min="1" />
        <button>+</button>
      </div>
     ); 
  }
}

class Type extends Component{
  render(){
    return(
      <div>
        <select name="type_name">
          <option value="УКР.">УКР.</option>
          <option value="Кинопоказ">Кинопоказ</option>
          <option value="Развлекательный">Развлекательный</option>
        </select>      
      </div>      
    );
  }
}

class DayDate extends Component{
  constructor(props) {
    super(props);
    this.state = {date:props.date};
  }

  render(){
    return(
      <div>
        <input 
          type="date" 
          value={this.state.date}
          onChange={event => this.setState({date:event.target.value})} />
      </div>      
    );
  }  
}

class Time extends Component{
  render(){
    return(
      <div>
        <input type="time" min="6:00" max="5:50" />
      </div>      
    );
  }  
}

class Row extends Component{
  
  constructor(props) {
    super(props);
    this.state = {day:props.day};
    this.state = {day_date:props.day_date};
  }

  render(){
    return(  
      <tr>    
        <td>{this.state.day}<DayDate /></td>         
        <td><input type="number" min="1" value="1" /></td>       
        <td><Time /></td>       
        <td><Time /></td>     
        <td><Time /></td>           
        <td><Type /></td>  
        <td><Series /></td>   
      </tr>
    );
  }  
}

class Week extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      days:props.days,
      week_day_dates:props.week_day_dates};
  }

  render(){
    return(  
      <table>
        <tr>
          <th>День тиждня</th><th>№ блоку</th><th>Початок</th><th>Кінец</th><th>Тривалість</th><th>Тип</th><th>Контент</th>              
        </tr>
        {this.state.days.map( (day) => <Row day={day} />)}          
      </table>
    );
  }  
}

export default App;
