import { useCallback, useEffect, useState } from "react";
import { getSlots } from "../api/get-slots";
import { Slot } from "../api/request-response-types";
import SlotButton from "../components/slot-button";


const CustomerBooking: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]); // Default to today
    const [slots, setSlots] = useState<Slot[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSlots = async (date: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getSlots({ date, isBooked: 'false' });
            if (response.success) {
                setSlots(response.data || []);
            } else {
                setError(response.error?.message || 'Failed to fetch slots.');
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSlots(selectedDate); // Fetch slots whenever selectedDate changes
    }, [selectedDate]);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value); // Update selected date
    };

    return (
        <div className="booking-container">
            <h1 className="p-1">Booking</h1>
            <div>
                <label htmlFor="date-picker">Date</label>
                <input
                    type="date"
                    id="date-picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="date-picker"
                />
            </div>

            <h3>Pick a Slot</h3>
            {loading && <p>Loading slots...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && slots.length === 0 && <p>No slots available for this date. Please pick a date for 1st August 2024</p>}
            <div className="slots-container p-1">
                {slots.map((slot) => (
                    <SlotButton {...{ isBooked: slot.isBooked == "true", startDate: slot.startDate }} />
                    // <button
                    //     key={slot.id}
                    //     className="slot-button"
                    //     disabled={slot.isBooked === 'true'}
                    // >
                    //     {new Date(slot.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    // </button>
                ))}
            </div>
        </div>
    );
};
export default CustomerBooking;