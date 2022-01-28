import React, { Component } from 'react';

import Dmost from "./views/d-most";
import Chart from "./vendors/js/chart";
import { FaBiking } from "react-icons/fa";
import { } from "react-icons/ri";

import "./vendors/css/index.css";

 export default function Dashboard (props){
   
        return(
            <div className="dashboard-main">

            <div className="row">

                 <div className="col-12 col-sm-12 col-md-7 col-lg-7">
                    <div className="row">
                        <Dmost 
                            name="motard" 
                            title="Conducteurs" 
                            chartype="line"
                            data={[{thisMonth:0,thisYear:0}]} 
                            chartname="motardChart"
                        />
                        <Dmost 
                            name="association" 
                            title="Associations"
                            chartype="bar"
                            data={[{thisMonth:0,thisYear:0}]} 
                            chartname="cooperativeChart"
                        />
                        <Dmost 
                            name="moto" 
                            title="Vehicules" 
                            chartype="horizontal"
                            data={[{thisMonth:0,thisYear:0}]} 
                            chartname="usersChart" 
                        />
                        <Dmost 
                            name="identification" 
                            title="Propriétaire"
                            chartype="pie" 
                            data={[{thisMonth:0,thisYear:0}]} 
                            chartname="managersChart"
                        />
                    </div>
                 </div>


                <div className="col-12 col-sm-12 col-md-5 col-lg-5">
                   
                    <div className="row">

                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="d-most d-most-table">
                                <div className="most-h">
                                    <h4>Dernières identifications</h4>
                                </div>
                                <div className="most-divider"> </div>
                                <div className="most-d" id="no-flex">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="text-left">Moto</th>
                                                <th>Motard</th>
                                                <th>Propriétaire</th>
                                                <th className="text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="text-left">TVS-56</td>
                                            <td>Ngandu tambwe</td>
                                            <td>Gracias Kasongo</td>
                                            <td className="text-right">
                                                <span className="status bg-success">
                                                    valid
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-left">GL-Turbo</td>
                                            <td>Didier dechamps</td>
                                            <td>Darcin ULK</td>
                                            <td className="text-right">
                                                <span className="status bg-ingo">
                                                    draft
                                                </span>
                                            </td>
                                        </tr>
                                            <tr>
                                                <td className="text-left">Odoo Mate</td>
                                                <td>78</td>
                                                <td>$ 89.09</td>
                                                <td className="text-right">
                                                    <span className="status bg-danger">
                                                        Completed
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-left">Odoo Mate</td>
                                                <td>78</td>
                                                <td>$ 89.09</td>
                                                <td className="text-right">
                                                    <span className="status bg-danger">
                                                        Completed
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-left">Odoo Mate</td>
                                                <td>78</td>
                                                <td>$ 89.09</td>
                                                <td className="text-right">
                                                    <span className="status bg-warning">
                                                        Completed
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                            
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="d-most d-most-table">
                                <div className="most-h">
                                    <h4>Derniers cas de vols</h4>
                                </div>
                                <div className="most-divider"> </div>
                                <div className="most-d" id="no-flex">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="text-left">Moto</th>
                                                <th>Marque</th>
                                                <th>Model</th>
                                                <th className="text-right">Gillet</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-left">TVS</td>
                                                <td>GT</td>
                                                <td>89-p</td>
                                                <td className="text-right">
                                                    <span className="status bg-danger">
                                                        GL9860
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-left">U-PS</td>
                                                <td>gT-p</td>
                                                <td>RT9-p</td>
                                                <td className="text-right">
                                                    <span className="status bg-success">
                                                        GL-860
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-left">OP-56</td>
                                                <td>78-GH</td>
                                                <td>RT9-5</td>
                                                <td className="text-right">
                                                    <span className="status bg-success">
                                                        969-POP
                                                    </span>
                                                </td>
                                            </tr>
                                        
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>  

                    </div>
                </div>
            </div>
        </div>
    );
};