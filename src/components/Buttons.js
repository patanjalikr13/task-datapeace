import React from 'react';
import {connect} from "react-redux";

class Buttons extends React.Component{

    prevPage = (e) =>{
        this.props.prevPage({
           type: "prevPage"
        });
    }

    nextPage = (e) =>{
        this.props.nextPage({
            type: "nextPage"
        });
    }




    render() {
        return (
            <div className="d-flex justify-content-between mx-2">
            <button type="button" onClick={this.prevPage} disabled={this.props.page === 1} className="btn btn-primary">Previous</button>

                <button type="button" onClick={this.nextPage} disabled={this.props.page === this.props.totalPage} className="btn btn-primary">Next</button>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        nextPage: (action) => {
            dispatch(action);
        },
        prevPage: (action) => {
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);