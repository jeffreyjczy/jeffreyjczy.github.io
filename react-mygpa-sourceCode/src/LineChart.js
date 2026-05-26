import React from "react";
import { MDBContainer } from "mdbreact";
import { Line } from "react-chartjs-2";
import './App.css';

const LineChart = (list) => {
    

    const gpaPerSem = list.gpaPerSem.map((v) => {
        return (parseFloat(v));
    })
    

    return (
        <MDBContainer>
            <Line style={{ width: '60vw', height: '30vh', maxWidth:'60vw', maxHeight:'30vh' }}
                data={{
                    labels: list.perSem,
                    datasets: [
                        {
                            label: "GPA each semester",
                            data: gpaPerSem,
                            fill: true,
                            backgroundColor: "rgba(219, 11, 4, .3)",
                            borderColor: "rgba(219, 11, 4)",
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    scales: {
                        y: {
                            min: 0,
                            max: 4
                        }

                    }
                }}
            />


        </MDBContainer>
    );
}

export default LineChart;
