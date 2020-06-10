import React from "react";
import Col from "react-bootstrap/Col";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { connect } from "react-redux";
// const { PieChart, Pie, Legend, Tooltip } = Recharts;
function Chart(props) {
    const COLORS = ["#eeeeee", "#17A2B8", "#ff0000"];
    function renderColorfulLegendText(value, entry) {
        const { color } = entry;

        return <span style={{ color }}>{value}</span>;
    }
    return (
        <Col md={{ offset: 3 }}>
            <PieChart width={500} height={350}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={props.data}
                    fill="#8884d8"
                    label
                >
                    {props.data.map((entry, index) => (
                        <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Legend
                    layout="vertical"
                    formatter={renderColorfulLegendText}
                ></Legend>
                <Tooltip></Tooltip>
            </PieChart>
        </Col>
    );
}
const mapStateToProps = (state) => ({
    data: state.ChartData,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
