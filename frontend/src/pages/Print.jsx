import { useParams } from "react-router-dom";
import useFetch from "../crud/Fetch";
import '../styles/print.css';
import { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";

const Prints = () => {
    const { id } = useParams();
    const { data: transactions, loading, error } = useFetch(`http://localhost:5291/LoanControllerAPI/GetTransactionToPrint/${id}`);
    const [total, setTotal] = useState(0);
const [secondToLastSegment, setSecondToLastSegment] = useState("");

    useEffect(() => {
        const urlSegments = window.location.href.split('/');
        if (urlSegments.length >= 2) {
            setSecondToLastSegment(urlSegments[urlSegments.length - 2]);
        }
    }, []);
    useEffect(() => {
        if (transactions && transactions.length > 0) {
            const totalAmount = transactions.reduce((acc, curr) => acc + curr.amount, 0);
            setTotal(totalAmount);
        } else {
            setTotal(0); // Reset total if there are no transactions
        }
    }, [transactions, id]);

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

    const handlePrint = () => {
        const element = document.querySelector('.print-container'); // Select the element you want to print
        const opt = {
            margin:       1,
            filename:     'your-paid-loan.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        // New Promise-based usage:
        html2pdf().from(element).set(opt).save();
    };
    
    return (
        <div className="h-screen bg-AdminBg text-white">
            
            <div className="print-container">
            <h1>{secondToLastSegment}'s Transaction Record</h1>
                {transactions.map((transaction) => (
                    <div className="transaction-item" key={transaction.transactionId}>
                        <h2>Transaction ID: {transaction.transactionId}</h2>
                        <p>Schedule ID: {transaction.scheduleId}</p>
                        <p>Amount: {transaction.amount}</p>
                        <p>Transaction Date: {transaction.transactionDate ? formatDate(transaction.transactionDate) : ''}</p>
                    </div>
                ))}
                <h3>Total: ₱{total.toFixed(2)}</h3>
            </div>
            <button onClick={handlePrint}>Print</button>
        </div>
    );
};

export default Prints;
