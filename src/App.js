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

function get_week_dates(day_date){
  const monday = dateAdd(day_date, "day", 1-day_date.getDay());
  let week_day_dates = [monday];
  for (let i = 1; i < 7; i++){      
    week_day_dates.push( dateAdd(monday, "day", i) );
  }
  return week_day_dates.map( day => day.toISOString().slice(0,10));
}

const now = new Date();
const week_day_dates = get_week_dates(now);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      today_date : now.toISOString().slice(0,10),
      week_day_dates : week_day_dates,
    };

    this.onDateChanged = this.onDateChanged.bind(this);
  }

  onDateChanged(event) {
   event.preventDefault();
   const dt = event.target.value;
   alert(dt + "!!!");    
   console.log(dt)
  }


  render() {
    const app_this = this;
    return (
      <div className="App">
        Дата дня неділі:
        <DayDate 
          date={this.state.today_date}
          editable={true}
          onChange = {(e)=>{
            // e.preventDefault();
              const dt = e.target.value;
              const new_dates = get_week_dates(new Date(dt));
              console.log(new_dates);
              app_this.setState({
                week_day_dates:new_dates,
                today_date:dt
              });
            }
          }
          // onClick = {(e) => alert("eeeee")}
        />
        Час початку ефірної доби:<Time time="06:00" />
        <Week 
          days={this.props.days} 
          week_day_dates={this.state.week_day_dates} 
          key={this.state.today_date}
        />
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

    this.onDateChanged = this.onDateChanged.bind(this);
  }

  onDateChanged(event){
    // if(this.props.editable)
    this.setState({date:event.target.value});
    this.props.onChange(event);
    alert(event.target.value);          
  }

  render(){
    return(
      <div>
        <input 
          type="date" 
          value={this.state.date}
          onChange={this.onDateChanged}
          readOnly={!this.props.editable}          
        />
      </div>      
    );
  }  
}

class Time extends Component{
  constructor(props) {
    super(props);  
    this.state = {time:props.time};
  }

  render(){
    return(
      <div>
        <input type="time" min="6:00" value={this.state.time} />
      </div>      
    );
  }  
}

class Row extends Component{
  
  constructor(props) {
    super(props);

    this.state = {
      day:props.day,
      day_date:props.day_date,
      blocks_num:1,
      blocks: [(<Block block_num="1" />)]
    };
    
  }

  render(){
    console.log(this.state.day);
    const {blocks_num,blocks} = this.state;
    return(       
          <div style={{display: 'flex'}}> 
            <div>{this.state.day}<DayDate date={this.state.day_date} editable={false}/></div>   
            <div style={{display:"block"}}>{this.state.blocks}</div>
            <button
              onClick={
                ()=>{
                  this.setState({blocks_num: blocks_num+1});
                  this.setState({blocks:blocks.concat(<Block block_num={blocks_num+1} />)});

                }
              }
            >+</button>
            <button
              onClick={
                ()=>{
                  this.setState({blocks_num: blocks_num-1});
                  this.setState({blocks:blocks.slice(0,-1)});                 
                }
              }
            >-</button>
          </div>     
    );
  }  
}

class Block extends Component{
  render(){
    return(
      <div style={{display: 'flex'}}>
        <div>
          <input type="number" min="1" value={this.props.block_num} />
        </div>       
        <div><Time /></div>       
        <div><Time /></div>     
        <div><Time /></div>           
        <div><Content /></div>    
      </div>
    );
  }
}

class Content extends Component{
  constructor(props){
    super(props);
    
    this.default_block = (<div><Type /><Series /></div>);
    this.state = {      
      blocks:[ this.default_block ]
    };
    
  }
  render(){
    const {blocks,blocks_num} = this.state;
    return(    
        <div>
          <div> 
            {              
              // <div><Type /><Series /></div>
              blocks.map( function (el) {return (el)} )
            }
          </div>
          <button
            onClick={              
              ()=>{
                const el = (this.default_block)
                this.setState({blocks:blocks.concat(el)})
              }
            }
          >+</button>   
          <button
            onClick={              
              ()=>{                
                this.setState({blocks:blocks.slice(0,-1)})
                this.setState({blocks_num:blocks_num-1})
              }
            }
          >-</button>  
        </div>
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
    console.log(this.state.week_day_dates[0])
    return(  
      <div>
        <div style={{display: 'flex'}}>
          <div>День тиждня</div><div>№ блоку</div><div>Початок</div><div>Кінец</div><div>Тривалість</div><div>Контент</div>              
        </div>
        {this.state.days.map( (day,i) => <Row day={day} day_date={this.state.week_day_dates[i]}  />)}
      </div>
    );
  }  
}

export default App;
