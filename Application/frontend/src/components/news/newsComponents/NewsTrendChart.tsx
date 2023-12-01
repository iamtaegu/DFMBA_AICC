import React from 'react';
import Plot from 'react-plotly.js';

import { useGetNewsTrendsQuery } from "../newsApi";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {IProps} from "../../types";

export default function NewsTrendChart({ search, date }: IProps) {
    const { data, isLoading } = useGetNewsTrendsQuery({search: search, date: date});

    if (isLoading || !data) {
        return (
            <Box sx={{ p:3, textAlign: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    const trace: Plotly.Data = {
        x: data.message.map((el) => el.date),
        y: data.message.map((el) => el.doc_count),
        type: "scatter",
        mode: "lines+markers",
    }

    return (
        <div> {search} 수집 추이
            <Plot
                data={[trace]}
                layout={ {autosize: true} }
                style={ {width: "100%"} }
            />
        </div>
    );
}