import React from 'react';
import {connect} from "react-redux";

class Pagination extends React.Component{

    handlePrev = (e) => {
        this.props.goTo({
           type: 'goToPrev',
        });
    }

    handleNext = (e) => {
        this.props.goTo({
            type: 'goToNext',
        });
    }

    goToPage(pageNum){
        this.props.changePage({
            type: "changePage",
            pageNum: pageNum
        });
    }

    prevButton(){
        let prevChar = "<<";

        return(
            <li className="page-item">
                <button onClick={this.handlePrev} className="page-link"  tabIndex="-1" disabled={this.props.currentPagingStart === 1}> {prevChar} </button>
            </li>
        );
    }

    nextButton(){
        let nextChar = ">>";

        return (
            <li className="page-item">
                <button onClick={this.handleNext} className="page-link"  tabIndex="-1" disabled={this.props.currentPagingEnd === this.props.totalPage}> {nextChar} </button>            </li>
        );
    }


    renderPagination(){
        let paginationButtons = [];
        if(!("currentPagingEnd" in this.props))
        {
            return null;
        } else
        {
            for(let i=this.props.currentPagingStart; i<=this.props.currentPagingEnd; i++){
                if(this.props.page === i){
                     paginationButtons.push(<li key={i} className="page-item active" aria-current="page">
                         <button onClick={ () => {this.goToPage(i)}} className="page-link" >{i}</button>
                     </li>);
                } else{

                paginationButtons.push(<li key={i} className="page-item" aria-current="page">
                    <button onClick={ () => {this.goToPage(i)}} className="page-link" >{i}</button>
                </li>);
            }
            }
        }
        return paginationButtons;
    }

    render() {
        return(
            <nav aria-label="...">
                <ul className="pagination justify-content-center">
                    {this.prevButton()}
                    {this.renderPagination()}
                    {this.nextButton()}
                </ul>
            </nav>

        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        goTo: (action) => {
            dispatch(action);
        },
        changePage: (action) => {
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);