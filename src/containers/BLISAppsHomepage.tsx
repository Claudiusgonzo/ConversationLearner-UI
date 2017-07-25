import * as React from 'react';
import AppAdmin from './AppAdmin';
import { fetchApplications } from '../actions/fetchActions'
import BLISAppsList from './BLISAppsList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { State } from '../types'

class BLISAppsHomepage extends React.Component<any, any> {
    constructor(p: any) {
        super(p);
        this.state = {
            displayedUserId: null
        }
    }
    componentDidUpdate()
    {
        if (this.state.displayedUserId != this.props.userId) {
            this.setState({
                displayedUserId: this.props.userId
            })
            this.props.fetchApplications(this.props.userKey, this.props.userId);
        }
    }
    render() {
        return (
            <div className="fluidCont">
                {this.props.display.myAppsDisplay == 'Home' ?             
                    <BLISAppsList  />
                    : <AppAdmin />
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    fetchApplications: fetchApplications
  }, dispatch);
}

const mapStateToProps = (state: State) => {
    return {
        display: state.display,
        userKey: state.user.key,
        userId: state.user.id,
        blisApps: state.apps
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BLISAppsHomepage);