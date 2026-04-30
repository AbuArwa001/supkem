import { Map, Plane } from "lucide-react";

export const DataSummaryGrid = ({
    travel_visa_details,
    serial_number
}: {
    travel_visa_details: any;
    serial_number: string;
}) => {
    return (
        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 print:bg-white">
            <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase">Destination</p>
                <p className="font-bold flex items-center gap-2">
                    <Map size={14} className="text-secondary" /> {travel_visa_details.destination_country}
                </p>
            </div>
            <div className="text-right space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase">Purpose of Trip</p>
                <p className="font-bold">{travel_visa_details.trip_purpose}</p>
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase">Travel Date</p>
                <p className="font-bold flex items-center gap-2">
                    <Plane size={14} className="text-secondary" /> {new Date(travel_visa_details.expected_travel_date).toLocaleDateString()}
                </p>
            </div>
            <div className="text-right space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase">Tracking Ref</p>
                <p className="font-bold">{serial_number}</p>
            </div>
        </div>
    );
};
