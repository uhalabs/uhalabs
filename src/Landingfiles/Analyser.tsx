import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import dayjs from "dayjs";

const ExcelProcessor = () => {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [summaryData, setSummaryData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const normalize = (key: string) => key?.toLowerCase().trim();

  const parseExcelDate = (value: any) => {
    if (!value) return null;
    if (typeof value === "number") {
      return dayjs(new Date((value - 25569) * 86400 * 1000));
    }
    const parsed = dayjs(value);
    return parsed.isValid() ? parsed : null;
  };

  const getHoursBucket = (date: any) => {
    const parsed = parseExcelDate(date);
    if (!parsed) return "";
    const diffDays = dayjs().diff(parsed, "day");

    if (diffDays > 3) return "72Hrs Above";
    if (diffDays < 1) return "0-24Hrs";
    return "24-72Hrs";
  };

  const processData = (data: any[]) => {
    return data.map((row) => {
      let result: any = { ...row };
      const stage = row["stage"]?.toString().toUpperCase().trim() || "";

      if (stage === "CRO") {
        result["HOURS"] = getHoursBucket(row["created at"]);
      }

      if (["AM", "BM", "CM", "HEAD", "FORCE"].includes(stage)) {
        result["HOURS2"] = getHoursBucket(row["cro submitted at"]);
      }

      return result;
    });
  };

  // 🔥 ADVANCED SUMMARY (MATCHES YOUR EXCEL)
  const generateAdvancedSummary = (data: any[]) => {
    const result: any = {};

    data.forEach((row) => {
      const vertical = row["vertical"] || "UNKNOWN";
      const stage = row["stage"]?.toUpperCase();

      if (!result[vertical]) {
        result[vertical] = {
          CRO: { "0-24Hrs": 0, "24-72Hrs": 0, "72Hrs Above": 0 },
          BM: { "0-24Hrs": 0, "24-72Hrs": 0, "72Hrs Above": 0 },
          CM: { "0-24Hrs": 0, "24-72Hrs": 0, "72Hrs Above": 0 },
          AM: { "0-24Hrs": 0, "24-72Hrs": 0, "72Hrs Above": 0 },
          HEAD: { "0-24Hrs": 0, "24-72Hrs": 0, "72Hrs Above": 0 },
          FORCE: { "0-24Hrs": 0, "24-72Hrs": 0, "72Hrs Above": 0 },
        };
      }

      let bucket = "";

      if (stage === "CRO") bucket = row["HOURS"];
      else if (["BM", "CM", "AM", "HEAD", "FORCE"].includes(stage))
        bucket = row["HOURS2"];

      if (bucket && result[vertical][stage]) {
        result[vertical][stage][bucket]++;
      }
    });

    return result;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setFilteredData([]);
    setSummaryData({});

    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, {
        range: 4,
      });

      const normalizedData = jsonData.map((row) => {
        const newRow: any = {};
        Object.keys(row).forEach((key) => {
          newRow[normalize(key)] = row[key];
        });
        return newRow;
      });

      const filtered = normalizedData.filter((row) => {
        const rowString = Object.values(row).join(" ").toLowerCase();
        const status = row["status"]?.toLowerCase() || "";
        return rowString.includes("yes") && status.includes("draft");
      });

      const finalFiltered =
        filtered.length > 0 ? filtered : normalizedData;

      const processed = processData(finalFiltered);
      const advancedSummary = generateAdvancedSummary(processed);

      setFilteredData(finalFiltered);
      setSummaryData(advancedSummary);
      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new();

    const sheet1 = XLSX.utils.json_to_sheet(filteredData);

    const summaryArray: any[] = [];

    Object.entries(summaryData).forEach(([vertical, stages]: any) => {
      const row: any = { Vertical: vertical };

      ["CRO", "BM", "CM", "AM", "HEAD", "FORCE"].forEach((stage) => {
        row[`${stage}_0-24`] = stages[stage]["0-24Hrs"];
        row[`${stage}_24-72`] = stages[stage]["24-72Hrs"];
        row[`${stage}_72+`] = stages[stage]["72Hrs Above"];
      });

      summaryArray.push(row);
    });

    const sheet2 = XLSX.utils.json_to_sheet(summaryArray);

    XLSX.utils.book_append_sheet(workbook, sheet1, "Filtered Data");
    XLSX.utils.book_append_sheet(workbook, sheet2, "Final Output");

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(new Blob([buffer]), "Final_Output.xlsx");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100 text-gray-900 p-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl max-w-7xl mx-auto overflow-hidden border border-white">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-violet-700 to-indigo-500 bg-clip-text text-transparent">
              Loan SLA Processor
            </h1>
            <p className="text-gray-400 text-sm mt-1">Analyse loan stage data from your Excel file</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-100 text-violet-600 border border-violet-200">
            SLA Tracker
          </span>
        </div>

        <div className="px-8 pb-8">

          {/* File Upload */}
          <label className="inline-flex items-center gap-3 cursor-pointer px-5 py-3 rounded-xl border border-dashed border-violet-300 bg-violet-50 hover:bg-violet-100 transition group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-700 group-hover:text-violet-900 transition">
                {fileName ? fileName : "Upload Excel File"}
              </p>
              <p className="text-xs text-gray-400">.xlsx / .xls only</p>
            </div>
            <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-violet-500 font-medium text-sm">Processing your file, please wait…</p>
            </div>
          )}

          {!loading && filteredData.length > 0 && (
            <>
              {/* Filtered Data */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-gray-700 text-base">Filtered Data</h2>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium border border-emerald-200">
                    {filteredData.length} rows
                  </span>
                </div>
                <div className="overflow-auto max-h-64 rounded-xl border border-gray-200 shadow-sm">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-800 sticky top-0">
                      <tr>
                        {Object.keys(filteredData[0]).map((key) => (
                          <th key={key} className="border-b border-slate-700 px-3 py-2 text-left font-semibold text-slate-200 whitespace-nowrap">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.slice(0, 20).map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                          {Object.values(row).map((val: any, idx) => (
                            <td key={idx} className="border-b border-slate-100 px-3 py-1.5 whitespace-nowrap text-slate-700">
                              {val || "-"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summary Table */}
              <div className="mt-8">
                <h2 className="font-semibold text-gray-700 text-base mb-3">Final Output</h2>
                <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gradient-to-r from-violet-700 to-indigo-600 text-white">
                        <th className="px-3 py-2.5 text-left font-semibold border-r border-violet-500">Vertical</th>
                        {["CRO", "BM", "CM", "AM", "HEAD", "FORCE"].map((s) => (
                          <th key={s} colSpan={3} className="px-3 py-2.5 text-center font-semibold border-r border-violet-500">
                            {s} Draft
                          </th>
                        ))}
                      </tr>
                      <tr className="bg-indigo-50 text-indigo-700">
                        <th className="px-3 py-2 border-r border-indigo-100"></th>
                        {[...Array(6)].map((_, i) => (
                          <React.Fragment key={i}>
                            <th className="px-3 py-2 text-center font-medium text-emerald-600 border-r border-indigo-100">0-24</th>
                            <th className="px-3 py-2 text-center font-medium text-amber-600 border-r border-indigo-100">24-72</th>
                            <th className="px-3 py-2 text-center font-medium text-rose-600 border-r border-indigo-200">72+</th>
                          </React.Fragment>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(summaryData).map(([vertical, stages]: any, i) => (
                        <tr key={vertical} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                          <td className="px-3 py-2 font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">{vertical}</td>
                          {["CRO", "BM", "CM", "AM", "HEAD", "FORCE"].flatMap((stage) => [
                            <td key={`${stage}-0`} className="px-3 py-2 text-center border-r border-slate-100 text-emerald-700 font-medium">{stages[stage]["0-24Hrs"]}</td>,
                            <td key={`${stage}-1`} className="px-3 py-2 text-center border-r border-slate-100 text-amber-700 font-medium">{stages[stage]["24-72Hrs"]}</td>,
                            <td key={`${stage}-2`} className="px-3 py-2 text-center border-r border-slate-200 text-rose-700 font-medium">{stages[stage]["72Hrs Above"]}</td>,
                          ])}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <button
                onClick={downloadExcel}
                className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition shadow-md shadow-violet-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Excel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExcelProcessor;