export interface Response 
{
    timestamp?: string;
    status:    number;
    error?:     string;
    path?:      string;
    success?: boolean;
    message: string;
}
