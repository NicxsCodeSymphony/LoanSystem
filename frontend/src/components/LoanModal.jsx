import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../styles/addLoan.css';

const LoanModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const [formData, setFormData] = useState({
        Amount: '',
        Term: '',
        Interest: '',
        Deduction: '',
        Payment: '',
    });
    const [amountTerm, setAmountTerm] = useState('');
    const [total, setTotal] = useState('');
    const [nextPaymentDate, setNextPaymentDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const { id } = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        calculatedAmounts();
    }, [formData]);

    const calculatedAmounts = () => {
        const { Amount, Term, Interest, Payment } = formData;
        if (Amount && Term && Interest && Payment) {
            const interest = Amount * (Interest / 100);
            const AmountPerTerm = (Amount / Term) + interest;
            const total = AmountPerTerm * Term
            let today = new Date();
            let nextPayment = new Date(today);
            let dueDate = new Date(today);
    
            if (Payment === 'Daily') {
                nextPayment.setDate(today.getDate() + 1);
                dueDate.setDate(today.getDate() + parseInt(Term));
            } else if (Payment === 'Weekly') {
                nextPayment.setDate(today.getDate() + 7);
                dueDate.setDate(today.getDate() + (7 * parseInt(Term)));
            } else if (Payment === 'Monthly') {
                nextPayment.setMonth(today.getMonth() + 1);
                dueDate.setMonth(today.getMonth() + parseInt(Term));
            } else if (Payment === 'Bi-Weekly') {
                nextPayment.setDate(today.getDate() + 14);
                dueDate.setDate(today.getDate() + (14 * parseInt(Term)));
            } else if (Payment === 'Yearly') {
                nextPayment.setFullYear(today.getFullYear() + 1);
                dueDate.setFullYear(today.getFullYear() + parseInt(Term));
            }
    
            setAmountTerm(AmountPerTerm.toFixed(2));
            setTotal(total.toFixed(2));
            setNextPaymentDate(formatDate(nextPayment));
            setDueDate(formatDate(dueDate));
        }
    };
    

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataWithExtras = {
            ...formData,
            Borrower: parseInt(id),
            AmountPerTerm: amountTerm,
            Total: total,
            TotalLeft: total,
            DueDate: dueDate,
            NextPayment: nextPaymentDate,
            Status: 'Unpaid',
        };

        try {
            const response = await axios.post('http://localhost:5291/LoanControllerAPI/CreateLoanAPI', formDataWithExtras);
            console.log(response);
            alert("Successfully added a new Loan");
            window.location.reload();
        } catch (err) {
            console.error("Error adding loan:", err);
            alert("An error occurred while adding the loan. Please check the console for details.");
        }
    };


    return (
        <div className="modal-container2">
            <div className="modal-content2">
                <h1 className="modal-title2">Add Loan</h1>
                <hr />

                <form className="form-container2" onSubmit={handleSubmit}>
                    <div className="form-section2">
                        <div className="w-full">
                            <div className="form-group2">
                                <label>Amount</label> <br />
                                <input type="number" className="border p-1 mt-1 w-3/4" name="Amount" onChange={handleInputChange} value={formData.Amount || ''} />
                            </div>

                            <div className="form-group2">
                                <label>Term</label> <br />
                                <input className="border p-1 mt-1 w-3/4" name="Term" onChange={handleInputChange} value={formData.Term || ''} />
                            </div>

                            <div className="form-group2">
                                <label>Interest</label> <br />
                                <input className="border p-1 mt-1 w-3/4" name="Interest" onChange={handleInputChange} value={formData.Interest || ''} />
                            </div>

                            <div className="form-group2">
                                <label>Deduction</label> <br />
                                <input className="border p-1 mt-1 w-3/4" name="Deduction" onChange={handleInputChange} value={formData.Deduction || ''} />
                            </div>

                            <div className="form-group2">
                                <label>Payment</label> <br />
                                <select className="border p-1 mt-1 w-3/4" name="Payment" onChange={handleInputChange} value={formData.Payment || ''}>
                                    <option value="">Select</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Bi-Weekly">Bi-Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Semester">Semester</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="form-group2">
                                <label>Amount Payable per Term</label> <br />
                                <input className="border p-1 mt-1 w-3/4" name="AmountPerTerm" value={amountTerm} readOnly />
                            </div>

                            <div className="form-group2">
                                <label>Total Amount Receivable</label> <br />
                                <input className="border p-1 mt-1 w-3/4" name="Total" value={total} readOnly />
                            </div>

                            <div className="form-group2">
                                <label>Next Payment</label> <br />
                                <input type="date" className="border p-1 mt-1 w-3/4" name="NextPayment" value={nextPaymentDate} readOnly />
                            </div>

                            <div className="form-group2">
                                <label>Due Date</label> <br />
                                <input type="date" className="border p-1 mt-1 w-3/4" name="DueDate" value={dueDate} readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="button-group2">
                        <button type="submit" className="button2">Add Loan</button>
                        <button type="button" onClick={onClose} className="button2 close">Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoanModal;
