import React from 'react';
import {connect} from "react-redux";

class TableData extends React.Component{

    TableDataLoader(){
        let dataToPublish = [];

            this.props.dataToShow.map(
                (v, i) => {
                    dataToPublish.push(
                        <React.Fragment key={i}>
                        <tr>
                            <td>
                                {v.first_name}
                            </td>
                            <td>
                                {v.last_name}
                            </td>
                            <td>
                                {v.company_name}
                            </td>
                            <td>
                                {v.city}
                            </td>
                            <td>
                                {v.state}
                            </td>
                            <td>
                                {v.zip}
                            </td>
                            <td>
                                {v.email}
                            </td>
                            <td>
                                <a href={v.web} rel="noopener noreferrer" target="_blank">{v.web}</a>
                            </td>
                            <td>
                                {v.age}
                            </td>
                        </tr>
                        </React.Fragment>
                    )
                }
            )
        return (dataToPublish);
    }

    initialLoader(){
        if(!("allUsers" in this.props))
        return (
          <tr>
              <td colSpan="9">
                  Please wait while some awesome data is loaded.
              </td>
          </tr>
        );

        return this.TableDataLoader();
    }

    render() {
        let returnData = this.initialLoader();
        return returnData;
    }
}

const mapStateToProps = (state) => {
//    console.log(state);
    return {...state};
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionSome: (action) => {
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableData);