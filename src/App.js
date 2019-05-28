import {connect} from "react-redux";
import React from 'react';
import './App.css';
import axios from 'axios';
import TableData from './components/TableData';
import Pagination from './components/Pagination';
import Buttons from './components/Buttons';


class App extends React.Component {


    componentDidMount() {
        axios.get("https://demo9197058.mockable.io/users")
        .then(
            (res)=>{
                this.props.ajaxResponseAction({
                    type: 'ajaxResponse',
                    data: res.data
                })
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    }


    inputChangeHandler = (e)=>{
        let inpValue = e.target.value;
            this.props.searchAndUpdate({
                type: "search_update",
                inpValue: inpValue
            })
    }


    sortBy(key){
        this.props.sortActionByKey({
            type: "sort",
            key: key
        })
    }

    cursorStyle = {
        cursor: "pointer"
    }

    checkSortedKey(key){
        if(key === this.props.currentSorted){

            return (<i className="fa fa-fw fa-sort-down"></i>);
        } else
            return (<i className="fa fa-fw fa-sort"></i>);
    }


    render() {
        return (
            <React.Fragment>

                <div className="input-group col-md-4 m-3">
                    <input type="text" onChange={this.inputChangeHandler} placeholder="Start typing to search" className="form-control" />
                </div>

                <div className="m-2">
                    Click on any column name to sort.
                </div>

                <table className="table table-striped">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col" style={this.cursorStyle} onClick={()=>{this.sortBy("first_name")}}>First Name {this.checkSortedKey("first_name")}</th>
                        <th scope="col" style={this.cursorStyle} onClick={()=>{this.sortBy("last_name")}}>Last Name {this.checkSortedKey("last_name")}</th>
                        <th scope="col" style={this.cursorStyle} onClick={()=>{this.sortBy("company_name")}}>Company Name {this.checkSortedKey("company_name")}</th>
                        <th scope="col" style={this.cursorStyle} onClick={()=>{this.sortBy("city")}}>City {this.checkSortedKey("city")}</th>
                        <th scope="col" style={this.cursorStyle} onClick={()=>{this.sortBy("state")}}>State {this.checkSortedKey("state")}</th>
                        <th scope="col" style={this.cursorStyle} onClick={()=>{this.sortBy("zip")}}>Zip {this.checkSortedKey("zip")}</th>
                        <th scope="col" style={this.cursorStyle} onClick={()=>{this.sortBy("email")}}>Email {this.checkSortedKey("email")}</th>
                        <th scope="col" style={this.cursorStyle} onClick={()=>{this.sortBy("web")}}>Web {this.checkSortedKey("web")}</th>
                        <th scope="col" style={this.cursorStyle} onClick={()=>{this.sortBy("age")}}>Age {this.checkSortedKey("age")}</th>
                    </tr>
                    </thead>
                    <tbody>
                        <TableData />
                    </tbody>
                </table>
                    <Buttons />
                <Pagination />
            </React.Fragment>);
    }
}
const mapStateToProps = state => {
  return {...state};
}


const mapDispatchToProps = (dispatch) => {
  return {
    ajaxResponseAction: (action) => {
      dispatch(action);
    },

      searchAndUpdate: (action) => {
        dispatch(action);
      },

      sortActionByKey: (action) => {
        dispatch(action);
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
