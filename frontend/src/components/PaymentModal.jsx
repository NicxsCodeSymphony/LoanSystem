import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/PaymentModal.css'; // Import the CSS file

const PaymentModal = ({ isOpen, onClose, loanId, currentAmount }) => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [payment, setPayment] = useState(currentAmount);
    const [totalLeft, setTotalLeft] = useState(0); // State to hold the total left
    const [Transaction, setTransactions] = useState(null);
    

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            axios.get(`http://localhost:5291/LoanControllerAPI/GetLoanInfo/${loanId}`)
                .then(response => {
                    const loanInfo = response.data;
                    setFormData(loanInfo);
                    setLoading(false);
                    // Calculate total left here and set it to state
                    const totalLeft = loanInfo.payment - calculateTotalPaid(loanId);
                    setTotalLeft(totalLeft);
                })
                .catch(error => {
                    console.error("There was an error fetching loan info!", error);
                    setError("Error fetching loan information");
                    setLoading(false);
                });
        }
    }, [loanId, isOpen]);

    const handlePaymentChange = (e) => {
        setPayment(e.target.value);
    };

    const handlePaymentSubmit = () => {
        const amountPaid = parseFloat(payment);
        if (isNaN(amountPaid) || amountPaid <= 0) {
            alert("Please enter a valid positive number");
            return;
        }

        const paymentData = {
            Id: formData.id,
            LoanId: formData.loanId,
            Schedule: formData.schedule,
            Payment: amountPaid
        };

        setLoading(true);
        axios.put(`http://localhost:5291/LoanControllerAPI/PayTheLoan/${loanId}`, paymentData)
            .then(response => {
                alert("The Loan was Paid");
                setLoading(false);
                onClose();
                window.location.reload();
            })
            .catch(error => {
                console.error("There was an error paying the loan!", error);
                alert("An error occurred while paying the loan.");
                setLoading(false);
            });
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const options = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        return formattedDate.toLocaleString('en-US', options);
    };

    const fetchTransactions = async () => {
        try {
            const response = await fetch('http://localhost:5291/LoanControllerAPI/GetAllTransactions');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Transactions:', data); 
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        fetchTransactions(); // Fetch transactions when component mounts
    }, []); // Empty dependency array ensures it runs once

    // Function to calculate total paid from transactions
    const calculateTotalPaid = (loanId) => {
        if (!Transaction) return 0;

        // Filter transactions for the specific loanId and sum the amounts
        const totalPaid = Transaction
            .filter(transaction => transaction.scheduleId === loanId)
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        return totalPaid;
    };

    if (!isOpen) return null;

    return (
        <div className="pay-overlay">
            <div className="pay-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        {formData.status === 'Paid' ? (
                            <>
                                <h2 className="pay-title">Payment for this schedule was Paid</h2>
                                <p className="pay-status">Paid on {formData.schedule ? formatDate(formData.loanTime, true) : ''}</p>
                                <div className="pay-actions">
                                    <button onClick={onClose} className="pay-cancel cursor">Close</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="pay-title">Pay Loan: ₱{totalLeft.toFixed(2)}</h2>
                                <input
                                    type="number"
                                    onChange={handlePaymentChange}
                                    className="pay-input"
                                    placeholder={`Enter amount to pay (Total Left: ₱${totalLeft.toFixed(2)})`}
                                />
                                <div className="pay-actions">
                                    <button onClick={onClose} className="pay-cancel cursor">Cancel</button>
                                    <button onClick={handlePaymentSubmit} className="pay-pay cursor">Pay</button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;
