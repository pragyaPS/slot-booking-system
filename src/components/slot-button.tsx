import React, { useState } from "react";
import Modal from "../atoms/modal/modal";

interface SlotButtonProps {
    startDate: string;
    isBooked: boolean;
}

const SlotButton: React.FC<SlotButtonProps> = ({ startDate, isBooked }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const formattedTime = new Date(startDate).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    const handleCancelBooking = () => {
        setModalOpen(false)

    }

    return (
        <>
            <button
                onClick={() => setModalOpen(true)}
                disabled={isBooked}
                className={`px-4 py-2 border rounded ${isBooked
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
            >
                {formattedTime}
            </button>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    <Modal.Header>Book this Slot?</Modal.Header>
                    <Modal.Body>
                        <div>
                            <p>Date: {new Date(startDate).toLocaleDateString()}</p>
                            <p>Time: {formattedTime}</p>
                            <p>Duration: 60 minutes</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={handleCancelBooking}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                            onClick={() => {
                                console.log("Booking Confirmed for", startDate);
                                setModalOpen(false);
                            }}
                        >
                            Book
                        </button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default SlotButton;
