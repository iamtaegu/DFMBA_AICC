export type SearchReqParams = {
    search: string;
    date: string;
}

export type NewsTrendItem = {
    date: string;
    doc_count: number;
}

export type NewsTrends = {
    message: NewsTrendItem[],
}

export type SentimentTrendItem = {
    date: string;
    positive: number;
    neutral: number;
    negative: number;
    sentiment: number;
}

export type SentimentTrends = {
    message: SentimentTrends[];
}

export type XNameSignature = {
    [key: string]: string;
}

export type IProps = {
    search: string;
    date: string;
}