import React from 'react';
import Plot from 'react-plotly.js';

import { useGetSentimentTrendsQuery } from "../newsApi";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { XNameSignature, IProps } from "../../types";

export default function SentimentTrendChart({ search,date }: IProps) {
    const { data, isLoading } = useGetSentimentTrendsQuery({search: search, date:date});

    if (isLoading || !data) {
        return (
            <Box sx={{ p:3, textAlign: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    const xName: XNameSignature = {'positive':'긍정', 'neutral':'중립', 'negative':'부정'};
    const traces: Plotly.Data[] = [
        'positive', 'neutral', 'negative',
    ].map((x) => ({
        x: data.message.map((el: any) => el.date),
        y: data.message.map((el: any) => (el as any)[x]),
        type: "scatter",
        mode: "lines+markers",
        name: xName[x],
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