import React, { useEffect, PureComponent } from "react";
import {
   AreaChart,
   Area,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   BarChart,
   PieChart,
   Pie,
   ComposedChart,
   Line,
   Bar,
   Cell,
   Scatter,
   Legend,
   ResponsiveContainer,
} from "recharts";

import data from "./data/data.json";

function Dashboard() {
   useEffect(() => {
      console.log(data);
   }, []);
   return (
      <div className="app__container p-4 ">
         <div className="oe_welcome">
            <h1 className="font-bold text-3xl">Bonjour Gracias Kasongo</h1>
            <p>Nous sommes heureux de vous revoir encore...</p>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-5 gap-2 mt-4">
            <div className="shadow bg-white rounded-md p-[2rem_1rem] h-[300px]">
               <h4>Identifications</h4>
               <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                     width={500}
                     height={400}
                     data={data}
                     margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                     }}
                  >
                     <CartesianGrid stroke="#f5f5f5" />
                     <XAxis dataKey="name" scale="band" />
                     <YAxis />
                     <Tooltip />
                     <Legend />
                     <Area
                        type="monotone"
                        dataKey="amt"
                        fill="#8884d8"
                        stroke="#8884d8"
                     />
                     <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                     <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                     <Scatter dataKey="cnt" fill="red" />
                  </ComposedChart>
               </ResponsiveContainer>
            </div>

            <div className="shadow bg-white rounded-md  p-[2rem_1rem] h-[300px]">
               <h4 className="text-xl font-extrabold">Plaintes</h4>
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                     width={500}
                     height={300}
                     data={data}
                     margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                     }}
                  >
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="name" />
                     <YAxis />
                     <Tooltip />
                     <Legend />
                     <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                     <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
                     <Bar dataKey="uv" fill="#ffc658" />
                  </BarChart>
               </ResponsiveContainer>
            </div>

            <div className="shadow bg-white rounded-md  p-[2rem_1rem] h-[300px]">
               <h4 className="text-xl font-extrabold">Engins</h4>
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                     width={500}
                     height={400}
                     data={data}
                     margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                     }}
                  >
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="name" />
                     <YAxis />
                     <Tooltip />
                     <Area
                        type="monotone"
                        dataKey="uv"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                     />
                     <Area
                        type="monotone"
                        dataKey="pv"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                     />
                     <Area
                        type="monotone"
                        dataKey="amt"
                        stackId="1"
                        stroke="#ffc658"
                        fill="#ffc658"
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="  p-3 mt-4">
            <h4>Dernières identifications</h4>
            <table class="table table-auto  rounded-md p-2 mt-4">
               <thead>
                  <tr>
                     <th>Id</th>
                     <th>Conducteur</th>
                     <th>Propriétaire</th>
                     <th>Plaque</th>
                     <th>Type</th>
                     <th>Chasis</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>I09122023</td>
                     <td>Gracias Kasongo</td>
                     <td>Malcolm Lockyer</td>
                     <td>AS-1961</td>
                     <td></td>
                     <td></td>
                  </tr>
                  <tr>
                     <td>I08122023</td>
                     <td>Salumu Benart</td>
                     <td>The Eagles</td>
                     <td>AB-1972</td>
                     <td>Taxi</td>
                     <td>VF7 SBHMZ0 EW554823</td>
                  </tr>
                  <tr>
                     <td>I07122023</td>
                     <td>Shining Star</td>
                     <td>Gracias Kasongo</td>
                     <td>BC-1975</td>
                     <td>Privé</td>
                     <td>UF7 ZBHMZ0 SW500823</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default Dashboard;
