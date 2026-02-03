import {reportApi} from "../../api/reportApi.ts";
import type {ResponseReport} from "../../types/common.ts";

export const ButtonDownloadReport = () => {
    const handleOnClick = async () => {
        try {
            const data: ResponseReport = await reportApi.getReport();

            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], {type: "application/json"});
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'report.json';
            a.click();

            URL.revokeObjectURL(url);
        } catch (e) {
            console.log('ERROR-catch: Ошибка при генерации отчета ', e)
            alert("Ошибка при генерации отчета");
        }

    }

    return <button onClick={handleOnClick}><h4>СКАЧАТЬ JSON ОТЧЁТ</h4></button>
}