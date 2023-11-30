import React from 'react';
import Plot from 'react-plotly.js';

import { useGetSentimentTrendsQuery } from "../newsApi";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface IProps {
    search: string;
}

export default function SentimentTrendChart({ search }: IProps) {
    const { data, isLoading } = useGetSentimentTrendsQuery({search: search});

    if (isLoading || !data) {
        return (
            <Box sx={{ p:3, textAlign: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    const traces: Plotly.Data[] = [
        'positive', 'neutral', 'negative',
    ].map((x) => ({
        x: data.message.map((el: any) => el.date),
        y: data.message.map((el: any) => (el as any)[x]),
        type: "scatter",
        mode: "lines+markers",
        name: x,
    }))

    return (
        <div> {search} 성향 분석 추이
            <Plot
                data={traces}
                layout={ {autosize: true} }
                style={ {width: "100%"} }
            />
        </div>
    );
}