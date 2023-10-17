export interface DailyReportModel {
    id_daily_report: any;
    shift_leader: string;
    production_hours: Date;
    start: number;
    finish: number;
    result: number;
    isSelected?:any;
}
