import '../styles/Client.css';
import Heading from '../components/Heading';
import { FaMoneyBillWave } from 'react-icons/fa';
import useFetch from '../crud/Fetch';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import LoanModal from '../components/LoanModal';
import PaymentModal from '../components/PaymentModal';

export default function LoanInfo() {
    const { id } = useParams();

    const { data: clients, loading: clientsLoading, error: clientsError } = useFetch(`http://localhost:5291/ClientControllerAPI/GetClientById/${id}`);
    const { data: loans, loading: loanLoading, error: loanError } = useFetch(`http://localhost:5291/LoanControllerAPI/GetLoanbyId/${id}`);
    const [payLoanData, setPayLoanData] = useState([]);
    const [totalPayable, setTotalPayable] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [dueDate, setDueDate] = useState('')
    const [status, setStatus] = useState('');
    const [isOpenLoanModal, setOpenLoanModal] = useState(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [Transaction, setTransactions] = useState(null);

    useEffect(() => {
        if (loans && loans.length > 0) {
            let totalPayableSum = 0;
            let totalPaidSum = 0;
            let total = 0;
            let due = ''
            let status = ''
            loans.forEach(loan => {
                totalPayableSum += loan.total;
                totalPaidSum += loan.totalLeft;
                total = totalPayableSum - totalPaidSum;
                due = loan.dueDate;
                status = loan.status;
            });
            setStatus(status);
            setDueDate(due)
            setTotalPayable(totalPayableSum);
            setTotalPaid(total);
        }
    }, [loans]);

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

    const openPaymentModal = (loan) => {
        setSelectedLoan(loan);
        setPaymentModalOpen(true);
      };

      const closePaymentModal = () => {
        setPaymentModalOpen(false);
        setSelectedLoan(null);
      };

    const fetchPayLoan = async (loanId) => {
        try {
            const response = await fetch(`http://localhost:5291/LoanControllerAPI/GetPayLoan/${loanId}`);
            const data = await response.json();
            console.log(data);
            setPayLoanData(data);
        } catch (error) {
            console.error('Error fetching pay loan data:', error);
        }
    };

    if (clientsLoading || loanLoading) return <div>Loading...</div>;
    if (clientsError || loanError) return <div>Error: {clientsError?.message || loanError?.message}</div>;

    const handleLoanClick = (loanId) => {
        fetchPayLoan(loanId);
    };

    const formatDate = (dateString, includeTime = false) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        };
        const date = new Date(dateString);
        if (!includeTime) {
            return date.toLocaleDateString(undefined, options);
        } else {
            return date.toLocaleDateString(undefined, options) + `, ${date.getHours()}:${date.getMinutes()}${date.getHours() < 12 ? 'am' : 'pm'}`;
        }
    };

    const calculateTotalPaid = (loanId) => {
        if (!Transaction) return 0;
    
        // Filter transactions for the specific loanId and sum the amounts
        const totalPaid = Transaction
            .filter(transaction => transaction.scheduleId === loanId)
            .reduce((sum, transaction) => sum + transaction.amount, 0);
    
        return totalPaid;
    };
    


    return (
        <div className='client-page'>
            <Heading />
            <div className='container'>
                <div>
                    <div className='first-left'>
                        <h6>Employee Details</h6>
                        <img src='https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg' alt='Employee' />
                    </div>
                    <div className='first-right'>
                        <h4>Name: {clients.firstName} {clients.lastName}</h4>
                        <h4>Age: {clients.age} Years Old</h4>
                        <h4>Address: {clients.address}</h4>
                        <h4>Birthdate: {clients.birthdate ? formatDate(clients.birthdate) : ''}</h4>
                        <br />
                        <h4>Mother: {clients.nameOfMother}</h4>
                        <h4>Father: {clients.nameOfFather}</h4>
                        <h4>Civil Status: {clients.civilStatus}</h4>
                        <h4>Religion: {clients.religion}</h4>
                    </div>
                </div>
                {/* Second grid */}
                <div>
                    <div>
                        <div className='total-payable'>
                            <div className='money-icon'><FaMoneyBillWave /></div>
                            <h2 className='payable-amount'>₱{totalPayable.toLocaleString()}</h2>
                            <p className='label'>Amount Payable</p>
                        </div>
                        <div className='total-payable'>
                            <div className='money-icon'><FaMoneyBillWave /></div>
                            <h2 className='payable-amount'>₱{totalPaid.toLocaleString()}</h2>
                            <p className='label'>Amount Paid</p>
                        </div>
                    </div>
                    <div className='loan-info-container'>
    <p className='label'>Loan Information</p>
    {loans.length > 0 ? (
        <>
            <h3>Pay Loan</h3>
            <div className='choose-loan'>
                {loans.map(loan => (
                    <div key={loan.id} className='cursor'>
                        <div className='circle' onClick={() => handleLoanClick(loan.id)}>{loan.id}</div>
                    </div>
                ))}
            </div>
        </>
    ) : (
        <p>No loan yet</p>
    )}
</div>

                </div>
                {/* Third grid */}
                <div>
                    <div>
                        <p>Join on</p>
                        <h2>January 22, 2022 at 1:30pm</h2>
                    </div>
                    <div>
                        <p>Due Date</p>
                        <h2>{dueDate ? formatDate(dueDate) : ''}</h2>
                    </div>
                    <div>
                        <p>Status</p>
                        <h2>{status}</h2>
                    </div>
                </div>
            </div>
            <div className='client-list'>
                <div className='list-heading'>
                    <h1>Loan Schedule</h1>
                    <div onClick={() => setOpenLoanModal(true)}><p>Add Loan</p></div>
                </div>
                <div className='table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>Pay ID</th>
                                <th>Loan ID</th>
                                <th>Schedule</th>
                                <th>Total</th>
                                <th>Audit Trail</th>
                                <th>Status</th>
                                {/* <th>Pay</th> */}
                            </tr>
                        </thead>
                        <tbody>
    {payLoanData.map(loan => (
        <tr className='cursor' key={loan.id} onClick={() => openPaymentModal(loan)}>
            <td>{loan.id}</td>
            <td>{loan.loanId}</td>
            <td>{loan.schedule ? formatDate(loan.schedule) : ''}</td>
            <td>₱{Math.max(loan.payment - calculateTotalPaid(loan.id), 0).toFixed(2)}</td>
            <td>{loan.loanTime ? formatDate(loan.loanTime, true) : ''}</td>
            <td>{loan.status}</td>
            {/* <td><p>Pay</p></td> */}
        </tr>
    ))}
</tbody>


                    </table>
                </div>
            </div>
            <LoanModal isOpen={isOpenLoanModal} id={clients.id} onClose={() => setOpenLoanModal(false)} />
            <PaymentModal
          isOpen={paymentModalOpen}
          onClose={closePaymentModal}
          loanId={selectedLoan?.id}
          currentAmount={selectedLoan?.payment}
        />
        </div>
    );
}
