import { useCallback, useEffect } from "react";
import { getSlots } from "../api/get-slots";
import { GetSlotsParams } from "../api/request-response-types";

const CustomerBooking = () => {
    const fetchSlots = useCallback(async (params: GetSlotsParams = {}) => {

        try {
            const response = await getSlots(params);
            console.log({ response })

        } catch (err) {

        } finally {

        }
    }, []);
    useEffect(() => {
        fetchSlots({ date: "2025-02-09", isBooked: "false" });
    }, [fetchSlots]);

    return (<div>
        customer CustomerBooking
    </div>)
};
export default CustomerBooking;