import React from 'react';
import axios from 'axios';

export default class ListConferenceInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            conference_detail: [],
            approved_details: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/conference-detail')
            .then(response => {
                this.setState({ conference_detail: response.data.data }, () => {
                    let data = [];
                    this.state.conference_detail.map((item, index) => {
                        let conference_details = {
                            value: item._id,
                            venue: item.venue,
                            venue_dates: item.venue_dates,
                            venue_time: item.venue_time,
                            registrationopen_date: item.registrationopen_date,
                            lastregistration_date: item.lastregistration_date,
                            is_approved: item.is_approved
                        }

                        data.push(conference_details)

                    });
                    this.setState({ approved_details: data });
                })
            })
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.approved_details.length > 0 && this.state.approved_details.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3">
                                <h5>Venue : {item.venue}</h5>
                                <h5>Dates : {item.venue_dates}</h5>
                                <h5>Time : {item.venue_time}</h5>
                                <h5>Regstration open : {item.registrationopen_date}</h5>
                                <h5>Regstration close : {item.lastregistration_date}</h5>
                                <h5>Status : {item.is_approved.toString()}</h5>
                                <button type="submit" className="btn btn-primary">Approve</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}